<template>
  <base-card label="外部收文">
    <el-form :inline="true" label-width="85px" class="mt-24" :form="form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入文档名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="发布人">
            <user-select v-model="form.createdId" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="发布时间" style="margin-right: 0">
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
          <el-button
            type="primary"
            class="ml-16"
            :icon="CirclePlus"
            @click="$router.push({ name: routeName.externalIncomingNewIncomingDocument })"
          >
            新建
          </el-button>
          <el-button
            type="danger"
            class="ml-16"
            :icon="Delete"
            :disabled="selectedIds.length === 0"
            @click="multiDelete"
          >
            批量删除</el-button
          >
        </el-col>
        <el-col :span="8" :offset="8" class="justify-end">
          <el-button>重置</el-button>
          <el-button type="primary" @click="getNoticeList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <base-table
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      v-loading="tableLoading"
      class="mt-24"
      :data="noticeList"
      :total="total"
      @change="getNoticeList"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" :index="formatIndex"></el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
      <el-table-column label="发布人" prop="createdName"></el-table-column>
      <el-table-column label="发布时间" prop="createTime"></el-table-column>
      <el-table-column label="置顶" width="210">
        <template #default="{ row, $index }">
          <el-switch
            :model-value="row.isTop"
            :active-value="1"
            :inactive-value="0"
            @change="(val) => setNoticeTop(val, $index)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            @click="$router.push({ name: routeName.externalIncomingDocumentViewDetail, params: { id: row.ID } })"
            >编辑
          </el-button>
          <el-button type="primary" link @click="singleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </base-table>
  </base-card>
  <base-confirm-dialog
    v-model="messageTipDialogVisible"
    :msg="msg"
    :confirm-loading="confirmLoading"
    @cancel="messageTipDialogVisible = false"
    @confirm="confirmMessageTip"
  />
</template>

<script setup>
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import { formatIndex } from '@/utils/formatter';
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { routeName } from '@/router/enum';
import { usePagination } from '../../composites/common';
import { notice as api } from '@/apis';

const isTopped = 1; // 置顶的

const noticeList = ref([]);
const currentAction = ref(''); // setTop | delete
const messageTipDialogVisible = ref(false);
const { currentPage, pageSize, total } = usePagination();
const timeRange = ref([]);
const form = reactive({
  title: '',
  createdId: '',
});
const currentIndex = ref(0);
const confirmLoading = ref(false);

const tops = computed(() => noticeList.value.filter((notice) => notice.isTop === 1).length);
const msg = computed(() => {
  if (currentAction.value === 'setTop') {
    if (tops.value >= 3) {
      return '只能置顶3条公告，取消其他置顶才可以置顶这条公告';
    }
  } else if (currentAction.value === 'delete') {
    return '该公告删除后无法恢复，是否确认删除？';
  }

  return '';
});
const selectedIds = ref([]);
const singleDelete = async (id) => {
  currentAction.value = 'delete';
  selectedIds.value = [id];
  messageTipDialogVisible.value = true;
};

const selectionChange = (notices) => {
  selectedIds.value = notices.map((notice) => notice.id);
};

const multiDelete = () => {
  currentAction.value = 'delete';
  messageTipDialogVisible.value = true;
};

const handleDelete = async () => {
  confirmLoading.value = true;
  await api.deleteNotice(selectedIds.value);
  messageTipDialogVisible.value = false;
  confirmLoading.value = false;
  getNoticeList();
  ElMessage.success('删除成功');
};

const confirmMessageTip = () => {
  switch (currentAction.value) {
    case 'delete':
      handleDelete(selectedIds.value);
      break;
    case 'setTop':
      messageTipDialogVisible.value = false;
      break;
  }
};

const tableLoading = ref(false);
const getNoticeList = async () => {
  tableLoading.value = true;
  const {
    data: { result },
  } = await api.getNoticeList({
    ...form,
    page: currentPage.value,
    size: pageSize.value,
    ...(timeRange.value && { startTime: timeRange.value[0] / 1000, endTime: timeRange.value[1] / 1000 }),
    createdId: form.createdId || 0,
  });
  noticeList.value = result || [];
  tableLoading.value = false;
};

const setNoticeTop = async (isTop, index) => {
  currentIndex.value = index;
  currentAction.value = 'setTop';
  if (tops.value >= 3 && isTop === isTopped) {
    messageTipDialogVisible.value = true;
    return;
  }

  const { id } = noticeList.value[index];
  const postData = {
    id,
    isTop,
  };
  await api.updateNotice(postData);
  ElMessage.success(`${isTop ? '' : '取消'}置顶成功`);
  getNoticeList();
};

onMounted(() => {
  getNoticeList();
});
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 432px;
  }
}
</style>
