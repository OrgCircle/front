<template>
  <div>
      <v-card color="#ABC8E2" class="listCard">
        <v-icon 
          v-if="$store.state.auth.profil.role === 'ADMIN'"
          @click="deleteListAction"
        >
          mdi-delete
        </v-icon>
        <v-card-text :to="{name: 'List', params: {id: cardId}}">
          {{cardName}}
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ListCard',
  data: function () {
      return {

      };
  },
  props: {
    cardName: {
      type: String,
      required: true,
      default: 'List'
    },
    cardId: {
      type: String,
      required: true
    },
  },
  methods: {
    ...mapActions('lists', ['deleteList']),
    ...mapActions("control", ['showPopup']),
    async deleteListAction () {
      try {
        const response = await this.deleteList({
          id: this.cardId
        });
        if (response.status === 201) {
          this.list = response.data;
          this.showPopup({color: 'success', text: "La tache a bien été supprimé dans la liste."})
        } else {
          this.showPopup({color: 'danger', text: "Une erreur est survenue."})
        }
      } catch (e) {
        console.log(e)
        this.showPopup({color: 'danger', text: "Une erreur est survenue."})
      }
    }
  },
}
</script>

<style scoped>

.listCard{
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
}

</style>
