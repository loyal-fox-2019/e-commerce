import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLogin: false
    },
    mutations: {
        SET_LOGIN_STATE(state, payload) {
            state.isLogin = payload;
        }
    },
    actions: {

    },
    modules: {

    }
});

export default store