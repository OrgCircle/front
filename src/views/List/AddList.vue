<template>
  <v-container>
    <v-row>
      <v-col class="margin-auto">
          <v-card dense>
              <v-card-title>
                Ajouter une liste
              </v-card-title>
              <v-card-text>
                <create-list/>
              </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CreateList from '@/components/list/createList'

export default {
    name: 'AddList',
    components: {CreateList},
    data() {
        return {
            title: 'Add list'
        }
    }
}
</script>

<style scoped>

</style>