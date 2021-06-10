import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

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
      context.commit('setUser', payload);
      return (
        axios
          // .post('//localhost:3000/register', payload)
          .post('//localhost:3000/register', payload)
          .then(({ data }) => {
            console.log('user data is:', data);
          })
      );
    },
    signIn(context, payload) {
      console.log('AUTH backend with user credentials');
      context.commit('setUser', payload);
    },
    logout(context) {
      console.log('Clear user credentials');
      context.commit('resetUser');
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.username;
    },
    resetUser(state) {
      state.userId = null;
    },
  },
  modules: {},
});
