import { createStore } from 'vuex';

import menus from './menus';
import { common } from '@/apis';

export default createStore({
  state: {
    menus,
    count: 0,
    incomingDocTypes: [{ key: '全部', value: 0 }],
    urgencyDegrees: [{ key: '全部', value: 0 }],
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
      state.urgencyDegrees.push.apply(state.urgencyDegrees, urgencyDegrees);
    },
    setIncomingDocTypes(state, incomingDocTypes) {
      state.incomingDocTypes.push.apply(state.incomingDocTypes, incomingDocTypes);
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
