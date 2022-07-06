<template>
  <base-select
    clearable
    :remote-method="findUserList"
    filterable
    :option-label="optionLabel"
    :option-value="optionValue"
    :options="filteredUserList"
    remote
    :loading="filterUserLoading"
  />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { common as api } from '@/apis';
defineProps({
  optionLabel: {
    type: String,
    default: 'username',
  },
  optionValue: {
    type: String,
    default: 'id',
  },
});
const filterUserLoading = ref(false);
const filteredUserList = ref();
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
