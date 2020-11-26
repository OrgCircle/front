<template>
    <v-container>
      <v-form ref="form">
        <v-row justify="center">
          <v-col 
            md="6 "
            sm="8"
            xs="12"
          >
            <v-text-field 
              v-model="formValues.email"
              label="Email"
              :rules="emailRules"
              required
              outline
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            md="6"
            sm="8" 
            xs="12"
          >
            <v-text-field 
              v-model="formValues.password"
              label="Mot de passe"
              :rules="passwordRules"
              type="password"
              required
              outline
              dense
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6" sm="8" xs="12">
            <v-btn
              @click="submitConnexion"
            >
              Connexion
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
</template>

<script>

export default {
  name: 'Login',
  data: () => {
      return {
        emailRules: [
          v => !!v || 'L\'email est requis.',
          v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'L\'email doit être valide.'
        ],
        passwordRules: [
          v => !!v || 'Le mot de passe est requis.'
        ],
        formValues: {
            email: '',
            password: ''
        }
      }
  },
  methods: {
    submitConnexion () {
      if (this.$refs.form.validate()) {
        alert("Le formulaire est valide.")
      }
    }
  }
}
</script>
