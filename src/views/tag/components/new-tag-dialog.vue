<template>
  <base-confirm-dialog custom-class="new-tag-dialog" :title="isEdit ? '修改标签' : '新增标签'" @confirm="confirm">
    <el-form label-width="90px" class="mt-24">
      <el-form-item label="标签名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="标签类型">
        <base-select v-model="form.type" :options="$store.state.tagTypes" option-label="key" />
      </el-form-item>
    </el-form>
  </base-confirm-dialog>
</template>
<script setup>
/**
 * 该组件接受的 props 与 el-dialog 的 props 一致
 */
import { reactive } from 'vue';
const emit = defineEmits(['confirm']);
const props = defineProps({
  form: Object,
});
const isEdit = !!props.form;
console.log(isEdit);
const form = reactive(
  isEdit
    ? {
        name: props.form.Name,
        type: props.form.TypeId,
        id: props.form.Id,
      }
    : {
        name: '',
        type: '',
      },
);

const confirm = () => {
  emit('confirm', form);
};
</script>
<style lang="scss">
.new-tag-dialog {
  &.el-dialog {
    width: 434px;
  }
  .el-dialog__body {
    padding: {
      top: 0;
      bottom: 0;
    }
  }
}
</style>
