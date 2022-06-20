<template>
  <div class="container justify-start">
    <div class="label-line"></div>
    <slot v-if="$slots.default" />
    <label v-else>{{ label }}</label>
  </div>
</template>
<script setup>
defineProps({
  label: String,
});
</script>
<style scoped lang="scss">
.label-line {
  display: inline-block;
  width: 4px;
  height: 16px;
  margin-right: 20px;
  background: rgba(21, 115, 255, 1);
}
</style>
