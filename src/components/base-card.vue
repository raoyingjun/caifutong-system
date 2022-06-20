<template>
  <div class="base-card">
    <base-label v-if="$slots.label">
      <slot name="label" />
    </base-label>
    <base-label v-else :label="label" />
    <slot></slot>
  </div>
</template>

<script setup>
import BaseLabel from './base-label.vue';
defineProps({
  label: String,
});
</script>
<style scoped lang="scss">
.base-card {
  margin: 24px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
