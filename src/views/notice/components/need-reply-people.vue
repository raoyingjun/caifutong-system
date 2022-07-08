<template>
  <base-table :total="120" class="mt-24" :data="data.replyViewUsers">
    <el-table-column label="需回复人" prop="username"></el-table-column>
    <el-table-column label="需回复事项" prop="todoDescription" show-overflow-tooltip></el-table-column>
    <el-table-column
      label="回复内容"
      prop="content"
      :formatter="({ todoReply }) => todoReply || '-'"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <template v-if="row.todoReply">
          <template v-if="row.attachment">
            <el-icon style="vertical-align: middle"><Link /></el-icon>
            <el-link :underline="false" type="primary" class="ml-16">预览</el-link>
            <el-link :underline="false" type="primary" class="ml-8">下载</el-link>
          </template>
          <template v-else>-</template>
        </template>
        <el-link v-else :underline="false" type="primary">催办</el-link>
      </template>
    </el-table-column>
  </base-table>
</template>

<script setup>
import { inject } from 'vue';
const data = inject('data');
</script>
<style scoped lang="scss">
:deep(.el-table) {
  $marginLeft: 56px;
  width: calc(100% - $marginLeft);
  margin-left: $marginLeft;
  & .el-table__cell {
    padding: 10px 0;
    &.is-leaf {
      padding: 15px 0;
    }
  }
}
</style>
