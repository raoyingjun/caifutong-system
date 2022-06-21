<template>
  <base-card margin="trb" label="数据看板">
    <div
      v-for="board in dataBoardList"
      :key="board.url"
      class="data-board-item"
      :style="{ background: `url(${board.url})` }"
    >
      <div class="title">{{ board.title }}</div>
      <div class="data">{{ board.data }}</div>
    </div>
  </base-card>
</template>

<script setup>
import myIncoming from '@/assets/img/images/home_my_incoming.png';
import mySend from '@/assets/img/images/home_my_send.png';
import SystemIncoming from '@/assets/img/images/home_system_incoming.png';
import SystemSend from '@/assets/img/images/home_system_send.png';
import BaseCard from '@/components/base-card.vue';

const dataBoardList = [
  {
    url: myIncoming,
    title: '我的收文',
    data: 1200,
  },
  {
    url: mySend,
    title: '我的发文',
    data: 1200,
  },
  {
    url: SystemIncoming,
    title: '系统收文',
    data: 1200,
  },
  {
    url: SystemSend,
    title: '系统发文',
    data: 1200,
  },
];
</script>

<style lang="scss" scoped>
.data-board-item {
  box-sizing: border-box;
  width: 384px;
  height: 109px;
  margin: 24px 0;
  border-radius: 8px;
  padding: {
    top: 18px;
    left: 92.07px;
  }
  .data {
    color: rgba(75, 91, 118, 1);
    font-weight: 700;
    font-size: 32px;
    font-family: 'DIN Alternate';
  }
}
</style>
