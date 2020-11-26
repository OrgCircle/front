import axios from "axios";

export default {
  namespaced: true,

  state: {
    family: null,
    isAuthenticated: false
  },

  getters: {
    getFamily(state) {
      return state.family;
    },
    getAut
  },

  mutations: {
    setFamily(state, payload) {
        state.family = payload.family;
        if (state.family !== null) state.isAuthenticated = true;
    }
  },

  actions: {
    async getFamily({ commit }) {
      const payload = await axios.get("/api/getAccountInfos").then(res => res.data);
      commit("setFamily", payload);
    },
    async login ({ commit }, data) {
      const payload = await axios.post("/api/login", data).then(res => res.data);
      commit("setData", payload);
    }
  }
};