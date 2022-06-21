<template>
  <notice />
  <el-container>
    <el-main>
      <base-card>
        <template #label>
          <el-button @click="$router.push({ name: routeName.HomeOverViewSendDocumentList })">发文列表</el-button>
          <el-button
            style="margin-left: 4px"
            @click="$router.push({ name: routeName.HomeOverViewIncomingDocumentList })"
            >收文列表
          </el-button>
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
</script>
