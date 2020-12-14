<template>
  <div class="lists">
    <v-row>
      <v-col><ListCard/></v-col>
      <v-col><ListCard/></v-col>
    </v-row>
    <v-row>
      <v-col><ListCard/></v-col>
      <v-col><ListCard/></v-col>
    </v-row>
  </div>
</template>

<script>
import ListCard from '@/components/listCard'
import axios  from 'axios'

export default {
  name: 'Lists',
  components: { ListCard },
  data: function () {
    return {
      name = []
    }
  },
  methods: {
    getListNames(name) {
      axios
        .get('mongodb://localhost/circle-fullstack/list', {
          name: name
        })
        .then(res => {
          return {
            name
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
</style>
