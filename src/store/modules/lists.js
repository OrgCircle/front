import Service from '../../helpers/services';
const NAMESPACE = 'lists';
let service = new Service(NAMESPACE);

export default {
  namespaced: true,

  state: {
    allList: [],
    list: null,
    listTypes: []
  },

  getters: {
    getAllList(state) {
      return state.allList;
    },
    getList(state) {
      return state.list;
    },
    getListTypes(state) {
      return state.listTypes;
    }
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
    },
    ADD_TASK_TO_LIST (state, payload) {
      const listIndex = state.allList.findIndex(list => payload._id === list._id);
      state.allList[listIndex] = payload;
    },
    SET_LIST_TYPES (state, payload) {
      state.listTypes = payload
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
    async deleteList({ dispatch }, data) {
      try {
        const response = await service.delete(`/${data.id}`, '', data);
        if (response.status === 204) {
          dispatch('fetchAllList');
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async modifyList({ commit }, data) {
      try {
        const response = await service.patch(`/${data._id}`, '', data);
        if (response.status === 201) {
            commit('ADD_LIST', response.data)
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async addTaskToList({ commit }, data) {
      try {
        const response = await service.post(`/${data.id}/task`, '', data.data);
        if (response.status === 201) {
            commit('ADD_TASK_TO_LIST', response.data)
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteTaskToList({ commit }, data) {
      try {
        const response = await service.delete(`/${data.id}/task/${data.taskId}`);
        if (response.status === 201) {
            commit('SET_LIST', response.data)
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchListTypes({ commit }) {
      try {
        const response = await service.get(`/types`);
        if (response.status === 200) {
            commit('SET_LIST_TYPES', response.data)
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    }
  }
};