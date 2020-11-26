<template>
  <div class="home">
    <v-container class="full-screen-centered">
      <login />
    </v-container>
  </div>
</template>

<script>
import Login from '@/components/login'
export default {
  name: 'Home',
  components: { Login }
}
</script>

<style scoped>
.full-screen-centered {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
