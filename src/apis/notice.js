import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 获取公告
  getNoticeList: (postData) => {
    return http.post('/notice/list', postData);
  },
  // 设置公告
  updateNotice: (postData) => {
    return http.put('/notice', postData);
  },
  // 删除公告
  deleteNotice: (ids) => {
    return http.post('/notice/delete', ids);
  },
};
