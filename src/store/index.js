import { createStore } from 'vuex';

import menus from './menus';

export default createStore({
  state: {
    menus,
    count: 0,
  },

  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },

  mutations: {
    increment(state) {
      state.count += 1;
    },
  },

  actions: {},
});
