export default {
  namespaced: true,

  state: {
      actionAdd: null,
      excludedActionRoute: ['Dashboard', 'List']
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
    }
  },
};