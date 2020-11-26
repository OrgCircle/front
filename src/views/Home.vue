<template>
  <div class="home">
    <v-container class="full-screen-centered">
      <login-form />
      <a :to="Register">Inscription</a>
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
