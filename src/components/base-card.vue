<template>
  <div class="base-card p-middle" :class="marginClass">
    <base-label v-if="$slots.label">
      <slot name="label" />
    </base-label>
    <base-label v-else-if="label" :label="label" />
    <slot></slot>
  </div>
</template>

<script setup>
import BaseLabel from './base-label.vue';
import { computed } from 'vue';
const props = defineProps({
  label: String,
  // 选择哪些方向需要 margin。trbl，bltr，顺序可随意，其中 t -> top = margin-top, r -> right = margin-right，以此类推。
  margin: {
    type: String,
    default: () => 'trbl',
  },
  marginSize: {
    type: String,
    default: 'middle',
  },
});
// 示例输出类样式: ml-middle、 mt-middle
const marginClass = computed(() => props.margin.split('').map((dir) => `m${dir}-${props.marginSize}`));
</script>
<style scoped lang="scss">
.base-card {
  background-color: #fff;
  border-radius: 8px;
}
</style>
