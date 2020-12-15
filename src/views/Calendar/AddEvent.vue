<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
          <v-card dense>
              <v-card-title>
                Ajouter un événement
              </v-card-title>
              <v-card-text>
                <create-event/>
              </v-card-text>
          </v-card>
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