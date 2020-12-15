<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
        <v-sheet
          tile
          height="54"
          class="d-flex"
        >
          <v-toolbar
            flat
          >
            <v-btn
              fab
              text
              small
              @click="$refs.calendar.prev()"
            >
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>
              {{ title }}
            </v-toolbar-title>
            <v-btn
              fab
              text
              small
              @click="$refs.calendar.next()"
            >
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
      </v-col>
    </v-row>

    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Calendar',
  data: function () {
    return {
        title: 'Calendrier',
        type: 'month',
        mode: 'stack',
        weekday: [0, 1, 2, 3, 4, 5, 6],
        value: '',
        events: this.getEvents(),
    }
  },
  mounted: function () {
    this.fetchEvents();
    this.SET_ACTION_ADD({name: 'AddEvent'})
  },
  methods: {
    ...mapActions('event', ['fetchEvents']),
    ...mapGetters('event', ['getEvents']),
    ...mapMutations('control', ['SET_ACTION_ADD'])
  }
}
</script>

<style scoped>
</style>
