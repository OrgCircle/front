import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import lists from "./modules/lists";
import event from "./modules/event";
import control from "./modules/control";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    lists,
    event,
    control,
    profile,
  },
});
