<template>
  <base-card label="来文信息">
    <el-form :inline="true" label-width="150px" class="mt-24">
      <el-row>
        <el-form-item label="来文单位">
          <el-input v-model="form.sendDepartment" placeholder="请输入来文单位" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="外部收文名称" style="width: 100%; margin-right: 0">
          <el-input v-model="form.externalDocName" placeholder="请输入收文名称" maxlength="100" show-word-limit />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="外部收文文号">
          <el-input v-model="form.externalSerialNum" placeholder="请输入外部收文文号" maxlength="50" show-word-limit />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="收文类型">
          <base-select
            v-model="form.type"
            placeholder="请输入外部收文类型"
            option-label="key"
            :options="$store.state.incomingDocTypes"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="收文标签" style="width: 100%; margin-right: 0">
          <base-select v-model="form.tags" option-label="key" :options="$store.state.incomingDocTags" multiple />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收文密级">
            <base-select
              v-model="form.secretDegree"
              placeholder="请输入外部收文文号"
              option-label="key"
              :options="$store.state.incomingDocSecretLevels"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="justify-end">
          <el-form-item label="紧急程度" style="margin-right: 0">
            <base-select v-model="form.emergencyDegree" option-label="key" :options="$store.state.urgencyDegrees" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="附件上传">
          <base-upload :action="getFileUploadUrl()" :on-success="handleUploadSuccess" name="files" />
        </el-form-item>
      </el-row>
    </el-form>
  </base-card>
</template>
<script setup>
import { getFileUploadUrl } from '@/configs/env';
import { inject } from 'vue';
const form = inject('form');
const handleUploadSuccess = ({ data: uploadedFilesPath }) => {
  form.fileUrls = uploadedFilesPath;
};
</script>
<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 636px;
    .el-input-group__prepend {
      width: 90px;
    }
  }
}
</style>
