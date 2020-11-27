export default {
  namespaced: true,

  state: {
    family: null,
    profil: null,
    isAuthenticated: false,
    createFamily: false
  },

  getters: {
    getFamily(state) {
      return state.family;
    },
    getAuthenticated(state) {
      return state.isAuthenticated;
    }
  },

  mutations: {
    SET_FAMILY (state, payload) {
      state.family = payload.family;
      if (state.family !== null) state.isAuthenticated = true;
    },
    SET_PROFIL (state, payload) {
      state.profil = payload.profil;
    },
    ABLE_CREATE_FAMILY (state) {
      state.createFamily = true
    }
  },

  actions: {
    async getFamily({ commit }) {
      const payload = await this.axios.$get("/api/account/infos");
      commit("SET_FAMILY", payload);
    },
    async login ({ commit }, data) {
      const payload = await this.axios.$post("/api/login", data);
      commit("SET_PROFIL", payload);
    },
    async register({ commit }, data) {
      console.log(data)
      console.log(this)
      const response = await this.axios.$post("/api/register", data);
      if (response.status === 201) commit('ABLE_CREATE_FAMILY')
      return response;
    }
  }
};