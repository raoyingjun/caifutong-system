<template>
  <view-more v-model="overflowVisible" class="mt-24">
    <el-form :inline="true" label-width="105px" :form="form">
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
          <el-form-item label="收文创建人">
            <user-select v-model="form.createId" placeholder="请输入收文创建人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="overflowVisible" justify="space-between">
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
          <el-form-item label="紧急程度">
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
        <el-col v-if="overflowVisible" :span="8">
          <el-form-item label="发布日期">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="overflowVisible ? 8 : 16" class="justify-end">
          <el-button>重置</el-button>
          <el-button type="primary" @click="getIncomingDocumentList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </view-more>
  <div class="justify-end">
    <el-link
      :underline="false"
      type="primary"
      @click="$router.push({ name: routeName.externalIncomingDocumentOverView })"
    >
      查看更多
      <el-icon :size="12" class="ml-4">
        <img src="/src/assets/img/icons/view_more.svg" />
      </el-icon>
    </el-link>
  </div>
  <base-table
    v-model:page-size="pageSize"
    v-model:current-page="currentPage"
    :total="total"
    class="mt-24"
    :data="sendDocumentList"
    @change="getIncomingDocumentList"
  >
    <el-table-column label="序号" type="index" :index="formatIndex" width="63"></el-table-column>
    <el-table-column label="文档名称" prop="ExternalDocName" width="150"></el-table-column>
    <el-table-column label="来文单位" prop="SendDepartment"></el-table-column>
    <el-table-column label="收文创建人" prop="CreatedName"></el-table-column>
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
    <el-table-column label="发布时间" prop="CreateTime" width="153"></el-table-column>
    <el-table-column label="操作" width="90">
      <template #default>
        <el-link :underline="false" type="primary" @click="$router.push({ name: routeName.HomeViewDetail })"
          >查看详情</el-link
        >
      </template>
    </el-table-column>
  </base-table>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue';
import ViewMore from '@/components/view-more.vue';
import { formatIndex } from '@/utils/formatter';
import { routeName } from '@/router/enum';
import { usePagination } from '@/composites/common';
import { externalIncomingDocument as api } from '@/apis';
import { findLabelByValue } from '@/utils';
const form = reactive({
  docName: '',
  receiveDepartmentName: '',
  createId: '',
  type: 0,
  emergencyDegree: 0,
  sendDepartmentName: '',
});
const overflowVisible = ref(false);
const timeRange = ref([]);
const { currentPage, pageSize, total } = usePagination();
const sendDocumentList = ref([]);
const getIncomingDocumentList = async () => {
  const {
    data: { total: _total, result },
  } = await api.getExternalIncomingDocumentList({
    ...form,
    page: currentPage.value,
    size: pageSize.value,
    createId: form.createId || 0,
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
