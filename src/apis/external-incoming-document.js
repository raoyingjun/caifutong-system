import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 获取外部收文列表
  getExternalIncomingDocumentList: (postData) => {
    return http.post('/receive/doc/list', postData);
  },
  /**
   * 获取公司列表
   * @param {Number} type 0 -> 总公司， 1 -> 分公司
   * @returns {*}
   */
  getCompanyList: (type) => {
    return http.get(`/company/list?type=${type}`);
  },
  newExternalIncomingDocument(data) {
    return http.post('/receive/doc', data);
  },
  getExternalIncomingDocumentDetail(id) {
    return http.get(`/receive/detail?id=${id}`);
  },
};
