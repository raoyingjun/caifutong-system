<template>
  <incoming-document-creation-info-form :form="form" />
  <send-document-info-form :form="form" />
  <internal-receiver-info-form :form="form" />
  <fixed-operation>
    <el-button type="info" plain>取消</el-button>
    <el-button plain type="primary">预览</el-button>
    <el-button class="save-draft">保存草稿</el-button>
    <el-button type="primary" :loading="submitLoading" @click="submit">提交</el-button>
  </fixed-operation>
</template>

<script setup>
import IncomingDocumentCreationInfoForm from './components/incoming-document-creation-info-form.vue';
import SendDocumentInfoForm from './components/send-document-info-form.vue';
import { provide, reactive, ref } from 'vue';
import InternalReceiverInfoForm from './components/internal-receiver-info-form.vue';
import { cloneDeep } from 'lodash';
import { externalIncomingDocument as api } from '@/apis';
import { ElMessage } from 'element-plus';
const form = reactive({
  receiveDepartment: '',
  sendDepartment: '',
  externalDocName: '',
  type: '',
  secretDegree: '',
  tags: [],
  emergencyDegree: '',
  externalSerialNum: '',
  fileUrls: [],
  MainViewUsers: [],
  receiveContent: '',
  secondaryViewUsers: [],
  replyUsers: {
    users: [],
    msg: '',
  },
});
const submitLoading = ref(false);
provide('form', form);

const ui2api = () => {
  const formData = cloneDeep(form);
  formData.fileUrls = formData.fileUrls.join(';');
  formData.MainViewUsers = formData.MainViewUsers.join(';');
  formData.secondaryViewUsers = formData.secondaryViewUsers.join(';');
  formData.tags = formData.tags.join(';');
  const { users, msg } = formData.replyUsers;
  formData.replyUsers = users.map(({ id }) => ({ id, eventContent: msg }));
  return formData;
};

const submit = async () => {
  submitLoading.value = true;
  await api.newExternalIncomingDocument(ui2api());
  submitLoading.value = false;
  ElMessage.success('创建收文成功');
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
