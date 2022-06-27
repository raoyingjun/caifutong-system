<template>
  <el-select v-model="value" style="width: 100%">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: [String, Number, Object],
  options: Array,
});
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit('update:modelValue', v);
  },
});
</script>
