<template>
  <incoming-document-creation-info-form />
  <send-document-info-form />
  <div class="justify-end operation">
    <el-button class="cancel">取消</el-button>
    <el-button class="preview">预览</el-button>
    <el-button class="save-draft">保存草稿</el-button>
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script setup>
import IncomingDocumentCreationInfoForm from './components/incoming-document-creation-info-form.vue';
import SendDocumentInfoForm from './components/send-document-info-form.vue';
</script>
<style scoped lang="scss">
.operation {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 78px;
  padding-right: 48px;
  background: white;
  box-shadow: 0 0 36px 0 rgba(0, 0, 0, 0.25);
  :deep(.el-button) {
    width: 150px;
    height: 45px;
    margin-left: 32px;
  }
  .cancel {
    color: #999;
    background: white;
    border: 1px solid #999;
    opacity: 1;
  }
  .preview {
    color: #005ad8;
    background: white;
    border: 1px solid #005ad8;
  }
  .save-draft {
    color: white;
    background: rgba(39, 189, 255, 1);
  }
}
</style>
