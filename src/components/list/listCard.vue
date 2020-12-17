<template>
    <v-card :to="{name: 'List', params: {cardId}}" class="listCard">{{cardName}}</v-card>
</template>

<script>
export default {
  name: 'ListCard',
  data: function () {
      return {

      };
  },
  props: {
    cardName: {
      type: String,
      required: true,
      default: 'List'
    },
    cardId: {
      type: String,
      required: true
    },
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
