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
            md="6 "
            sm="8"
            xs="12"
          >
            <v-text-field 
              v-model="formValues.familyName"
              label="Nom de la famille"
              :rules="nameRules"
              required
              outline
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            md="6 "
            sm="8"
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
          <v-col
            md="6"
            sm="8" 
            xs="12"
          >
            <v-text-field 
              v-model="formValues.passwordSame"
              label="Répéter le mot de passe"
              :rules="passwordSameRules"
              type="password"
              required
              outline
              dense
            />
          </v-col>
        </v-row>
        <v-row d-flex justify="center">
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
        passwordSameRules: [
          v => !!v || 'La répétition du mot de passe est requis.',
          v => v === this.formValues.password || 'Les deux mot de passe doivent être identique.'
        ],
        nameRules: [
          v => !!v || 'Le nom est requis.',
          v => v.length > 1 || 'Le nom de famille est trop court.'
        ],
        formValues: {
            email: '',
            name: '',
            familyName: '',
            password: '',
            passwordSame: ''
        }
      }
  },
  methods: {
    submitConnexion () {
      if (this.$refs.form.validate()) {
        alert("Le formulaire est valide.")
        this.$axios.post('/auth/register', this.formValues).then((response) => {
          alert("Le call API c'est bien passé.")
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
</script>
