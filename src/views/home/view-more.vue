<template>
  <base-card label="公告列表">
    <el-form :inline="true" label-width="105px" class="mt-12">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input placeholder="请输入文档名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-center">
          <el-form-item label="发布人">
            <el-input placeholder="全部" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="justify-end">
          <el-form-item label="发布日期" style="margin-right: 0">
            <el-input placeholder="请输入文本" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="justify-end">
        <el-button>重置</el-button>
        <el-button type="primary">查询</el-button>
      </el-row>
    </el-form>
    <base-table :total="120" class="mt-middle" :data="notices">
      <el-table-column type="index" width="82" label="序号" />
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布人" prop="author" width="337"></el-table-column>
      <el-table-column label="发布时间" prop="time" width="170"></el-table-column>
    </base-table>
  </base-card>
</template>
<script setup>
import { ref } from 'vue';

const notices = ref(
  Array(10)
    .fill(undefined)
    .map(() => ({
      title: '这里是公告标题这里是公告标题这里是公告标题这里是公告这里是公告标题这里是公告标题这里是',
      author: 'irzhu（朱俊星)',
      time: '2021/11/11 16:05:36',
    })),
);
</script>
<style lang="scss" scoped>
.el-input {
  width: 395.33px;
}
</style>
