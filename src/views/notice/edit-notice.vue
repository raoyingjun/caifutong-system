<template>
  <base-card v-loading="loading">
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
        <el-date-picker style="width: 432px" type="datetime" :model-value="form.time || Date()" disabled />
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
import { cloneDeep, assign } from 'lodash';
import { notice as api } from '@/apis';
import { ElMessage } from 'element-plus';
import { getFileUploadUrl } from '@/configs/env';
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { substringFileName } from '../../utils/formatter';
const route = useRoute();
const form = reactive({
  title: '',
  content: '',
  fileUrls: [],
  id: Number(route.params.id),
});
const loading = ref(false);

const ui2api = () => {
  const formData = cloneDeep(form);
  formData.fileUrls = formData.fileUrls.map((file) => file.url || file.response.data[0]).join(';');
  return formData;
};

const api2ui = (result) => {
  const form = {};
  form.fileUrls = result.FileURLs
    ? result.FileURLs.split(';').map((url) => ({
        name: substringFileName(url),
        url,
      }))
    : [];
  form.content = result.Content;
  form.title = result.Title;
  form.time = result.CreateTime;
  return form;
};

const submitLoading = ref(false);

const submit = async () => {
  try {
    submitLoading.value = true;
    await api.updateNotice(ui2api());
    ElMessage.success('修改公告成功');
  } finally {
    submitLoading.value = false;
  }
};

const getNoticeById = async () => {
  loading.value = true;
  try {
    const {
      data: { Detail },
    } = await api.getNoticeById(route.params.id);
    assign(form, api2ui(Detail));
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getNoticeById();
});
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
