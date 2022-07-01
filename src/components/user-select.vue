<template>
  <base-select
    clearable
    :remote-method="findUserList"
    filterable
    option-label="username"
    option-value="id"
    :options="filteredUserList"
    remote
    :loading="filterUserLoading"
  />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { common as api } from '@/apis';

const filterUserLoading = ref(false);
const filteredUserList = ref([{ username: '请选择', id: 0 }]);
const findUserList = async (query) => {
  filterUserLoading.value = true;
  const { data } = await api.findUserList(query);
  filterUserLoading.value = false;
  filteredUserList.value = data;
};

onMounted(() => {
  findUserList();
});
</script>
