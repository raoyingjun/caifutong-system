<template>
  <div>
    <div class="content" :style="{ height: modelValue ? height : visibleHeight }">
      <slot />
    </div>
    <el-divider>
      <el-button type="primary" link @click="$emit('update:modelValue', !modelValue)">
        {{ modelValue ? closeText : openText }}
        <el-icon class="g-icon">
          <img :src="modelValue ? closeIcon : openIcon" />
        </el-icon>
      </el-button>
    </el-divider>
  </div>
</template>
<script setup>
import openIcon from '@/assets/img/icons/open.svg';
import closeIcon from '@/assets/img/icons/close.svg';

defineProps({
  height: {
    type: String,
    default: 'auto',
  },
  visibleHeight: {
    type: String,
    default: '86px',
  },
  openText: {
    type: String,
    default: '展开查询',
  },
  closeText: {
    type: String,
    default: '收起查询',
  },
  modelValue: Boolean,
});
defineEmits(['update:modelValue']);
</script>
<style scoped lang="scss">
.content {
  overflow: hidden;
}
</style>
