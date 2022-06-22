<template>
  <base-card class="notice justify-space-between" margin="ltr">
    <img class="img" src="@/assets/img/images/home_notice_banner.jpg" />
    <div style="flex: auto" class="ml-middle">
      <div class="notice-bar justify-space-between mb-middle">
        <div class="notice-image justify-space-between">
          <div class="notice-image-icon justify-center">
            <el-icon :size="16" style="margin-left: 4px" class="icon">
              <img src="/src/assets/img/icons/home_notice_sound.svg" />
            </el-icon>
          </div>
          <div class="notice-image-text">公告</div>
        </div>
        <el-link :underline="false" type="primary">
          查看更多
          <el-icon :size="12" style="margin-left: 4px">
            <img src="/src/assets/img/icons/view_more.svg" />
          </el-icon>
        </el-link>
      </div>
      <el-row v-for="(notice, index) in notices" :key="index" class="mb-small">
        <el-col :span="1">
          <el-icon style="width: 26px; height: 16px">
            <img :src="`/src/assets/img/icons/home_notice_seq_0${index + 1}.svg`" />
          </el-icon>
        </el-col>
        <el-col :span="14">
          {{ notice.title }}
          <el-tag class="tag ml-small" v-if="index < 3">置顶</el-tag>
        </el-col>
        <el-col :span="5" class="g-text-secondary"> {{ notice.author }}</el-col>
        <el-col :span="4" class="g-text-secondary justify-end"> {{ notice.time }}</el-col>
      </el-row>
    </div>
  </base-card>
</template>
<script setup>
import { ref } from 'vue';

const notices = ref(
  Array(5)
    .fill(undefined)
    .map(() => ({
      title: '这里是公告标题这里是公告标题这里是公告标题',
      author: 'irzhu（朱俊星)',
      time: '2021/11/11 16:05:36',
    })),
);
</script>
<style scoped lang="scss">
.img {
  width: 518px;
  height: 224px;
  object-fit: cover;
  border-radius: 8px;
}

.notice {
  align-items: stretch;
  font-size: 14px;

  &-bar {
    height: 36px;
  }

  .mb-small:last-child {
    margin-bottom: 0;
  }

  &-image {
    width: 104px;
    overflow: hidden;
    color: #1573ff;
    font-weight: bold;
    font-size: 20px;
    font-family: TencentSans;
    border: 1px solid #1573ff;
    border-radius: 4px;

    &-icon {
      width: 40px;
      height: 36px;
      background: #1573ff;
    }

    &-text {
      flex: auto;
      text-align: center;
    }
  }

  .tag {
    width: 36px;
    height: 18px;
    color: white;
    font-size: 12px;
    font-family: TencentSans;
    background: linear-gradient(270deg, #6171ff 0%, #6297ff 100%);
  }
}
</style>
