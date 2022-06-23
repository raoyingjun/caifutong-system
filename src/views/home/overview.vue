<template>
  <notice />
  <el-container>
    <el-main>
      <base-card>
        <template #label>
          <el-button
            v-for="tab in tabs"
            :key="tab.routeName"
            :class="[tab.className, activeTab === tab.routeName ? 'active' : '']"
            @click="$router.push({ name: tab.routeName })"
            >{{ tab.tabName }}</el-button
          >
        </template>
        <router-view />
      </base-card>
    </el-main>
    <el-aside width="456px">
      <data-board />
    </el-aside>
  </el-container>
</template>

<script setup>
import DataBoard from './components/data-board.vue';
import { routeName } from '../../router/enum';
import Notice from './components/notice.vue';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();
const tabs = ref([
  {
    tabName: '发文列表',
    routeName: routeName.HomeOverViewSendDocumentList,
  },
  {
    tabName: '收文列表',
    routeName: routeName.HomeOverViewIncomingDocumentList,
    className: 'ml-4',
  },
]);

const activeTab = computed(() => route.name || routeName.HomeOverViewSendDocumentList);

// const pushTo =
</script>
<style scoped lang="scss">
// 统一 button 样式
:deep(.el-button) {
  padding: 9px 18px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid #ebebeb;
  &.active {
    color: #1573ff;
    background: white;
  }
}
</style>
