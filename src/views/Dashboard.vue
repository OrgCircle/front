<template>
  <div class="dashboard">
    <v-container>
      <v-row>
        <v-card>
          <v-card-title primary-title>
            Ma famille
          </v-card-title>
        </v-card>
      </v-row>
      <v-row>
        <v-card :to="{name: 'Lists'}">
          <v-card-title primary-title>
            Listes
          </v-card-title>
        </v-card>
      </v-row>
      <v-row>
        <v-card :to="{name: 'Calendar'}">
          <v-card-title primary-title>
            Calendrier
          </v-card-title>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: function () {
    return {}
  }
}
</script>

<style scoped>
</style>
