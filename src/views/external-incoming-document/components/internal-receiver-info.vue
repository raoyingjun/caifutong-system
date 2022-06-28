<template>
  <base-card label="内部接收人信息">
    <div class="justify-end"><el-button link type="primary" style="margin-right: 6%">批量催办</el-button></div>
    <el-descriptions :column="1">
      <el-descriptions-item label="传阅人（主送）">
        <span v-for="(people, index) in circulatedMainSendPeople" :key="index">
          {{ people }}
          <el-link type="primary" class="ml-8 mr-16" :underline="false">催办</el-link>
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="传阅人（抄送）">
        <span v-for="(people, index) in circulatedCopySendPeople" :key="index">
          {{ people }}
          <el-link type="primary" class="mh-16" :underline="false">催办</el-link>
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="收文摘要" style="line-height: 19.6px"
        >这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要这里是收文摘要</el-descriptions-item
      >
    </el-descriptions>
  </base-card>
</template>
<script setup>
import { ref } from 'vue';

const circulatedMainSendPeople = ref(
  Array(6)
    .fill()
    .map(() => 'vivianxu(许微微)'),
);
const circulatedCopySendPeople = ref(
  Array(3)
    .fill()
    .map(() => 'cocoliu(刘可可)'),
);
</script>
