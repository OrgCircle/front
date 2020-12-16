<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
          {{title}}
      </v-col>
      <v-col class="margin-auto">
          <create-list/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import createList from '@/components/list/createList'

export default {
    name: 'AddList',
    components: {createList},
    data() {
        return {
            title: 'Add list'
        }
    }
}
</script>

<style scoped>

</style>