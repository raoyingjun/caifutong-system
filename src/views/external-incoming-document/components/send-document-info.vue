<template>
  <base-card label="来文信息">
    <el-descriptions :column="2" class="mt-20">
      <el-descriptions-item label="来文单位" :span="2">这里是来文单位名称这里是来文单位名称</el-descriptions-item>
      <el-descriptions-item label="外部收文名称" :span="2"
        >这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称这里是外部收文名称</el-descriptions-item
      >
      <el-descriptions-item label="外部收文文号" :span="2">这里是外部收文文号</el-descriptions-item>
      <el-descriptions-item label="收文类型" :span="2">通知类</el-descriptions-item>
      <el-descriptions-item label="收文标签" :span="2">
        <el-tag type="info" class="mr-8">小额</el-tag>
        <el-tag type="info" class="mr-8">金融科技</el-tag>
        <el-tag type="info">反洗钱</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="收文密级">公开</el-descriptions-item>
      <el-descriptions-item label="紧急程度">一般</el-descriptions-item>
      <el-descriptions-item label="附件" :span="2">
        <el-link :underline="false" type="primary">财付通公文管理系统需求说明_中文版.pdf</el-link>
        <el-icon :size="13" style="vertical-align: middle" class="ml-16"> <img :src="PreviewIcon" /> </el-icon>
        <el-icon :size="13" style="vertical-align: middle" class="ml-16"> <img :src="DownloadIcon" /> </el-icon>
      </el-descriptions-item>
    </el-descriptions>
  </base-card>
</template>
<script setup>
import DownloadIcon from '@/assets/img/icons/download.svg';
import PreviewIcon from '@/assets/img/icons/preview.svg';
</script>
