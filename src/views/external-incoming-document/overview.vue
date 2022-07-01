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
            <base-select
              v-model="form.createId"
              clearable
              :remote-method="findUserList"
              filterable
              option-label="username"
              option-value="id"
              :options="filteredUserList"
              remote
              :loading="filterUserLoading"
            />
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
              :options="$store.state.incomingDocTypes"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="紧急程度" style="margin-right: 0">
            <base-select
              v-model="form.emergencyDegree"
              placeholder="全部"
              option-label="key"
              :options="$store.state.urgencyDegrees"
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
        <el-button type="primary" class="ml-16">
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
        <template #default>
          <el-button type="primary" link @click="$router.push({ name: routeName.externalIncomingDocumentViewDetail })"
            >查看
          </el-button>
          <el-button type="primary" link @click="urge">催办</el-button>
          <el-button type="primary" link>加处理人</el-button>
          <el-button type="primary" link @click="cancel">撤回</el-button>
        </template>
      </el-table-column>
    </base-table>
  </base-card>
  <base-confirm-dialog
    v-model="messageTipDialogVisible"
    :msg="msg"
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
import { onMounted, reactive, ref } from 'vue';
import ChooseUrgencyPeopleDialog from '@/components/choose-urgency-people-dialog.vue';
import { ElMessage } from 'element-plus';
import { routeName } from '@/router/enum';
import { usePagination } from '../../composites/common';
import { externalIncomingDocument as api } from '@/apis';
import { findLabelByValue } from '../../utils';

const sendDocumentList = ref(
  Array(10)
    .fill(undefined)
    .map(() => ({
      id: '202202050799999',
      title: '这里是文档名称',
      from: '那这里是来文单位',
      incomingCreator: 'irzhu(朱俊星)',
      incomingBody: '总公司',
      incomingType: '通知类',
      urgency: '一般',
      time: '2021/11/11 10:24:14',
      readCount: '3/5',
      replyCount: '0/5',
    })),
);
let currentAction = ''; // urge | cancel
const messageTipDialogVisible = ref(false);
const chooseUrgencyPeopleDialogVisible = ref(false);
const msg = ref('');
const tip = ref('');
const { currentPage, pageSize, total } = usePagination();
const filterUserLoading = ref(false);
const filteredUserList = ref([{ username: '请选择', id: 0 }]);
const timeRange = ref([]);
const form = reactive({
  docName: '',
  receiveDepartmentName: '',
  createId: 0,
  type: 0,
  emergencyDegree: 0,
  sendDepartmentName: '',
});
const choseUrgencyPeople = () => {
  chooseUrgencyPeopleDialogVisible.value = false;
  messageTipDialogVisible.value = true;
  msg.value =
    '将给irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),推送邮件和MyOA消息提醒，请确认';
  tip.value = '';
};

const handleUrge = () => {
  messageTipDialogVisible.value = false;
  ElMessage.success('成功催办');
};

const urge = () => {
  currentAction = 'urge';
  chooseUrgencyPeopleDialogVisible.value = true;
};

const cancel = () => {
  currentAction = 'cancel';
  messageTipDialogVisible.value = true;
  msg.value = '未传阅人：irzhu(朱俊星)，irzhu(朱俊星)，irzhu(朱俊星)，irzhu(朱俊星)；';
  msg.value += '<br>未回复人：irzhu(朱俊星)，irzhu(朱俊星)，irzhu(朱俊星)，irzhu(朱俊星) ；';
  msg.value += '<br>撤回后他们将无法继续传阅或回复，请确认。';
  tip.value = '注：撤回仅撤回待办，无法撤回提示邮件。';
};

const handleCancel = () => {
  messageTipDialogVisible.value = false;
  ElMessage.success('撤回成功');
};

const confirmMessageTip = () => {
  switch (currentAction) {
    case 'urge':
      handleUrge();
      break;
    case 'cancel':
      handleCancel();
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
  sendDocumentList.value = result;
  total.value = _total;
};

const findUserList = async (query) => {
  filterUserLoading.value = true;
  const { data } = await api.findUserList(query);
  filterUserLoading.value = false;
  filteredUserList.value.push.apply(filteredUserList.value, data);
};

onMounted(() => {
  getIncomingDocumentList();
  findUserList();
});
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 432px;
  }
}
</style>
