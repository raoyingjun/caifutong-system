<template>
  <base-card label="内部接收人信息">
    <el-form :inline="true" label-width="150px" class="mt-24">
      <el-row>
        <el-form-item label="传阅人（主送）">
          <user-select v-model="form.MainViewUsers" multiple />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="传阅人（抄送）">
          <user-select v-model="form.secondaryViewUsers" multiple />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="收文摘要">
          <el-input
            v-model="form.receiveContent"
            placeholder="请输入收文摘要"
            maxlength="10000"
            show-word-limit
            type="textarea"
            style="height: 120px"
          />
        </el-form-item>
      </el-row>
    </el-form>
    <need-reply-people-form :form="form" />
  </base-card>
</template>
<script setup>
import NeedReplyPeopleForm from './need-reply-people-form.vue';

defineProps({
  form: Object,
});
</script>
<style scoped lang="scss">
:deep(.el-form-item) {
  width: 100%;
  margin-right: 0;
}
</style>
