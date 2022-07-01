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
</script>
<style lang="scss" scoped>
.el-button {
  width: 128px;
  height: 40px;
  margin-left: 32px;
}
</style>
