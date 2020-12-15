<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
          <v-card dense>
              <v-card-title>
                Modifier un événement
              </v-card-title>
              <v-card-text>
                <event-form type="Modify" :event="event" />
              </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import EventForm from '@/components/event/eventForm';

export default {
    name: 'ModifyEvent',
    components: {EventForm},
    data() {
        return {
            event: null
        }
    },
    computed: {
        eventId: function () {
            return this.$route.params.eventId;
        }
    },
    mounted() {
        this.event = this.$store.getters['event/getEventById'](this.eventId);
    },
}
</script>

<style scoped>

</style>