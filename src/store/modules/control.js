export default {
  namespaced: true,

  state: {
      actionAdd: null,
      excludedActionRoute: ['Dashboard', 'List', 'AddList', 'AddEvent'],
      prevRoute: null
  },

  getters: {
    getActionAdd(state) {
      return state.actionAdd;
    },
    getExcludedActionRoute(state) {
      return state.excludedActionRoute;
    }
  },

  mutations: {
    SET_ACTION_ADD (state, payload) {
      state.actionAdd = payload;
    },
    SET_PREV_ROUTE (state, payload) {
      state.prevRoute = payload;
    },
  },

  actions: {
    async setPreviousRoute({ commit }, route) {
      try {
        commit('SET_PREV_ROUTE', route)
      }catch (e) {
        console.log(e)
      }
    }
  }
};