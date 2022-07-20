<template>
  <base-card label="外部收文">
    <el-form :inline="true" label-width="85px" class="mt-24" :form="form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标签名称">
            <el-input v-model="form.keywords" placeholder="请输入标签名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标签类型">
            <base-select
              v-model="form.type"
              :options="$store.getters.tagTypesIncludeAll"
              placeholder="请输入标签类型"
              option-label="key"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="添加人">
            <user-select v-model="form.createdId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="添加时间" style="margin-right: 0">
            <el-date-picker
              v-model="timeRange"
              style="width: 432px"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="x"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="8">
          <el-button type="primary" class="ml-16" :icon="CirclePlus" @click="openAddDialog"> 新增 </el-button>
        </el-col>
        <el-col :span="8" :offset="8" class="justify-end">
          <el-button>重置</el-button>
          <el-button type="primary" @click="getTagList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <base-table
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      v-loading="tableLoading"
      class="mt-24"
      :data="tagList"
      :total="total"
      @change="getTagList"
    >
      <el-table-column label="序号" type="index" :index="formatIndex"></el-table-column>
      <el-table-column label="添加时间" prop="CreateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="标签名称" prop="Name"></el-table-column>
      <el-table-column label="标签类型" prop="TypeName"></el-table-column>
      <el-table-column label="添加人" prop="CreatedName"></el-table-column>
      <el-table-column label="操作" width="210">
        <template #default="{ row, $index }">
          <el-button type="primary" link @click="openEditDialog($index)">编辑 </el-button>
          <el-button type="danger" link @click="openDeleteDialog(row.Id)">删除</el-button>
        </template>
      </el-table-column>
    </base-table>
  </base-card>
  <new-tag-dialog
    v-model="newTagDialogVisible"
    v-if="newTagDialogVisible"
    :confirm-loading="confirmLoading"
    :form="tagList[currentIndex]"
    @cancel="closeEditDialog"
    @confirm="handleEdit"
  />
  <base-confirm-dialog
    v-model="messageTipDialogVisible"
    msg="该标签删除后无法恢复，是否确认删除？"
    :confirm-loading="confirmLoading"
    @cancel="messageTipDialogVisible = false"
    @confirm="handleDelete"
  />
</template>

<script setup>
import { CirclePlus } from '@element-plus/icons-vue';
import { formatIndex } from '@/utils/formatter';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { usePagination } from '../../composites/common';
import { tag as api } from '@/apis';
import NewTagDialog from './components/new-tag-dialog.vue';

const tagList = ref([]);
const newTagDialogVisible = ref(false);
const messageTipDialogVisible = ref(false);
const { currentPage, pageSize, total } = usePagination();
const timeRange = ref([]);
const form = reactive({
  type: 0,
  keywords: '',
  createdId: '',
});
const currentIndex = ref(0);
const confirmLoading = ref(false);
const id = ref(-1);
const openDeleteDialog = (_id) => {
  id.value = _id;
  messageTipDialogVisible.value = true;
};

const openAddDialog = () => {
  currentIndex.value = -1;
  newTagDialogVisible.value = true;
};

const openEditDialog = (index) => {
  currentIndex.value = index;
  newTagDialogVisible.value = true;
};

const closeEditDialog = () => {
  currentIndex.value = -1;
  newTagDialogVisible.value = false;
};

const handleDelete = async () => {
  confirmLoading.value = true;
  await api.deleteTag(id.value);
  messageTipDialogVisible.value = false;
  confirmLoading.value = false;
  getTagList();
  ElMessage.success('删除成功');
};

const handleEdit = async (form) => {
  const isEdit = !!tagList.value[currentIndex.value];
  const request = api[isEdit ? 'updateTag' : 'createTag'];
  try {
    confirmLoading.value = true;
    await request(form);
    getTagList();
    newTagDialogVisible.value = false;
    ElMessage.success(isEdit ? '修改标签成功' : '新增标签成功');
  } finally {
    confirmLoading.value = false;
  }
};

const tableLoading = ref(false);
const getTagList = async () => {
  tableLoading.value = true;
  const {
    data: { result },
  } = await api.getTagList({
    ...form,
    page: currentPage.value,
    size: pageSize.value,
    ...(timeRange.value && { startTime: timeRange.value[0] / 1000, endTime: timeRange.value[1] / 1000 }),
    createdId: form.createdId || 0,
  });
  tagList.value = result || [];
  tableLoading.value = false;
};

onMounted(() => {
  getTagList();
});
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 432px;
  }
}
</style>
