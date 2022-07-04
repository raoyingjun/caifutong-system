<template>
  <base-card label="外部收文">
    <el-form :inline="true" label-width="85px" class="mt-24" :form="form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="文档名称">
            <el-input v-model="form.docName" placeholder="请输入文档名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="来文单位">
            <el-input v-model="form.sendDepartmentName" placeholder="请输入来文单位" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="收文创建人" style="margin-right: 0">
            <user-select v-model="form.createId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="8">
          <el-form-item label="收文主体">
            <el-input v-model="form.receiveDepartmentName" placeholder="请输入收文主体" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="收文类型">
            <base-select
              v-model="form.type"
              placeholder="全部"
              option-label="key"
              :options="$store.getters.incomingDocTypesIncludeAll"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="紧急程度" style="margin-right: 0">
            <base-select
              v-model="form.emergencyDegree"
              placeholder="全部"
              option-label="key"
              :options="$store.getters.urgencyDegreesIncludeAll"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发布日期">
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
        <el-col :span="8" :offset="8" class="justify-end">
          <el-button>重置</el-button>
          <el-button type="primary" @click="getIncomingDocumentList">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          class="ml-16"
          @click="$router.push({ name: routeName.externalIncomingNewIncomingDocument })"
        >
          <el-icon :size="16" class="mr-8">
            <CirclePlus />
          </el-icon>
          新建
        </el-button>
      </el-row>
    </el-form>
    <base-table
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      class="mt-24"
      :data="sendDocumentList"
      :total="total"
      @change="getIncomingDocumentList"
    >
      <el-table-column label="序号" type="index" :index="formatIndex" width="63"></el-table-column>
      <el-table-column label="收文编号" prop="SerialNum" width="145"></el-table-column>
      <el-table-column label="文档名称" prop="ExternalDocName" show-overflow-tooltip></el-table-column>
      <el-table-column label="来文单位" prop="SendDepartment" show-overflow-tooltip></el-table-column>
      <el-table-column label="收文主体" prop="ReceiveDepartment"></el-table-column>
      <el-table-column
        label="收文类型"
        :formatter="({ Type }) => findLabelByValue(Type, $store.state.incomingDocTypes, ['key', 'value'])"
      ></el-table-column>
      <el-table-column
        label="紧急程度"
        :formatter="
          ({ EmergencyDegree }) => findLabelByValue(EmergencyDegree, $store.state.urgencyDegrees, ['key', 'value'])
        "
      ></el-table-column>
      <el-table-column label="收文时间" prop="CreateTime" width="153"></el-table-column>
      <el-table-column label="收文创建人" prop="CreatedName" show-overflow-tooltip></el-table-column>
      <el-table-column
        label="已读状态"
        :formatter="(row) => `${row.NowViewCount}/${row.NeedViewCount}`"
      ></el-table-column>
      <el-table-column
        label="回复状态"
        :formatter="(row) => `${row.NowReplyCount}/${row.NeedReplyCount}`"
      ></el-table-column>
      <el-table-column label="操作" width="210">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            link
            @click="$router.push({ name: routeName.externalIncomingDocumentViewDetail, params: { id: row.ID } })"
            >查看
          </el-button>
          <el-button type="primary" link @click="urge">催办</el-button>
          <el-button type="primary" link>加处理人</el-button>
          <el-button type="primary" link @click="cancel($index)">撤回</el-button>
        </template>
      </el-table-column>
    </base-table>
  </base-card>
  <base-confirm-dialog
    v-model="messageTipDialogVisible"
    :msg="msg"
    :tip="tip"
    :confirm-loading="confirmLoading"
    @cancel="messageTipDialogVisible = false"
    @confirm="confirmMessageTip"
  />
  <choose-urgency-people-dialog
    v-model="chooseUrgencyPeopleDialogVisible"
    @cancel="chooseUrgencyPeopleDialogVisible = false"
    @confirm="choseUrgencyPeople"
  />
</template>

<script setup>
import { formatIndex } from '@/utils/formatter';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import ChooseUrgencyPeopleDialog from '@/components/choose-urgency-people-dialog.vue';
import { ElMessage } from 'element-plus';
import { routeName } from '@/router/enum';
import { usePagination } from '../../composites/common';
import { externalIncomingDocument as api } from '@/apis';
import { findLabelByValue } from '../../utils';
import { useUnReplierUsers, useUnViewerUsers } from '../../composites/user';

const sendDocumentList = ref([]);
const currentAction = ref(''); // urge | cancel
const messageTipDialogVisible = ref(false);
const chooseUrgencyPeopleDialogVisible = ref(false);
const { currentPage, pageSize, total } = usePagination();
const timeRange = ref([]);
const form = reactive({
  docName: '',
  receiveDepartmentName: '',
  createId: 0,
  type: 0,
  emergencyDegree: 0,
  sendDepartmentName: '',
});
const currentIndex = ref(0);
const confirmLoading = ref(false);
const choseUrgencyPeople = () => {
  chooseUrgencyPeopleDialogVisible.value = false;
  messageTipDialogVisible.value = true;
};

const handleUrge = () => {
  messageTipDialogVisible.value = false;
  ElMessage.success('成功催办');
};

const urge = () => {
  currentAction.value = 'urge';
  chooseUrgencyPeopleDialogVisible.value = true;
};

const tip = computed(() => (currentAction.value === 'urge' ? '' : '注：撤回仅撤回待办，无法撤回提示邮件'));
const msg = computed(() => {
  let msg = '';
  if (sendDocumentList.value.length === 0) {
    return msg;
  }
  if (currentAction.value === 'urge') {
    msg =
      '将给irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),推送邮件和MyOA消息提醒，请确认';
  } else if (currentAction.value === 'cancel') {
    const unReplierUsers = useUnReplierUsers(sendDocumentList.value[currentIndex.value].UserInfos);
    const unViewerUsers = useUnViewerUsers(sendDocumentList.value[currentIndex.value].UserInfos);
    console.log(currentIndex.value, sendDocumentList.value[currentIndex.value], unReplierUsers);
    const unReplierUsersString = unReplierUsers.value.map((user) => user.username).join('，');
    const unViewerUsersString = unViewerUsers.value.map((user) => user.username).join('，');
    msg = `未传阅人：${unViewerUsersString}`;
    msg += `<br>未回复人：${unReplierUsersString} ；`;
    msg += '<br>撤回后他们将无法继续传阅或回复，请确认。';
  } else {
    msg = '';
  }

  return msg;
});
const cancel = (index) => {
  currentIndex.value = index;
  currentAction.value = 'cancel';
  messageTipDialogVisible.value = true;
};

const handleCancel = async (id) => {
  confirmLoading.value = true;
  await api.cancelExternalIncomingDocumentTodo(id);
  messageTipDialogVisible.value = false;
  confirmLoading.value = false;
  getIncomingDocumentList();
  ElMessage.success('撤回成功');
};

const confirmMessageTip = () => {
  switch (currentAction.value) {
    case 'urge':
      handleUrge();
      break;
    case 'cancel':
      handleCancel(sendDocumentList.value[currentIndex.value].ID);
      break;
  }
};

const getIncomingDocumentList = async () => {
  const {
    data: { total: _total, result },
  } = await api.getExternalIncomingDocumentList({
    ...form,
    page: currentPage.value,
    size: pageSize.value,
    ...(timeRange.value && { startTime: timeRange.value[0] / 1000, endTime: timeRange.value[1] / 1000 }),
  });
  sendDocumentList.value = [];
  nextTick(() => {
    sendDocumentList.value = result || [];
  });
  total.value = _total;
};

onMounted(() => {
  getIncomingDocumentList();
});
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 432px;
  }
}
</style>
