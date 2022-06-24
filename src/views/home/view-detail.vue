<template>
  <el-container>
    <el-main>
      <base-card class="article">
        <div class="article-title mb-8">这里是公告标题这里是公告标题这里是公告标题这里是公告标题</div>
        <div class="article-time g-text-secondary">发布时间：2021/11/11 16:05:36</div>
        <div class="article-body mt-8">文章正文属于富文本编辑器，待补充。</div>
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
                <div class="time g-text-secondary">{{ notice.time }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </base-card>
    </el-aside>
  </el-container>
</template>
<script setup>
import { ref } from 'vue';

const notices = ref(
  Array(5)
    .fill(undefined)
    .map(() => ({
      title: '这里是公告标题这里是公告标题这里是公告标题这里是公告标题',
      time: '2021/11/11 16:05:36',
    })),
);
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
