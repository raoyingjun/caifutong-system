<template>
  <base-card>
    <el-form label-width="120px" class="mt-24">
      <el-form-item label="公告标题" style="width: 100%; margin-right: 0" label-width="70px">
        <el-input v-model="form.title" placeholder="请输入公告标题" maxlength="100" show-word-limit />
      </el-form-item>
      <el-form-item label-width="0">
        <editor v-model="form.content" />
      </el-form-item>
      <el-form-item label="附件上传">
        <base-upload v-model:file-list="form.fileUrls" :action="getFileUploadUrl()" />
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker style="width: 432px" type="datetime" :model-value="Date()" disabled />
      </el-form-item>
    </el-form>
    <fixed-operation>
      <el-button type="info" plain>取消</el-button>
      <el-button plain type="primary">预览</el-button>
      <el-button class="save-draft">保存草稿</el-button>
      <el-button type="primary" :loading="submitLoading" @click="submit">提交</el-button>
    </fixed-operation>
  </base-card>
</template>

<script setup>
import { cloneDeep } from 'lodash';
import { notice as api } from '@/apis';
import { ElMessage } from 'element-plus';
import { getFileUploadUrl } from '@/configs/env';
import { reactive, provide, ref } from 'vue';

const form = reactive({
  title: '',
  content: '',
  fileUrls: [],
});

const ui2api = () => {
  const formData = cloneDeep(form);
  formData.fileUrls = formData.fileUrls.map(({ response: { data } }) => data[0]).join(';');
  return formData;
};

const submitLoading = ref(false);
provide('form', form);

const submit = async () => {
  try {
    submitLoading.value = true;
    await api.createNotice(ui2api());
    ElMessage.success('新增公告成功');
  } finally {
    submitLoading.value = false;
  }
};
</script>
<style lang="scss" scoped>
.el-button {
  width: 150px;
  height: 45px;
  margin-left: 32px;
}
.save-draft {
  color: white;
  background: rgba(39, 189, 255, 1);
}
</style>
