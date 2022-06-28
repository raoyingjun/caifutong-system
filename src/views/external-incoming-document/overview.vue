<template>
  <base-card label="外部收文">
    <el-form :inline="true" label-width="85px" class="mt-24">
      <el-row>
        <el-col :span="8">
          <el-form-item label="文档名称">
            <el-input placeholder="请输入文档名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="来文单位">
            <el-input placeholder="请输入来文单位" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="收文创建人" style="margin-right: 0">
            <el-input placeholder="请输入收文创建人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="8">
          <el-form-item label="收文主体">
            <el-input placeholder="请输入收文主体" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="收文类型">
            <base-select placeholder="全部" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="紧急程度" style="margin-right: 0">
            <base-select placeholder="全部" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发布日期">
            <el-date-picker
              style="width: 432px"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8" class="justify-end">
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" class="ml-16">
          <el-icon :size="16" class="mr-8"><CirclePlus /></el-icon>新建
        </el-button>
      </el-row>
    </el-form>
    <base-table :total="120" class="mt-24" :data="sendDocumentList">
      <el-table-column label="序号" type="index" :index="formatIndex" width="63"></el-table-column>
      <el-table-column label="收文编号" prop="id" width="145"></el-table-column>
      <el-table-column label="文档名称" prop="title">
        <template #default="{ row }">
          <el-tooltip :content="row.title" placement="top-start">
            <div class="g-overflow-ellipsis">{{ row.title }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="来文单位" prop="from">
        <template #default="{ row }">
          <el-tooltip :content="row.from" placement="top-start">
            <div class="g-overflow-ellipsis">{{ row.from }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="收文主体" prop="incomingBody"></el-table-column>
      <el-table-column label="收文类型" prop="incomingType"></el-table-column>
      <el-table-column label="紧急程度" prop="urgency"></el-table-column>
      <el-table-column label="收文时间" prop="time" width="153"></el-table-column>
      <el-table-column label="收文创建人" prop="incomingCreator">
        <template #default="{ row }">
          <el-tooltip :content="row.incomingCreator" placement="top-start">
            <div class="g-overflow-ellipsis">{{ row.incomingCreator }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="已读状态" prop="readCount"></el-table-column>
      <el-table-column label="回复状态" prop="replyCount"></el-table-column>
      <el-table-column label="操作" width="210">
        <template #default>
          <el-button type="primary" link>查看</el-button>
          <el-button type="primary" link @click="chooseUrgencyPeopleDialogVisible = true">催办</el-button>
          <el-button type="primary" link>加处理人</el-button>
          <el-button type="primary" link>回复</el-button>
        </template>
      </el-table-column>
    </base-table>
  </base-card>
  <base-confirm-dialog
    v-model="singleUrgencyDialogVisible"
    msg="将给irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),
irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu
(朱俊星),irzhu(朱俊星),irzhu(朱俊星),irzhu(朱俊星),推送邮件和MyOA消息提醒，请确认"
    @cancel="singleUrgencyDialogVisible = false"
    @confirm="pushMessage"
  />
  <choose-urgency-people-dialog
    v-model="chooseUrgencyPeopleDialogVisible"
    @cancel="chooseUrgencyPeopleDialogVisible = false"
    @confirm="choseUrgencyPeople"
  />
</template>

<script setup>
import { formatIndex } from '@/utils/formatter';
import { ref } from 'vue';
import ChooseUrgencyPeopleDialog from '@/components/choose-urgency-people-dialog.vue';
import { ElMessage } from 'element-plus';

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
const singleUrgencyDialogVisible = ref(false);
const chooseUrgencyPeopleDialogVisible = ref(false);
const choseUrgencyPeople = () => {
  chooseUrgencyPeopleDialogVisible.value = false;
  singleUrgencyDialogVisible.value = true;
};

const pushMessage = () => {
  singleUrgencyDialogVisible.value = false;
  ElMessage.success('成功催办');
};
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__content {
    width: 432px;
  }
}
</style>
