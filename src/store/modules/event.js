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
    },
    MODIFY_EVENT (state, payload) {
      const eventIndex = state.events.findIndex(event => payload._id === event._id);
      state.events[eventIndex] = payload;
    },
    DELETE_EVENT (state, payload) {
      const eventIndex = state.events.findIndex(event => payload === event._id);
      state.events.splice(eventIndex, 1);
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
    },
    async modifyEvent({ commit }, data) {
      try {
        const response = await service.patch(`/${data.id}`, data);
        if (response.status === 201) {
            commit('MODIFY_EVENT', response.data)
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteEvent({ commit }, data) {
      try {
        const response = await service.delete(`/${data.id}`);
        if (response.status === 204) {
          commit('DELETE_EVENT', data.id)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
};