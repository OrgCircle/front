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
            label="Nom de la liste"
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
          <v-select 
            label="Type de liste"
            v-model="formValues.listType"
            :items="listType"
            :item-value="(type) => {
              return {label: type.label,
              icon: type.icon}
            }"
            item-text="label"
            outline
          />
        </v-col>
      </v-row>
      <v-file-input
        label="Image de converture"
        accept="image/png, image/jpeg, image/bmp"
        filled
        prepend-icon="mdi-camera"
     ></v-file-input>
      <v-row>
        <v-col md="2" sm="2" xs="2">
          <v-btn
            @click="submit"
          >
            {{ type === "Create" ? "Ajouter la liste" : ''}}
            {{ type === "Modify" ? "Modifier la liste" : ''}}
          </v-btn>
        </v-col>
        <v-col md="2" sm="2" xs="2">
          <v-btn
            @click="$router.go(-1)"
          >
            Retour
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'createList',
  props: {
    type: {
      type: String,
      required: false,
      default: () => 'Create'
    }
  },
  data: function () {
    return {
      nameRules: [
        v => !!v || 'Le nom est requis.'
      ],
      formValues: this.initEmptyForm(),
      list: this.getList(),
      listType: []
    }
  },
  watch: {
    list: function () {
      if (this.list) {
        this.formValues = {
          name: this.list.name,
          listType: this.list.listType,
        };
      }
    }
  },
  async beforeMount() {
    await this.fetchListTypes()
    this.listType = this.getListTypes()
  },
  methods: {
    ...mapActions('lists', ['createList', 'modifyList', 'fetchListTypes']),
    ...mapGetters('lists', ['getList', 'getListTypes']),
    ...mapActions("control", ['showPopup', 'setPreviousRoute']),
    async submit () {
      if (this.$refs.form.validate()) {
        try {
          let response = {status: 500};
          if (this.type === "Create") {
            response = await this.createList(this.formValues);
          }
          else if (this.type === "Modify") {
            response = await this.createList(this.list._id, this.formValues);
          }
          if (response.status === 200) {
            this.showPopup({color: 'success', text: "La liste a bien été ajouté."})
            this.$router.push({name: 'Lists'});
          } else {
            this.showPopup({color: 'danger', text: "Une erreur est survenue."})
          }
        }
        catch (e) {
          this.showPopup({color: 'danger', text: "Une erreur est survenue."})
        }
      } else {
        this.$refs.form.console.error();
      }
    },
    initEmptyForm () {
      return {
        name: '',
        listType: null,
      }
    }
  }
}
</script>

<style scoped>
</style>