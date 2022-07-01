import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 获取收文类型
  getExternalIncomingTypes: () => {
    return http.get('/receive/types');
  },
  // 获取收文紧急程度·
  getExternalIncomingUrgencyDegrees: () => {
    return http.get('/receive/emergency');
  },
  // 获取收文保密级别
  getExternalIncomingSecretLevels: () => {
    return http.get('/receive/secrets');
  },
  /**
   *   获取收文标签
   *   @param {String} keywords 联想搜索关键字
   */
  getExternalIncomingTags: (keywords = '') => {
    return http.post('/tag/list', { keywords });
  },
  // 搜索指定用户列表
  findUserList: (keywords) => {
    return http.post('/user/common-infos', { keywords });
  },
};
