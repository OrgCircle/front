export default {
  namespaced: true,

  state: {
    family: null,
    profil: null,
    isAuthenticated: false
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
    setFamily(state, payload) {
      state.family = payload.family;
      if (state.family !== null) state.isAuthenticated = true;
    },
    setProfil(state, payload) {
      state.profil = payload.profil;
    }
  },

  actions: {
    async getFamily({ commit }) {
      const payload = await this.axios.$get("/api/getAccountInfos").then(res => res.data);
      commit("setFamily", payload);
    },
    async login ({ commit }, data) {
      const payload = await this.axios.$post("/api/login", data).then(res => res.data);
      commit("setData", payload);
    },
    async register({ commit }, data) {
      const payload = await this.axios.$post("/api/register", data).then(res => res.data);
      commit("setFamily", payload)
    }
  }
};