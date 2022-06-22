<template>
  <view-more v-model="overflowVisible" class="mt-middle">
    <el-form :inline="true" label-width="105px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="签发文号">
            <el-input placeholder="请输入文档名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="来文单位">
            <el-input placeholder="请输入来文单位" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="签发人">
            <el-input placeholder="请输入收文创建人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="overflowVisible" justify="space-between">
        <el-col :span="8">
          <el-form-item label="发文对象">
            <el-input placeholder="请输入收文主体" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="发文类型">
            <base-select placeholder="全部" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="紧急程度">
            <base-select placeholder="全部" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="overflowVisible" :span="8">
          <el-form-item label="发布日期">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="overflowVisible ? 8 : 16" class="justify-end">
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </view-more>
  <div class="justify-end">
    <el-link :underline="false" type="primary">
      查看更多
      <el-icon :size="12" style="margin-left: 4px">
        <img src="/src/assets/img/icons/view_more.svg" />
      </el-icon>
    </el-link>
  </div>
  <base-table :total="120" class="mt-middle">
    <el-table-column label="序号" prop="accountType"></el-table-column>
    <el-table-column label="签发文号" prop="gzhName"></el-table-column>
    <el-table-column label="文档名称" prop="gzhID"></el-table-column>
    <el-table-column label="收文主体" prop="protocolID"></el-table-column>
    <el-table-column label="紧急程度" prop="accountType"></el-table-column>
    <el-table-column label="会签人" prop="gzhName"></el-table-column>
    <el-table-column label="签发人" prop="gzhID"></el-table-column>
    <el-table-column label="发布时间" prop="protocolID"></el-table-column>
    <el-table-column label="操作" prop="accountType"></el-table-column>
  </base-table>
</template>

<script setup>
import { ref } from 'vue';
import BaseSelect from '../../components/base-select.vue';
import ViewMore from '@/components/view-more.vue';

const overflowVisible = ref(false);
</script>
<style scoped lang="scss">
// 统一 input 高度&行高
:deep(.el-form-item) {
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
:deep(.el-divider) {
  &.el-divider--horizontal {
    margin: {
      top: 0;
      bottom: 16px;
    }
  }
}
</style>
