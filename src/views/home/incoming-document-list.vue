<template>
  <view-more v-model="overflowVisible" class="mt-24">
    <el-form :inline="true" label-width="105px">
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
          <el-form-item label="收文创建人">
            <el-input placeholder="请输入收文创建人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="overflowVisible" justify="space-between">
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
      <el-icon :size="12" class="ml-4">
        <img src="/src/assets/img/icons/view_more.svg" />
      </el-icon>
    </el-link>
  </div>
  <base-table :total="120" class="mt-24" :data="sendDocumentList">
    <el-table-column label="序号" type="index" :index="formatIndex" width="63"></el-table-column>
    <el-table-column label="文档名称" prop="title" width="150"></el-table-column>
    <el-table-column label="来文单位" prop="from"></el-table-column>
    <el-table-column label="收文创建人" prop="incomingCreator"></el-table-column>
    <el-table-column label="收文主体" prop="incomingBody"></el-table-column>
    <el-table-column label="收文类型" prop="incomingType"></el-table-column>
    <el-table-column label="紧急程度" prop="urgency"></el-table-column>
    <el-table-column label="发布时间" prop="time" width="153"></el-table-column>
    <el-table-column label="操作" width="90">
      <template #default>
        <el-link :underline="false" type="primary">查看详情</el-link>
      </template>
    </el-table-column>
  </base-table>
</template>

<script setup>
import { ref } from 'vue';
import BaseSelect from '../../components/base-select.vue';
import ViewMore from '@/components/view-more.vue';
import { formatIndex } from '@/utils/formatter';

const overflowVisible = ref(false);
const sendDocumentList = ref(
  Array(10)
    .fill(undefined)
    .map(() => ({
      title: '这里是文档名称…',
      from: '腾讯',
      incomingCreator: 'irzhu(朱俊星)',
      incomingBody: '总公司',
      incomingType: '通知类',
      urgency: '一般',
      time: '2021/11/11 10:24:14',
    })),
);
</script>
