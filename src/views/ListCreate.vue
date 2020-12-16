<template>
  <v-container>
    <v-row>
      <v-col>
        <register-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCreateForm from '@/components/list/listCreateForm'
export default {
  name: 'ListCreate',
  components: { ListCreateForm }
}
</script>

<style scoped>
</style>
