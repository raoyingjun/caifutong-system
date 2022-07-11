<template>
  <el-upload drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple name="files">
    <el-icon class="mt-36" color="#1573ff" :size="36">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">将文件拖入此处，或<em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">只能上传pdf,doc,docx,ppt,pptx,jpg,png文件，且不超过100M，文件数量不超过20个</div>
    </template>
  </el-upload>
</template>
<style scoped lang="scss">
:deep(.el-upload) {
  width: 634px;
  height: 131.69px;
}
:deep(.el-upload-dragger) {
  width: 100%;
  height: 100%;
  padding: 0;
  background: #fbfdff;
  border: 1px solid rgba(21, 115, 255, 0.56);
}
.el-upload__text {
  line-height: 14px;
}
</style>
