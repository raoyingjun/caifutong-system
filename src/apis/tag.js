import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 获取标签
  getTagList: (postData) => {
    return http.post('/tag/list/detail', postData);
  },
  // 设置标签
  updateTag: (postData) => {
    return http.put('/tag', postData);
  },
  // 删除标签
  deleteTag: (id) => {
    return http.delete('/tag', { params: { id } });
  },
  // 设置标签
  createTag: (postData) => {
    return http.post('/tag', postData);
  },
};
