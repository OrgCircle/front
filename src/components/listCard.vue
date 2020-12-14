<template>
    <v-container>
      <v-card class="listCard">Test card</v-card>
    </v-container>
</template>

<script>
export default {
  name: 'ListCard',
  data: function () {
      return {
        
      };
  },
  methods: {},
}
</script>

<style scoped>

.listCard{
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
