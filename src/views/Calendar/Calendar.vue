<template>
  <v-container class="calendar">
    <v-row>
      <v-col class="margin-auto">
        <v-sheet
          tile
          height="54"
          class="d-flex sheet"
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
              <v-icon small class="chevrons">mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="title">
              {{ title }}
            </v-toolbar-title>
            <v-btn
              fab
              text
              small
              @click="$refs.calendar.next()"
            >
              <v-icon small class="chevrons">mdi-chevron-right</v-icon>
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
        locale="fr"
        @change="getEvents"
        @click:event="showEvent"
      ></v-calendar>
      <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="150px"
            flat
          >
            <v-toolbar
              dark
            >
              <v-btn 
                icon
                @click="showModifyEvent"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn 
                icon
                @click="deleteEventAction"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Retour
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
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
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        format,
    }
  },
  mounted: async function () {
    await this.fetchEvents();
    this.SET_ACTION_ADD({name: 'AddEvent'});
    this.initEvents();
    this.setPreviousRoute('Dashboard');
  },
  methods: {
    ...mapActions('event', ['fetchEvents', 'deleteEvent']),
    ...mapGetters('event', ['getEvents']),
    ...mapMutations('control', ['SET_ACTION_ADD']),
    ...mapActions('control', ['setPreviousRoute']),
    initEvents() {
      const events = this.getEvents();
      console.log(events)
      if (events.length > 0) {
        this.events = this.getEvents().map(event => {
          return {
            id: event._id,
            name: event.name,
            start: this.format(new Date(event.startDate), 'yyyy-MM-dd'),
            end: this.format(new Date(event.endDate), 'yyyy-MM-dd'),
          }
        });
      } else {
        this.events = [];
      }
      console.log(this.events)
    },
    showModifyEvent() {
      this.$router.push({name: 'ModifyEvent', params: {eventId: this.selectedEvent.id}})
    },
    showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      deleteEventAction () {
        this.deleteEvent(this.selectedEvent);
        const index = this.events.findIndex(event => this.selectedEvent.id === event.id);
        this.events.splice(index, 1);
        this.selectedEvent = {}
        this.selectedOpen = false;
      }
  }
}
</script>

<style scoped>
.sheet header{
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.title{
  font-size: 1.75em !important;
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
}

.chevrons{
  font-size: 20px !important;
}

</style>
