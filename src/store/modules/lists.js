import Service from '../../helpers/services';
const NAMESPACE = 'list';
let service = new Service(NAMESPACE);

export default {
  namespaced: true,

  state: {
    allList: [],
    list: null,
    listId: null
  },

  getters: {
    getAllList(state) {
      return state.allList;
    },
    getList(state) {
      return state.list;
    },
  },

  mutations: {
    SET_ALL_LIST (state, payload) {
      state.allList = payload.allList;
    },
    SET_LIST (state, payload) {
      state.list = payload.list;
    },
    SET_LIST_ID (state, payload) {
      state.listId = payload.listId;
    }
  },

  actions: {
    async fetchAllList({ commit }) {
      try {
        const response = await service.get("/");
        commit('SET_ALL_LIST', response.data)
      }catch (e) {
        console.log(e)
      }
    },
    async fetchListbyId({ commit }) {
      try {
        const list = await service.get("/:id");
        commit('SET_LIST', list.data)
        commit('SET_LIST_ID', list.data._id)
      }catch (e) {
        console.log(e)
      }
    }
  }
};