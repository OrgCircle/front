<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
          <v-card dense>
              <v-card-title>
                Ajouter un événement
              </v-card-title>
              <v-card-text>
                <event-form/>
              </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import EventForm from '@/components/event/eventForm';
import { mapActions } from 'vuex';

export default {
    name: 'AddEvent',
    components: {EventForm},
    data() {
        return {
            title: 'Add event'
        }
    },
    methods: {
      ...mapActions('control', ['setPreviousRoute']),
    },
    mounted() {
        this.setPreviousRoute('/calendar');
    },
}
</script>

<style scoped>

</style>