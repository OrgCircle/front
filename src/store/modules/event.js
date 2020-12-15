import Service from '../../helpers/services';
const NAMESPACE = 'events';
let service = new Service(NAMESPACE);

export default {
  namespaced: true,

  state: {
      events: []
  },

  getters: {
    getEvents(state) {
      return state.events;
    }
  },

  mutations: {
    SET_EVENTS (state, payload) {
      state.events = payload;
    }
  },

  actions: {
    async fetchEvents({ commit }) {
      try {
        const response = await service.get("/");
        if (response.status === 200) {
          commit('SET_EVENTS', response.data)
        }
      }catch (e) {
        console.log(e)
      }
    },
    async createEvent({ commit }, data) {
        try {
            const response = await service.post("/", '', data);
            if (response.status === 200) {
                commit('SET_EVENTS', response.data)
            }
        }catch (e) {
            console.log(e);
        }
    }
  }
};