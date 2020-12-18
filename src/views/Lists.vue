<template>
  <div class="lists">
    <v-toolbar class="toolbar-center" flat>
      <v-toolbar-title class="title">Listes</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-row v-for="list in lists" :key="list._id">
      <v-col md="4" sm="8" xs="10" class="margin-auto"><ListCard :cardId='list._id' :cardName='list.name' @updateLists="reinitialiseLists"></ListCard></v-col>
    </v-row>
  </div>
</template>

<script>
import ListCard from '@/components/list/listCard'
import { mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Lists',
  components: { ListCard },
  data: function (){
    return {
      lists: []
    }
  },
  async mounted (){
    await this.reinitialiseLists();
    this.SET_ACTION_ADD({name: 'AddList'});
    this.setPreviousRoute('Dashboard');
  },
  methods: {
    ...mapActions('lists', ['fetchAllList']),
    ...mapGetters('lists', ['getAllList']),
    ...mapMutations('control', ['SET_ACTION_ADD']),
    ...mapActions('control', ['setPreviousRoute']),
    async reinitialiseLists() {
      await this.fetchAllList(),
      this.lists = this.getAllList();
    }
  },
}
</script>

<style scoped>
.toolbar-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  font-size: 1.75em !important;
  text-align: center;
}
</style>
