<template>
  <div>
    <div class="d-flex justify-space-between">
      <v-toolbar class="toolbar-center" flat>
        <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
      </v-toolbar>
    </div>
    <div class="d-flex flex-column">
      <v-card
        v-for="prof in getFamilyProfiles()"
        v-bind:key="prof._id"
        class="pa-4 mb-2"
      >
        <h2>{{ prof.name }}</h2>
        <v-btn
          color="red"
          v-if="profile.role === 'ADMIN'"
          class="white--text"
          @click="handleDelete(prof._id)"
          >Supprimer</v-btn
        >
      </v-card>
       <v-dialog v-model="dialog" width="500">
        <v-card>
          <form @submit="handleSubmit" class="pa-3">
            <v-text-field
              label="Name*"
              required
              v-model="newProfileName"
            ></v-text-field>

            <v-text-field
              label="Password*"
              required
              type="password"
              v-model="newProfilePass"
            ></v-text-field>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                class="white--text"
                type="submit"
                @click="dialog = false"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="my-auto white--text margin-auto"
            v-if="profile.role === 'ADMIN'"
            color="#375d81"
            width="50%"
            font
            >+ Add Profile
          </v-btn>
        </template>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Family",
  data: function () {
    return {
      title: "Ma famille",
      profile: this.getProfile(),
      newProfileName: "",
      newProfilePass: "",
      dialog: null,
    };
  },
  methods: {
    ...mapGetters("auth", ["getProfile", "getFamily"]),
    ...mapActions("profile", ["createProfile", "deleteProfile"]),
    ...mapActions("control", ['showPopup', 'setPreviousRoute']),
    ...mapMutations("auth", ["SET_FAMILY"]),
    getFamilyProfiles() {
      const currentProfile = this.getProfile();
      const famillyProfiles = this.getFamily().profiles;
      return famillyProfiles.filter(
        (profile) => profile._id !== currentProfile._id
      );
    },
    async handleSubmit(e) {
      e.preventDefault();
      const response = await this.createProfile({
        name: this.newProfileName,
        password: this.newProfilePass,
      });
      if (response.status === 201) {
        this.SET_FAMILY({ family: response.data });
        this.showPopup({color: 'success', text: "Les profiles ont bien été mis à jours."})
      }
      else {
        this.showPopup({color: 'red', text: "Une erreur s'est produit durant la création de profile."})
      }
    },
    async handleDelete(profileId) {
      const response = await this.deleteProfile(profileId);
      if (response.status === 200) {
        this.SET_FAMILY({ family: response.data });
        this.showPopup({color: 'success', text: "Le profil a bien été supprimé."})
      } else {
        this.showPopup({color: 'red', text: "Une erreur est survenue."})
      }
    },
  },
  mounted() {
      this.setPreviousRoute('Dashboard');
  }
};
</script>

<style scoped>
.toolbar-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  font-size: 1.75em !important;
  text-align: center;
}
</style>
