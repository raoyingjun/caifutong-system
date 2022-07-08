<template>
  <base-confirm-dialog custom-class="choose-replier-dialog" title="添加内部接收人（需回复）" @confirm="confirm">
    <el-form label-width="120px" class="mt-24">
      <el-form-item label="内部接收人">
        <user-select
          v-model="form.replyUsers.users"
          multiple
          placeholder="请输入内部接收人（可多选）"
          option-value="self"
          value-key="id"
        />
      </el-form-item>
      <el-form-item label="需回复事项">
        <el-input
          v-model="form.replyUsers.msg"
          placeholder="请输入需回复事项"
          maxlength="10000"
          show-word-limit
          type="textarea"
          style="height: 347px"
        />
      </el-form-item>
    </el-form>
  </base-confirm-dialog>
</template>
<script setup>
/**
 * 该组件接受的 props 与 el-dialog 的 props 一致
 */
import { inject } from 'vue';
const form = inject('form');
</script>
<style lang="scss">
.choose-replier-dialog {
  &.el-dialog {
    width: 1000px;
  }
}
</style>
