<template>
  <div class="dashboard">
    <v-container class="center-menu">
      <v-row>
        <v-col md="6">
          <v-card :to="{name: 'Family'}">
            <v-card-title primary-title>
              Ma famille
            </v-card-title>
          </v-card>  
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6">
          <v-card :to="{name: 'Lists'}">
            <v-card-title primary-title>
              Listes
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6">
          <v-card :to="{name: 'Calendar'}">
            <v-card-title primary-title>
              Calendrier
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data: function () {
    return {}
  },
}
</script>

<style scoped>
.center-menu .row .col {
  margin: 0 auto;
}
</style>
