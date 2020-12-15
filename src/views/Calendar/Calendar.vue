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
    <v-sheet height="64">
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-menu
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="grey darken-2"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Jour</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semaine</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mois</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 jours</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
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
        @click:event="showModifyEvent"
      ></v-calendar>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {format} from 'date-fns';

export default {
  name: 'Calendar',
  data: function () {
    return {
        title: 'Calendrier',
        type: 'month',
        mode: 'stack',
        weekday: [0, 1, 2, 3, 4, 5, 6],
        value: '',
        typeToLabel: {
          month: 'Mois',
          week: 'Semaine',
          day: 'Jours',
          '4day': '4 jours',
        },
        format,
    }
  },
  computed: {
    events: function () {
      return this.getEvents().map(event => {
        return {
          id: event._id,
          name: event.name,
          start: this.format(new Date(event.startDate), 'yyyy-MM-dd'),
          end: this.format(new Date(event.endDate), 'yyyy-MM-dd'),
        }
      });
    }
  },
  mounted: function () {
    this.fetchEvents();
    this.SET_ACTION_ADD({name: 'AddEvent'});
  },
  methods: {
    ...mapActions('event', ['fetchEvents']),
    ...mapGetters('event', ['getEvents']),
    ...mapMutations('control', ['SET_ACTION_ADD']),
    showModifyEvent({event}) {
      this.$router.push({name: 'ModifyEvent', params: {eventId: event.id}})
    },
  }
}
</script>

<style scoped>
</style>
