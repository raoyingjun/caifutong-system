import { reactive, toRefs } from 'vue';

export const usePagination = () => {
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  return toRefs(pagination);
};
