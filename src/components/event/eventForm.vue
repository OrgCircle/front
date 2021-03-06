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
          md="6 "
          sm="12"
          xs="12"
        >
          <v-text-field 
            v-model="formValues.location"
            label="Lieux"
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
            v-model="dates"
            range
            locale="fr"
          ></v-date-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="6"
          sm="12" 
          xs="12"
        >
          <v-select 
            label="Assigné à"
            v-model="formValues.assigned_to"
            :items="family.profiles"
            item-value="_id"
            item-text="name"
            outline
            multiple
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2" sm="2" xs="2">
          <v-btn
            @click="$router.go(-1)"
          >
            Retour
          </v-btn>
        </v-col>
        <v-col md="2" sm="2" xs="2">
          <v-btn
            :loading="loadingSubmit"
            @click="submit"
          >
            {{ type === "Create" ? "Ajouter l'événement" : ''}}
            {{ type === "Modify" ? "Modifier l'événement" : ''}}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { format } from 'date-fns'

export default {
  name: 'EventForm',
  props: {
    event: {
      type: Object,
      required: false,
      default: () => null
    },
    type: {
      type: String,
      required: false,
      default: () => 'Create'
    }
  },
  data: function () {
    return {
      dates: [],
      nameRules: [
        v => !!v || 'Le nom est requis.'
      ],
      formValues: this.initEmptyForm(),
      family: this.getFamily(),
      loadingSubmit: false,
      format
    }
  },
  watch: {
    event: function () {
      if (this.event) {
        const dateStart = this.format(new Date(this.event.startDate), 'yyyy-MM-dd');
        const dateEnd = this.format(new Date(this.event.endDate), 'yyyy-MM-dd')
        this.formValues = {
          id: this.event._id,
          name: this.event.name,
          startDate: dateStart,
          endDate: dateEnd,
          location: this.event.location,
          assigned_to: this.event.assigned_to,
        };
        if (dateEnd) {
          this.dates.push(dateEnd)
        }
        if (dateStart) {
          this.dates.push(dateStart)
        }
      }
    }
  },
  methods: {
    ...mapActions('event', ['createEvent', 'modifyEvent']),
    ...mapActions('control', ['showPopup']),
    ...mapGetters('auth', ['getFamily']),
    async submit () {
      if (this.$refs.form.validate()) {
        this.loadingSubmit = true;
        if (this.dates.length > 0) {
          if (this.dates.length === 2) {
            this.dates.sort((dateA, dateB) => new Date(dateA) - new Date(dateB))
            this.formValues.startDate = this.dates[0];
            this.formValues.endDate = this.dates[1];
          } else if (this.dates.length === 1) {
            this.formValues.startDate = this.dates[0];
            this.formValues.endDate = this.dates[0];
          }
          try {
            let response = {status: 500};
            if (this.type === "Create") {
              response = await this.createEvent(this.formValues);
            }
            else if (this.type === "Modify") {
              response = await this.modifyEvent(this.formValues);
            }
            if (response.status === 201) {
              this.$router.push({name: 'Calendar'});
              this.showPopup({color: 'success', text: "L'événement a bien été ajouté."})
            } else {
              this.showPopup({color: 'red', text: "Une erreur est survenue."})
            }
          }
          catch (e) {
            console.log(e);
          }
        }
        this.loadingSubmit = false;
      }
    },
    initEmptyForm () {
      return {
        name: '',
        startDate: null,
        endDate: null,
        location: null,
        assigned_to: [],
      }
    }
  }
}
</script>
<style scoped>
</style>