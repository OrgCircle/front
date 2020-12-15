<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
          {{title}}
      </v-col>
      <v-col class="margin-auto">
          <create-event/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import createEvent from '@/components/event/createEvent'

export default {
    name: 'AddEvent',
    components: {createEvent},
    data() {
        return {
            title: 'Add event'
        }
    }
}
</script>

<style scoped>

</style>