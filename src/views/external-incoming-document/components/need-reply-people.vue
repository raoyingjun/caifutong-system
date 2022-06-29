<template>
  <base-table :total="120" class="mt-24" :data="needReplyPeople">
    <el-table-column label="需回复人" prop="people"></el-table-column>
    <el-table-column label="需回复事项" prop="event" show-overflow-tooltip></el-table-column>
    <el-table-column
      label="回复内容"
      prop="content"
      :formatter="({ content }) => content || '-'"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <template v-if="row.content">
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
import { ref } from 'vue';

const needReplyPeople = ref([
  {
    people: 'vivianxu(许微微)',
    event: '这里是需回复事项这里是需回复事项这里是需回复事项',
    content: '这里是回复内容这里是回复内容这里是回复内容这里是回复内容',
  },
  {
    people: 'vivianxu(许微微)',
    event: '这里是需回复事项这里是需回复事项这里是需回复事项',
    content: '',
  },
  {
    people: 'vivianxu(许微微)',
    event: '这里是需回复事项这里是需回复事项这里是需回复事项',
    content: '这里是回复内容这里是回复内容这里是回复内容这里是回复内容',
    attachment: '这里是附件',
  },
]);
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
