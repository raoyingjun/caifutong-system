<template>
  <router-view />
</template>
<style scoped lang="scss">
// 子路由页面 发文列表&收文列表 通用样式
:deep(.sub-module-common-style) {
  .el-form-item {
    .el-form-item__content {
      width: 216.67px;
    }

    .el-form-item__label,
    .el-input,
    .el-date-editor {
      height: 28px;
      line-height: 28px;
    }

    margin: {
      right: 0;
      bottom: 16px;
    }
  }
  .el-divider {
    &.el-divider--horizontal {
      margin: {
        top: 0;
        bottom: 16px;
      }
    }
  }
  .el-button {
    padding: 6px 16px;
  }
  .el-table {
    .el-table__cell {
      padding: 8px 0;
    }
  }
}
</style>
