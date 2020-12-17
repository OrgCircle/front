<template>
  <div class="lists">
    <v-row v-for="list in lists" :key="list._id">
      <v-col><ListCard :cardId='list._id' :cardName='list.name'></ListCard></v-col>
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
      
    }
  },
  computed: {
    lists : function() {
      return this.getAllList();
    }
  },
  methods: {
    ...mapActions('lists', ['fetchAllList']),
    ...mapGetters('lists', ['getAllList']),
    ...mapMutations('control', ['SET_ACTION_ADD']),
  },
  mounted (){
    this.fetchAllList(),
    this.SET_ACTION_ADD({name: 'AddList'});
  }
}
</script>

<style scoped>
</style>
