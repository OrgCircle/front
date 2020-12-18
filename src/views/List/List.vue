<template class='list-template'>
  <v-container class='list-container'>
    <div class='list-header'>
      <!--<v-icon>mdi-cart</v-icon>-->
      <v-img class='list-img' src='@/assets/market.jpg'></v-img>
      <h1 class='list-title'>{{list ? list.name : "List"}}</h1>
    </div>
    <v-divider></v-divider>
    <v-list class='list-list'>
      <v-list-item-group>          
        <v-list-item>
          <v-btn 
            icon 
            @click="addTask"
            :loading="loadingAddTask"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-text-field label='Ajouter un élément' v-model="taskLabel"></v-text-field>
        </v-list-item>
        <template v-if="list">
          <v-list-item  v-for="task in list.content" :key="task._id">
            <v-checkbox v-model="task.state" @change="showModifyList = true"></v-checkbox>
            <v-text-field v-model="task.label" @change="showModifyList = true"></v-text-field>
            <v-btn icon @click="deleteTask(task)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-btn @click="modifyListAction">Modifier la liste</v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
export default {
  name: 'List',
  data: function () {
    return {
      taskLabel: '',
      list: null,
      selectedTask: null,
      loadingAddTask: false
    }
  },
  computed: {
    listId : function() {
      return this.$route.params.id
    }
  },
  async beforeMount (){
    await this.fetchListbyId(this.listId)
    this.list = this.getList();
  },
  methods: {
    ...mapActions('lists', ['fetchListbyId', 'addTaskToList', 'modifyList', 'deleteTaskToList']),
    ...mapGetters('lists', ['getList']),
    ...mapActions("control", ['showPopup']),
    async addTask () {
      if (this.taskLabel) {
        this.loadingAddTask = true;
        try {
          const response = await this.addTaskToList({id: this.list._id, data: {label: this.taskLabel, state: false}});
          this.loadingAddTask = false;
          if (response.status === 201) {
            this.list = response.data;
            this.showPopup({color: 'success', text: "La tache a bien été ajouter dans la liste."})
          }
          else {
            this.showPopup({color: 'danger', text: "Une erreur est survenue."})
          }
        } catch (e) {
          this.showPopup({color: 'danger', text: "Une erreur est survenue."})
        }
      }
    },
    async modifyListAction () {
      if (this.list) {
        try {
          const response = await this.modifyList(this.list);
          if (response.status === 201) {
            this.list = response.data;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    async deleteTask (task) {
      try {
        const response = await this.deleteTaskToList({
          id: this.list._id,
          taskId: task._id
        });
        if (response.status === 201) {
          this.list = response.data;
          this.showPopup({color: 'success', text: "La tache a bien été supprimé dans la liste."})
        } else {
          this.showPopup({color: 'danger', text: "Une erreur est survenue."})
        }
      } catch (e) {
        this.showPopup({color: 'danger', text: "Une erreur est survenue."})
      }
    }
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
