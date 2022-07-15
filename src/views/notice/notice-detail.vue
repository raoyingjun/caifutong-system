<template>
  <el-container v-loading="loading">
    <el-main>
      <base-card class="article">
        <div class="article-title mb-8">{{ detail.title }}</div>
        <div class="article-time g-text-secondary">发布时间：{{ detail.time }}</div>
        <div class="article-body mt-8" v-html="detail.content" />
        <div class="article-attachment mt-20">
          <span style="vertical-align: top">附件：</span>
          <div style="display: inline-block; width: calc(100% - 42px)">
            <p v-for="file in detail.fileUrls" :key="file.url" class="mv-0 mb-24">
              <el-link type="primary" :href="file.url" :underline="false">
                {{ file.name }}
              </el-link>

              <el-icon :size="13" style="vertical-align: middle" class="ml-16"> <img :src="PreviewIcon" /> </el-icon>
              <el-icon :size="13" style="vertical-align: middle" class="ml-16"> <img :src="DownloadIcon" /> </el-icon>
            </p>
          </div>
        </div>
      </base-card>
    </el-main>
    <el-aside width="436px">
      <base-card class="user-info" margin="trb">
        <img
          src="/src/assets/img/images/home_notice_banner.jpg"
          alt=""
          class="avatar mt-40 g-circle g-box-horizontal-center"
        />
        <div class="mt-20 g-text-center">irzhu（朱俊星)</div>
        <div class="mt-40">
          <el-divider>Ta发布的</el-divider>
          <div class="notice pt-8">
            <el-row v-for="(notice, index) in notices" :key="index" class="mb-24">
              <el-col :span="3">
                <el-icon class="seq g-font-bold" :class="index < 3 ? `seq-${index + 1}` : ''">
                  {{ `0${index + 1}` }}
                </el-icon>
              </el-col>
              <el-col :span="21">
                <div class="title">
                  {{ notice.title }}
                </div>
                <div class="time g-text-secondary">{{ notice.createTime }}</div>
              </el-col>
            </el-row>
          </div>
          <el-button
            class="g-box-horizontal-center"
            plain
            type="primary"
            @click="$router.push({ name: routeName.noticeOverView })"
            >查看更多</el-button
          >
        </div>
      </base-card>
    </el-aside>
  </el-container>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import { notice as api } from '@/apis';
import { substringFileName } from '../../utils/formatter';
import { useRoute } from 'vue-router';
import { assign } from 'lodash';
import { routeName } from '../../router/enum';
import DownloadIcon from '@/assets/img/icons/download.svg';
import PreviewIcon from '@/assets/img/icons/preview.svg';

const route = useRoute();
const notices = ref([]);
const detail = reactive({
  title: '',
  content: '',
  fileUrls: [],
  id: Number(route.params.id),
  time: '',
});
const loading = ref(false);
const api2ui = (result) => {
  const form = {};
  form.fileUrls = result.FileURLs
    ? result.FileURLs.split(';').map((url) => ({
        name: substringFileName(url),
        url,
      }))
    : [];
  form.content = result.Content;
  form.title = result.Title;
  form.time = result.CreateTime;
  return form;
};

const getNoticeById = async () => {
  loading.value = true;
  try {
    const {
      data: {
        Detail,
        RecommendNotice: { notices: noticeList },
      },
    } = await api.getNoticeById(route.params.id);
    notices.value = noticeList;
    assign(detail, api2ui(Detail));
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getNoticeById();
});
</script>
<style scoped lang="scss">
.article {
  padding: 41.5px 84px;
  &-title {
    height: 48px;
    color: black;
    font-size: 32px;
  }
  &-time {
    height: 30px;
    font-size: 20px;
  }
  &-body {
    // 待补充
  }
}

.user-info {
  .avatar {
    width: 72px;
    height: 72px;
  }

  .notice {
    .seq {
      width: 27px;
      height: 30px;
      color: #d0d0d0;
      font-size: 20px;
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

    .title {
      font-size: 16px;
      line-height: 22px;
    }

    .time {
      margin-top: 10px;
    }
  }
}
</style>
