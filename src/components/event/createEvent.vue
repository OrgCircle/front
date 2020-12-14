<template>
  <v-container>
    <v-form ref="form" class="form-center">      
      <v-row>
        <v-col
          md="6 "
          sm="12"
          xs="12"
        >
          <v-text-field 
            v-model="formValues.name"
            label="Nom de l'événement"
            :rules="nameRules"
            required
            outline
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="6"
          sm="12" 
          xs="12"
        >
        <v-date-picker
          v-model="formValue.startDate"
          elevation="15"
        ></v-date-picker>
        </v-col>
        <v-col
          md="6"
          sm="12" 
          xs="12"
        >
        <v-date-picker
          v-model="formValue.endDate"
          elevation="15"
        ></v-date-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-btn
            @click="$router.go(-1)"
          >
            Retour
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-btn
            @click="submit"
          >
            Ajouter l'événement
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data: function () {
    return {
      nameRules: [
        v => !!v || 'Le nom est requis.'
      ],
      formValues: this.initEmptyForm()
    }
  },
  methods: {
    ...mapActions('event', ['createEvent']),
    async submit () {
      if (this.$refs.form.validate()) {
        try {
          const response = {status: 200}
          if (response.status === 200) {
            this.$router.push({name: 'Calendar'});
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    },
    initEmptyForm () {
      return {
        name: '',
        startDate: null,
        endDate: null,
        location: null,
        assigne_to: [],
      }
    }
  }
}
</script>
<style scoped>
</style>