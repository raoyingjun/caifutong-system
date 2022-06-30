<template>
  <el-select style="width: 100%">
    <el-option v-for="item in options" :key="item[optionValue]" :label="item[optionLabel]" :value="item[optionValue]" />
  </el-select>
</template>
<script setup>
defineProps({
  options: Array,
  optionLabel: {
    type: String,
    default: 'label',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
});
</script>
