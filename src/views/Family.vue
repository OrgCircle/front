<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1>
        {{ title }}
      </h1>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="my-auto"
            v-if="profile.role === 'ADMIN'"
            color="secondary"
            >+ Add Profile
          </v-btn>
        </template>

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
      </v-dialog>
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
      const family = await this.createProfile({
        name: this.newProfileName,
        password: this.newProfilePass,
      });
      this.SET_FAMILY({ family });
    },
    async handleDelete(profileId) {
      const family = await this.deleteProfile(profileId);
      this.SET_FAMILY({ family });
    },
  },
};
</script>

<style scoped>
</style>
