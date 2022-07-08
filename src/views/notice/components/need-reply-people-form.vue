<template>
  <el-button type="primary" class="ml-80" @click="dialogVisible = true">
    <el-icon :size="16" class="mr-8">
      <CirclePlus />
    </el-icon>
    需回复人
  </el-button>
  <base-table :total="120" class="mt-24 ml-80" :data="form.replyUsers.users">
    <el-table-column label="需回复人" prop="username" width="230"></el-table-column>
    <el-table-column label="需回复事项" show-overflow-tooltip :formatter="() => form.replyUsers.msg"></el-table-column>
    <el-table-column label="操作" width="240">
      <template #default="{ $index }">
        <el-icon :size="16" class="ml-16 g-pointer" color="#1573FF" @click="edit"><EditPen /></el-icon>
        <el-icon :size="16" class="ml-16 g-pointer" color="#FF4646" @click="del($index)"><Delete /></el-icon>
      </template>
    </el-table-column>
  </base-table>
  <choose-replier-dialog v-model="dialogVisible" :form="form" @confirm="confirm" />
</template>

<script setup>
import { ref, inject } from 'vue';
import ChooseReplierDialog from './choose-replier-dialog.vue';
const form = inject('form');

const dialogVisible = ref(false);
const confirm = () => {
  dialogVisible.value = false;
};

const edit = () => {
  dialogVisible.value = true;
};

const del = (index) => {
  form.replyUsers.users.splice(index, 1);
};
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
