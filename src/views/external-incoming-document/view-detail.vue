<template>
  <incoming-document-creation-info />
  <send-document-info />
  <internal-receiver-info />
  <div class="justify-end g-operation g-fixed g-fixed-bottom">
    <el-button type="info" plain>撤回</el-button>
    <el-button type="primary" plain>返回</el-button>
  </div>
</template>
<script setup>
import IncomingDocumentCreationInfo from './components/incoming-document-creation-info.vue';
import SendDocumentInfo from './components/send-document-info.vue';
import InternalReceiverInfo from './components/internal-receiver-info.vue';
</script>
<style scoped lang="scss">
.g-operation {
  :deep(.el-button) {
    width: 128px;
    height: 40px;
    margin-left: 32px;
  }
}
</style>
