<template>
  <v-app>
    <v-card class="overflow-hidden height">
      <v-app-bar
        color="#375d81"
        dark
        elevate-on-scroll
        scroll-target="#scrolling-techniques"
      >
        <v-btn v-if="getAuthenticated()" @click="setPreviousRoute()" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>Circle</v-toolbar-title>
        <v-spacer></v-spacer>
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
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "app",
  methods: {
    ...mapGetters('auth', ['getAuthenticated']),
    ...mapGetters('control', ['getActionAdd', 'getExcludedActionRoute']),
    ...mapActions('control', ['getActionAdd', 'setPreviousRoute']),
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

.plus-btn {
  background-color: #FEFEFE !important;
}
</style>
