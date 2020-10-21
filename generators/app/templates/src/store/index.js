/**
 * @file:      actions
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:     2020-10-21 21:01:58
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
import state from './state.js';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

// Store实例
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localstorage
        })
    ],
    state,
    getters,
    actions,
    mutations,
    modules: {}
});
