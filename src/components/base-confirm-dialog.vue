<template>
  <el-dialog :title="title" :custom-class="`base-confirm-dialog ${customClass}`" v-bind="$attrs">
    <slot v-if="$slots.default" />
    <template v-else>
      <div class="justify-start">
        <el-icon :size="24" style="vertical-align: middle">
          <img src="/src/assets/img/icons/dialog-warning-icon.svg" />
        </el-icon>
        <div>
          <div class="msg ml-16">
            {{ msg }}
          </div>
          <div v-if="tip" class="tip g-text-secondary ml-16">{{ tip }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ cancelText }}</el-button>
        <el-button type="primary" @click="confirm">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
const emit = defineEmits(['confirm', 'cancel']);
/**
 * 该组件接受的其他 props 与 el-dialog 的 props 一致
 */
defineProps({
  msg: {
    type: String,
    default: '确定该操作吗？',
  },
  tip: String,
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
  title: {
    type: String,
    default: '提示',
  },
  customClass: String,
});
const confirm = () => emit('confirm');
const cancel = () => emit('cancel');
</script>
<style lang="scss">
.base-confirm-dialog {
  &.el-dialog {
    top: 50%;
    left: 50%;
    width: fit-content;
    margin: 0;
    border-radius: 8px;
    transform: translate(-50%, -50%);
  }
  .justify-start {
    align-items: start;
  }
  .msg {
    min-width: 382px;
    max-width: 482px;
    line-height: 22px;
  }
  .tip {
    margin-top: 22px;
    font-size: 12px;
  }
  .dialog-footer {
    .el-button {
      width: 60px;
      height: 36px;
    }
  }
}
</style>
