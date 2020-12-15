<template class='list-template'>
  <v-container class='list-container'>
    <div class='list-header'>
      <!--<v-icon>mdi-cart</v-icon>-->
      <v-img class='list-img' src='../assets/market.jpg'></v-img>
      <h1 class='list-title'>{{list ? list.name : "List"}}</h1>
    </div>
    <v-divider></v-divider>
    <v-list class='list-list'>
      <v-list-item-group>          
        <v-list-item>
          <v-icon>mdi-plus</v-icon>
          <v-text-field label='Ajouter un élément'></v-text-field>
        </v-list-item>
        <template v-if="list">
          <v-list-item  v-for="task in list.content" :key="task._id">
          <v-checkbox :label="task.label"></v-checkbox>
        </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
export default {
  name: 'List',
  computed: {
    list : function() {
      return this.getList();
    },
    listId : function() {
      return this.$route.params.cardId
    }
  },
  methods: {
    ...mapActions('lists', ['fetchListbyId']),
    ...mapGetters('lists', ['getList']),
  },
  beforeMount (){
    this.fetchListbyId(this.listId)
  }
}
</script>

<style scoped>
.list-container{
  padding: 0px !important;
}

.list-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.list-img {
  height: 100%;
  width: 100%;
  opacity: 0.7;
  z-index: 0;
}

.list-title {
  position: absolute;
  z-index: 1;
  color: white;
  text-shadow: grey 1px 1px 1px;
}

.list-list {
  padding : 10px;
}
</style>
