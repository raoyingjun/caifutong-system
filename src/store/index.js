import { createStore } from 'vuex';

import menus from './menus';
import { common } from '@/apis';

export default createStore({
  state: {
    menus,
    count: 0,
    incomingDocTypes: [],
    urgencyDegrees: [],
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
    setUrgencyDegrees(state, urgencyDegrees) {
      state.urgencyDegrees = [{ key: '全部', value: 0 }].concat(urgencyDegrees);
    },
    setIncomingDocTypes(state, incomingDocTypes) {
      state.incomingDocTypes = [{ key: '全部', value: 0 }].concat(incomingDocTypes);
    },
  },

  actions: {
    async getUrgencyDegrees({ commit }) {
      const { data } = await common.getExternalIncomingUrgencyDegrees();
      commit('setUrgencyDegrees', data);
    },
    async getIncomingDocTypes({ commit }) {
      const { data } = await common.getExternalIncomingTypes();
      commit('setIncomingDocTypes', data);
    },
  },
});
