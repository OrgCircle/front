<template>
    <v-card color="#ABC8E2" :to="{name: 'List', params: {id: cardId}}" class="listCard">{{cardName}}</v-card>
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
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
}

</style>
