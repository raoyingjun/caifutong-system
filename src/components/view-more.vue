<template>
  <div>
    <div class="content" :style="{ height: modelValue ? height : visibleHeight }">
      <slot />
    </div>
    <el-divider>
      <el-link :underline="false" type="primary" @click="$emit('update:modelValue', !modelValue)">
        {{ modelValue ? closeText : openText }}
        <el-icon :size="13" style="margin-left: 4px">
          <img :src="modelValue ? closeIcon : openIcon" />
        </el-icon>
      </el-link>
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
