import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const SERVER_URL = 'http://localhost:8000';

export default new Vuex.Store({
  state: {
    userId: null,
  },

  getters: {
    isLoggedIn(state) {
      return state.userId !== null;
    },

    currentUser(state) {
      return state.userId;
    },
  },

  actions: {
    signUp(context, payload) {
      console.log('POST to backend with new user credentials');
      return axios
        .post(SERVER_URL + '/auth/register', payload)
        .then(({ data }) => {
          console.log('user data is: ', data);
          context.commit('SET_USER', data);
        });
    },

    signIn(context, payload) {
      console.log('AUTH backend with user credentials');
      return axios
        .post(SERVER_URL + '/auth/login', payload)
        .then(({ data }) => {
          console.log('user data is: ', data);
          context.commit('SET_USER', data);
        });
    },

    logout(context) {
      console.log('Clear user credentials');
      context.commit('RESET_USER');
    },
  },

  mutations: {
    SET_USER(state, payload) {
      state.userId = payload.username;
      localStorage.setItem('access_token', payload.access_token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${payload.access_token}`;
    },

    RESET_USER() {
      localStorage.removeItem('access_token');
      location.reload();
    },
  },

  modules: {},
});
