import Service from '../../helpers/services';
const NAMESPACE = 'lists';
let service = new Service(NAMESPACE);

export default {
  namespaced: true,

  state: {
    allList: [],
    list: null
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
      state.allList = payload;
    },
    SET_LIST (state, payload) {
      state.list = payload;
    },
    ADD_LIST (state, payload) {
      state.allList.push(payload)
    },
    MODIFY_LIST (state, payload) {
      const listIndex = state.allList.findIndex(list => payload._id === list._id);
      state.allList[listIndex] = payload;
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
    async fetchListbyId({ commit }, listId) {
      try {
        const response = await service.get("/" + listId);
        commit('SET_LIST', response.data)
      }catch (e) {
        console.log(e)
      }
    },
    async createList({ commit }, data) {
      try {
        const response = await service.post("/", '', data);
        if (response.status === 201) {
            commit('ADD_LIST', response.data)
        }
        return response;
      }catch (e) {
          console.log(e);
      }
    },
    async modifyList({ commit }, listId, data) {
      console.log(listId)
      console.log(data)
      try {
        const response = await service.patch(`/${listId}`, '', data);
        if (response.status === 201) {
            commit('ADD_LIST', response.data)
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    }
  }
};