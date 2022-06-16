import http from '@/utils/http';

// 以下是接口定义示例
export default {
  // 根据产品名称获取产品列表
  getProductByName: () => {
    return http.get('/complaint_api/products/name');
  },

  // 获取产品树
  getProductTree: () => {
    return http.get('/complaint_api/products/item-tree');
  },
};
