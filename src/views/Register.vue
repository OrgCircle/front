<template>
  <div class="register">
    <v-container class="full-screen-centered">
      <v-row>
        <v-col>
          <register-form />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RegisterForm from '@/components/registerForm'
export default {
  name: 'Register',
  components: { RegisterForm }
}
</script>

<style scoped>
.full-screen-centered {
  padding: 0px;
  width: 100vw;
  height: 100vh;
}
</style>
