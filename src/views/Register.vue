<template>
  <div class="register">
    <v-container>
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
</style>
