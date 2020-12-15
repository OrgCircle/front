<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        color="indigo darken-2"
        dark
        elevate-on-scroll
        src="https://picsum.photos/1920/1080?random"
        scroll-target="#scrolling-techniques"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
        <v-container>
          <router-view/>
        </v-container>
      </v-sheet>
    </v-card>
    <v-toolbar
      v-if="getAuthenticated()" 
      absolute
      bottom
      width="100vw"
      color="primary"
      class="d-flex justify-center"
    >
      <v-btn 
        v-if="!getExcludedActionRoute().some(route => route === $router.currentRoute.name)"
        color="secondary"
        dark
        :elevation="10"
        class="mb-15"
        icon
        :to="getActionAdd()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "app",
  methods: {
    ...mapGetters('auth', ['getAuthenticated']),
    ...mapGetters('control', ['getActionAdd', 'getExcludedActionRoute']),
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
</style>
