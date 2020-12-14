<template>
  <div class="lists">
    <v-row v-for="list in lists" :key="list._id">
      <v-col><ListCard/></v-col>
    </v-row>
  </div>
</template>

<script>
import ListCard from '@/components/listCard'
import { mapActions, mapGetters} from 'vuex'

export default {
  name: 'Lists',
  components: { ListCard },
  data: function () {
    return {
      lists : this.getAllList()
    }
  },
  methods: {
    ...mapActions('lists', ['fetchAllList']),
    ...mapGetters('lists', ['getAllList']),
  }
}
</script>

<style scoped>
</style>
