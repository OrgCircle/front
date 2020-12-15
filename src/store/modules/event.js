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
    },
    getEventById: (state) => (id) => {
      return state.events.find(event => event._id === id);
    }
  },

  mutations: {
    SET_EVENTS (state, payload) {
      state.events = payload;
    },
    ADD_EVENT (state, payload) {
      state.events.push(payload)
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
          if (response.status === 201) {
              commit('ADD_EVENT', response.data)
          }
          return response;
      }catch (e) {
          console.log(e);
      }
    }
  }
};