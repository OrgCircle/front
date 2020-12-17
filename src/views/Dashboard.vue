<template>
  <div class="dashboard">
    <v-container class="center-menu">
      <v-row>
        <v-col md="6">
          <v-card 
          class="card card-family"
          color="#ABC8E2"
          :to="{name: 'Family'}">
            <v-card-title primary-title>
              Ma famille
            </v-card-title>
          </v-card>  
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6">
          <v-card 
          class="card card-list"
          color="#375D81"
          :to="{name: 'Lists'}">
            <v-card-title primary-title>
              Listes
            </v-card-title>
          </v-card>
        </v-col>
        <v-col md="6">
          <v-card 
          class="card card-calendar"
          color="#183152"
          :to="{name: 'Calendar'}">
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

.card{
  justify-content: center;
  color: white;
}

.card-family{
  height : 35vh;
}

.card-family div{
    justify-content: center;
    align-items: center;
    height: 100%;
}

.card-calendar{
  height : 35vh;
  width: 40vw;
  display: flex !important;
}

.card-list{
  height : 35vh;
  width: 40vw;
  display: flex !important;
}

</style>
