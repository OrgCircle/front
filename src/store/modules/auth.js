import Service from '../../helpers/services';
const NAMESPACE = 'auth';
let service = new Service(NAMESPACE);

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
    },
    SET_PROFIL (state, payload) {
      state.profil = {
        id: payload._id,
        name: payload.name,
      };
      if (state.profil !== null) state.isAuthenticated = true;
    },
    ABLE_CREATE_FAMILY (state) {
      state.createFamily = true
    },
    LOGIN (state, payload) {
      localStorage.setItem('jwt', payload)
    }
  },

  actions: {
    async getFamily({ commit }) {
      const response = await this.axios.get("/account/infos");
      commit("SET_FAMILY", response);
    },
    async login ({ commit }, data) {
      const response = await service.post("/login", '', data);
      commit("LOGIN", response.data.token)
      commit("SET_PROFIL", response.data);
    },
    async register({ commit }, data) {
      const response = await service.post("/auth/register", data);
      if (response.status === 201) commit('ABLE_CREATE_FAMILY')
      return response;
    }
  }
};