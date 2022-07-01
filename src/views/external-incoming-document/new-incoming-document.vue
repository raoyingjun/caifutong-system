<template>
  <incoming-document-creation-info-form />
  <send-document-info-form />
  <fixed-operation class="bokopfkghopeth">
    <el-button type="info" plain>取消</el-button>
    <el-button plain type="primary">预览</el-button>
    <el-button class="save-draft">保存草稿</el-button>
    <el-button type="primary">提交</el-button>
  </fixed-operation>
</template>

<script setup>
import IncomingDocumentCreationInfoForm from './components/incoming-document-creation-info-form.vue';
import SendDocumentInfoForm from './components/send-document-info-form.vue';
</script>
<style lang="scss" scoped>
.bokopfkghopeth {
  .el-button {
    width: 150px !important;
    height: 45px;
    margin-left: 32px;
  }
  .save-draft {
    color: white;
    background: rgba(39, 189, 255, 1);
  }
}
</style>

<style></style>
