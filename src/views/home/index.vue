<template>
  <el-card class="home">
    <h2>this is home page {{ count }}, {{ doubleCount }}</h2>
    <el-button type="primary" @click="add">add</el-button>
    <el-icon :size="20">
      <edit />
    </el-icon>
  </el-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

function useCount() {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  const add = () => {
    count.value += 1;
  };

  watch(count, (newCount, oldCount) => {
    // eslint-disable-next-line no-console
    console.log(`The new count value is: ${newCount} ${oldCount}`);
  });

  return { count, doubleCount, add };
}

const { count, doubleCount, add } = useCount();
</script>
