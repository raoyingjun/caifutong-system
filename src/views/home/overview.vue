<template>
  <notice />
  <el-container>
    <el-main>
      <base-card>
        <template #label>
          <el-button
            v-for="tab in tabs"
            :key="tab.routeName"
            :class="[tab.className, activeTab === tab.routeName ? 'active' : '', 'button']"
            @click="$router.push({ name: tab.routeName })"
            >{{ tab.tabName }}</el-button
          >
        </template>
        <div class="sub-module-common-style">
          <router-view />
        </div>
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
.button {
  padding: 9px 18px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid #ebebeb;
  &.active {
    color: #1573ff;
    background: white;
  }
}
// 子路由页面 发文列表&收文列表 通用样式
:deep(.sub-module-common-style) {
  .el-form-item {
    .el-form-item__content {
      width: 216.67px;
    }

    .el-form-item__label,
    .el-input,
    .el-date-editor {
      height: 28px;
      line-height: 28px;
    }

    margin: {
      right: 0;
      bottom: 16px;
    }
  }
  .el-divider {
    &.el-divider--horizontal {
      margin: {
        top: 0;
        bottom: 16px;
      }
    }
  }
  .el-button {
    padding: 6px 16px;
  }
  .el-table {
    .el-table__cell {
      padding: 8px 0;
    }
  }
}
</style>
