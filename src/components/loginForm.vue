<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col 
          md="6 "
          sm="12"
          xs="12"
        >
          <v-img 
            lazy-src="@/assets/logo.png"
            max-width="100"
            src="../assets/logo.png"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col 
          md="6 "
          sm="12"
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
          md="6 "
          sm="12"
          xs="12"
        >
          <v-text-field 
            v-model="formValues.name"
            label="Nom"
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
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-btn
            @click="submitConnexion"
          >
            Connexion
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-btn :to="{name: 'Register'}">Inscription</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => {
      return {
        emailRules: [
          v => !!v || 'L\'email est requis.',
          v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'L\'email doit être valide.'
        ],
        passwordRules: [
          v => !!v || 'Le mot de passe est requis.'
        ],
        nameRules: [
          v => !!v || 'Le nom est requis.'
        ],
        formValues: {
            email: '',
            name: '',
            password: ''
        }
      }
  },
  methods: {
    submitConnexion () {
      if (this.$refs.form.validate()) {
        alert("Le formulaire est valide.")
        this.$axios.post('/auth/login', this.formValues).then((response) => {
          alert("Le call API c'est bien passé.")
          console.log(response)
          this.$store.setFamily(response.data.family)
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
</script>
