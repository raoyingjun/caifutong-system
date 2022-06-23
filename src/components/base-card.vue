<template>
  <div class="card pv-16 ph-24" :class="marginClass">
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
    type: [String, Number],
    default: '24',
  },
});
// 示例输出类样式: ml-middle、 mt-middle
const marginClass = computed(() => props.margin.split('').map((dir) => `m${dir}-${props.marginSize}`));
</script>
<style scoped lang="scss">
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 20px 0 rgba(50, 57, 91, 0.1);
}
</style>
