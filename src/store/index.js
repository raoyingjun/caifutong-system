import { createStore } from 'vuex';

import menus from './menus';
import { common } from '@/apis';

export default createStore({
  state: {
    menus,
    count: 0,
    incomingDocTypes: [], // 收文类型
    urgencyDegrees: [], // 紧急程度
    incomingDocSecretLevels: [], // 保密程度
    incomingDocTags: [], // 收文标签
    layoutFooterVisible: false,
    // 总公司列表
    rootCompanyList: [
      { label: '总公司', value: 0 },
      { label: '分公司', value: 1 },
    ],
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    incomingDocTypesIncludeAll(state) {
      return [{ key: '全部', value: 0 }].concat(state.incomingDocTypes);
    },
    urgencyDegreesIncludeAll(state) {
      return [{ key: '全部', value: 0 }].concat(state.urgencyDegrees);
    },
  },

  mutations: {
    setLayoutFooterVisible(state, visible) {
      state.layoutFooterVisible = visible;
    },
    increment(state) {
      state.count += 1;
    },
    setUrgencyDegrees(state, urgencyDegrees) {
      state.urgencyDegrees = urgencyDegrees;
    },
    setIncomingDocTypes(state, incomingDocTypes) {
      state.incomingDocTypes = incomingDocTypes;
    },
    setIncomingDocSecretLevels(state, incomingDocSecretLevels) {
      state.incomingDocSecretLevels = incomingDocSecretLevels;
    },
    setIncomingDocTags(state, incomingDocTags) {
      state.incomingDocTags = incomingDocTags;
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
    async getIncomingDocSecretLevels({ commit }) {
      const { data } = await common.getExternalIncomingSecretLevels();
      commit('setIncomingDocSecretLevels', data);
    },
    async getIncomingDocTags({ commit }) {
      const { data } = await common.getExternalIncomingTags();
      commit('setIncomingDocTags', data);
    },
  },
});
