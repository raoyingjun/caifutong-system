import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 获取外部收文列表
  getExternalIncomingDocumentList: (postData) => {
    return http.post('/receive/doc/list', postData);
  },
  // 搜索指定用户列表
  findUserList: (keywords) => {
    return http.post('/user/common-infos', { keywords });
  },
};
