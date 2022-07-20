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
    incomingDocTags: [], // 收文标签名
    tagTypes: [], // 标签类型
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
    tagTypesIncludeAll(state) {
      return [{ key: '全部', value: 0 }].concat(state.tagTypes);
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
    setTagTypes(state, tagTypes) {
      state.tagTypes = tagTypes;
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
    async getTagTypes({ commit }) {
      const { data } = await common.getTagTypes();
      commit('setTagTypes', data);
    },
  },
});
