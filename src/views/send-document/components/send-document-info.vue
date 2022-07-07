<template>
  <base-card label="来文信息">
    <el-descriptions :column="2" class="mt-20">
      <el-descriptions-item label="来文单位" :span="2">{{ data.sendDepartment }}</el-descriptions-item>
      <el-descriptions-item label="外部收文名称" :span="2">{{ data.externalDocName }}</el-descriptions-item>
      <el-descriptions-item label="外部收文文号" :span="2">{{ data.externalSerialNum }}</el-descriptions-item>
      <el-descriptions-item label="收文类型" :span="2">{{ data.typeName }}</el-descriptions-item>
      <el-descriptions-item label="收文标签" :span="2">
        <el-tag v-for="tag in data.tagsName.split(';')" :key="tag" type="info" class="mr-8">{{ tag }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="收文密级">{{ data.SecretDegreeName }}</el-descriptions-item>
      <el-descriptions-item label="紧急程度">{{ data.emergencyDegreeName }}</el-descriptions-item>
      <el-descriptions-item label="附件" :span="2">
        <el-link :underline="false" type="primary" :href="data.fileURLs">
          {{ substringFileName(data.fileURLs) }}
        </el-link>
        <el-icon :size="13" style="vertical-align: middle" class="ml-16"> <img :src="PreviewIcon" /> </el-icon>
        <el-icon :size="13" style="vertical-align: middle" class="ml-16"> <img :src="DownloadIcon" /> </el-icon>
      </el-descriptions-item>
    </el-descriptions>
  </base-card>
</template>
<script setup>
import DownloadIcon from '@/assets/img/icons/download.svg';
import PreviewIcon from '@/assets/img/icons/preview.svg';
import { inject } from 'vue';
import { substringFileName } from '@/utils/formatter';

const data = inject('data');
</script>
