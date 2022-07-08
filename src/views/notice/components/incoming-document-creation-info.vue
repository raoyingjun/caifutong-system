<template>
  <base-card label="收文创建信息">
    <el-descriptions :column="2" class="mt-20">
      <el-descriptions-item label="收文编号" width="50%">{{ data.serialNum }}</el-descriptions-item>
      <el-descriptions-item label="收文创建部门">{{ data.DepartmentName }}</el-descriptions-item>
      <el-descriptions-item label="收文创建人">{{ data.nickname }}</el-descriptions-item>
      <el-descriptions-item label="收文主体">{{ data.receiveCompanyName }}</el-descriptions-item>
      <el-descriptions-item label="收文创建时间">{{ data.createTime }}</el-descriptions-item>
    </el-descriptions>
  </base-card>
</template>
<script setup>
import { inject } from 'vue';

const data = inject('data');
</script>
