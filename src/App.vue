<template>
  <v-app>
    <v-card class="overflow-hidden height">
      <v-app-bar
        color="#375d81"
        dark
        elevate-on-scroll
        scroll-target="#scrolling-techniques"
      >
        <v-btn :to="getPrevRoute()" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title v-if="getAuthenticated()" class="toolbar-title-center">Famille {{family ? family.name : ''}}</v-toolbar-title>
        <v-btn v-if="getAuthenticated()" to="/dashboard" icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
      >
        <v-container class="container">
          <router-view/>
        </v-container>
      </v-sheet>
    </v-card>
    <v-toolbar
      v-if="!getExcludedActionRoute().some(route => route === $router.currentRoute.name) && getAuthenticated()"
      absolute
      bottom
      width="100vw"
      color="#375d81"
      class="d-flex toolbar justify-center"
    >
      <v-btn 
        v-if="!getExcludedActionRoute().some(route => route === $router.currentRoute.name)"
        :elevation="10"
        class="mb-15 plus-btn"
        icon
        :to="getActionAdd()"
      >
        <v-icon color="#375D81">mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "app",
  data: function(){
    return{
      family: ''
    }
  },
  methods: {
    ...mapGetters('auth', ['getAuthenticated', 'getFamily']),
    ...mapGetters('control', ['getActionAdd', 'getExcludedActionRoute', 'getPrevRoute']),
  },
  updated: function() {
    this.family = this.getFamily();
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  margin-bottom: 56px !important;
}

.height {
  height: 100%!important;
}

.toolbar{
  position: fixed !important;
}

.toolbar-title-center{
  margin: auto;
}

.plus-btn {
  background-color: #FEFEFE !important;
}
</style>
