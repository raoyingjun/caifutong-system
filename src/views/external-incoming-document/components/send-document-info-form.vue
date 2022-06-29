<template>
  <base-card label="来文信息">
    <el-form :inline="true" label-width="150px" class="mt-24">
      <el-row>
        <el-form-item label="来文单位">
          <el-input placeholder="请输入来文单位" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="外部收文名称" style="width: 100%; margin-right: 0">
          <el-input placeholder="请输入收文名称" maxlength="100" show-word-limit />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="外部收文文号">
          <el-input placeholder="请输入外部收文文号" maxlength="5" show-word-limit />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="收文类型">
          <base-select placeholder="请输入外部收文类型" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="收文标签" style="width: 100%; margin-right: 0">
          <base-select />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收文密级">
            <el-input placeholder="请输入外部收文文号" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="justify-end">
          <el-form-item label="紧急程度" style="margin-right: 0">
            <base-select />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="附件上传">
          <base-upload />
        </el-form-item>
      </el-row>
    </el-form>
  </base-card>
</template>
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
