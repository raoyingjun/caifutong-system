<template>
  <base-card class="notice justify-space-between" margin="ltr">
    <img class="img" src="@/assets/img/images/home_notice_banner.jpg" />
    <div style="flex: auto" class="ml-24">
      <div class="notice-bar justify-space-between mb-24">
        <div class="notice-image justify-space-between">
          <div class="notice-image-icon justify-center">
            <el-icon :size="16" class="icon ml-4">
              <img src="/src/assets/img/icons/home_notice_sound.svg" />
            </el-icon>
          </div>
          <div class="notice-image-text">公告</div>
        </div>
        <el-link :underline="false" type="primary" @click="$router.push({ name: routeName.HomeViewMore })">
          查看更多
          <el-icon :size="12" class="ml-4">
            <img src="/src/assets/img/icons/view_more.svg" />
          </el-icon>
        </el-link>
      </div>
      <el-row v-for="(notice, index) in notices" :key="index" class="mb-16">
        <el-col :span="1">
          <el-icon class="seq" :class="index < 3 ? `seq-${index + 1}` : ''">
            {{ `0${index + 1}` }}
          </el-icon>
        </el-col>
        <el-col :span="14">
          {{ notice.title }}
          <el-tag v-if="index < 3" class="tag ml-16">置顶</el-tag>
        </el-col>
        <el-col :span="5" class="g-text-secondary"> {{ notice.createdName }}</el-col>
        <el-col :span="4" class="g-text-secondary justify-end"> {{ notice.createTime }}</el-col>
      </el-row>
    </div>
  </base-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { routeName } from '@/router/enum';
import { notice as api } from '@/apis';

const notices = ref([]);
const reqData = { page: 1, size: 5 };
const getNoticeList = async () => {
  const {
    data: { result },
  } = await api.getNoticeList(reqData);
  notices.value = result || [];
};

onMounted(() => {
  getNoticeList();
});
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

  &-bar {
    height: 36px;
  }

  .mb-16:last-child {
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
  .seq {
    width: 26px;
    height: 16px;
    color: #d0d0d0;
    font-weight: bold;
    font-size: 12px;
    font-family: TencentSans;
    &-1 {
      color: #d9001b;
    }
    &-2 {
      color: #ed7b2f;
    }
    &-3 {
      color: #f7c797;
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
