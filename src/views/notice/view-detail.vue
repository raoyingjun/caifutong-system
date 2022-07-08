<template>
  <incoming-document-creation-info />
  <send-document-info />
  <internal-receiver-info />
  <fixed-operation>
    <el-button type="info" plain>撤回</el-button>
    <el-button type="primary" plain>返回</el-button>
  </fixed-operation>
</template>
<script setup>
import IncomingDocumentCreationInfo from './components/incoming-document-creation-info.vue';
import SendDocumentInfo from './components/send-document-info.vue';
import InternalReceiverInfo from './components/internal-receiver-info.vue';
import { externalIncomingDocument as api } from '@/apis';
import { useRoute } from 'vue-router';
import { onMounted, provide, reactive } from 'vue';
const route = useRoute();
const data = reactive({
  id: '',
  nickname: 'Orange',
  serialNum: 'S202207040003',
  DepartmentName: '开发部门',
  createTime: '2022-07-04T03:19:43Z',
  receiveCompanyName: '中国财付通总公司',
  sendDepartment: 'hgadfghihadf',
  externalDocName: 'fdjsoafgisdjgoajsdfg',
  externalSerialNum: 'fidjsogjodfigidfjg',
  typeName: '',
  tagsName: '',
  SecretDegreeName: '公开',
  emergencyDegreeName: '紧急',
  fileURLs: '',
  receiveBrief: '',
  mainViewUsers: [],
  secondaryViewUsers: [],
  replyViewUsers: [],
});
provide('data', data);
const getExternalIncomingDocDetail = async () => {
  console.log(route);
  const { data: res } = await api.getExternalIncomingDocumentDetail(route.params.id);
  Object.assign(data, res);
};

onMounted(() => {
  getExternalIncomingDocDetail();
});
</script>
<style lang="scss" scoped>
.el-button {
  width: 128px;
  height: 40px;
  margin-left: 32px;
}
</style>
