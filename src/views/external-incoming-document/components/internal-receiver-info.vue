<template>
  <base-card label="内部接收人信息">
    <div class="justify-end">
      <el-button link type="primary" style="margin-right: 6%">批量催办</el-button>
    </div>
    <el-descriptions :column="1">
      <el-descriptions-item label="传阅人（主送）">
        <span v-for="user in data.mainViewUsers" :key="user.userID">
          {{ user.username }}
          <el-link type="primary" class="ml-8 mr-16" :underline="false" :disabled="user.status">催办</el-link>
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="传阅人（抄送）">
        <span v-for="user in data.secondaryViewUsers" :key="user.userID">
          {{ user.username }}
          <el-link type="primary" class="mh-16" :underline="false" :disabled="user.status">催办</el-link>
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="收文摘要" style="line-height: 19.6px">
        {{ data.receiveBrief }}
      </el-descriptions-item>
    </el-descriptions>
    <need-reply-people />
  </base-card>
</template>
<script setup>
import { inject } from 'vue';
import NeedReplyPeople from './need-reply-people.vue';
const data = inject('data');
</script>
