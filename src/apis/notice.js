import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 获取外部收文列表
  getNoticeList: (postData) => {
    return http.post('/notice/list', postData);
  },
};
