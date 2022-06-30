import { reactive, toRefs } from 'vue';

export const usePagination = (currentPage = 1, pageSize = 10, total = 0) => {
  const pagination = reactive({ currentPage, pageSize, total });
  return toRefs(pagination);
};
