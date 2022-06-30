import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 根据产品名称获取产品列表
  getExternalIncomingDocumentList: (postData) => {
    return http.post('/receive/doc/list', postData);
  },

  // 获取收文类型
  getExternalIncomingTypes: () => {
    return http.get('/receive/types');
  },
  // 获取收文紧急程度·
  getExternalIncomingUrgencyDegrees: () => {
    return http.get('/receive/secrets');
  },
};
