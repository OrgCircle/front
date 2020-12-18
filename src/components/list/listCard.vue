<template>
  <div :class="$store.state.auth.profil.role === 'ADMIN' ? 'd-flex justify-center' : ''">
      <v-card 
        color="#ABC8E2" class="listCard flex-grow-1" :to="{name: 'List', params: {id: cardId}}"
      >
        <v-card-text>
          {{cardName}}
        </v-card-text>
      </v-card>
      <v-icon 
        v-if="$store.state.auth.profil.role === 'ADMIN'"
        x-large
        @click="deleteListAction"
      >
        mdi-delete
      </v-icon>
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
        if (response.status === 204) {
          this.$emit("updateLists");
          this.showPopup({color: 'success', text: "La tache a bien été supprimé dans la liste."})
        } else {
          this.showPopup({color: 'red', text: "Une erreur est survenue."})
        }
      } catch (e) {
        console.log(e)
        this.showPopup({color: 'red', text: "Une erreur est survenue."})
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
