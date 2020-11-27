<template>
  <div class="home">
    <v-container class="full-screen-centered">
      <v-row>
        <v-col>
          <login-form />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '@/components/loginForm'
export default {
  name: 'Home',
  components: { LoginForm }
}
</script>

<style scoped>
.full-screen-centered {
  padding: 0px;
  width: 100vw;
  height: 100vh;
}
</style>
