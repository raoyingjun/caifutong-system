<template>
  <el-button type="primary" class="ml-80">
    <el-icon :size="16" class="mr-8">
      <CirclePlus />
    </el-icon>
    需回复人
  </el-button>
  <base-table :total="120" class="mt-24 ml-80" :data="form.replyUsers">
    <el-table-column label="需回复人" prop="people" width="230"></el-table-column>
    <el-table-column label="需回复事项" prop="eventContent" show-overflow-tooltip></el-table-column>
    <el-table-column label="操作" width="240">
      <template #default="{ row }">
        <template v-if="row.eventContent">
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
import { defineProps } from 'vue';
defineProps({
  form: Object,
});
</script>
<style scoped lang="scss">
$marginLeft: 80px;
.ml-80 {
  margin-left: 80px;
}
:deep(.el-table) {
  & .el-table__cell {
    padding: 10px 0;
    &.is-leaf {
      padding: 15px 0;
    }
  }
}
</style>
