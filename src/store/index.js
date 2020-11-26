import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./modules/auth"

Vue.use(Vuex);

export let store = new Vuex.Store({
    modules: [
        auth
    ]
});