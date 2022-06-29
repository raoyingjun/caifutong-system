<template>
  <base-card label="收文创建信息">
    <el-form :inline="true" label-width="150px" class="mt-24">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收文编号">
            <el-input disabled model-value="由系统自动生成" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收文创建部门">
            <el-input model-value="\S1职能系统\职能线\职能线办公室\组织建设组" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收文创建人">
            <el-input model-value="irzhu（朱俊星)" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收文主体">
            <el-input model-value="收文主体">
              <template #prepend>
                <base-select model-valude="总公司" />
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布日期">
            <el-date-picker style="width: 432px" type="datetime" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </base-card>
</template>
<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 432px;
    .el-input-group__prepend {
      width: 90px;
    }
  }
}
</style>
