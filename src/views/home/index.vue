<template>
  <base-card class="home">
    <h2>this is home page {{ count }}, {{ doubleCount }}</h2>
    <el-button type="primary" @click="add">add</el-button>
    <el-icon :size="20">
      <edit />
    </el-icon>
  </base-card>
  <el-container>
    <el-main>
      <base-card>
        <template #label>
          <el-button>发文列表</el-button>
          <el-button>收文列表</el-button>
        </template>
        <view-more v-model="overflowVisible"> hello world</view-more>
        <base-table :total="120">
          <el-table-column label="序号" prop="accountType"></el-table-column>
          <el-table-column label="文档名称" prop="gzhName"></el-table-column>
          <el-table-column label="来文单位" prop="gzhID"></el-table-column>
          <el-table-column label="收文创建人" prop="protocolID"></el-table-column>
          <el-table-column label="收文主体" prop="accountType"></el-table-column>
          <el-table-column label="收文类型" prop="gzhName"></el-table-column>
          <el-table-column label="紧急程度" prop="gzhID"></el-table-column>
          <el-table-column label="发布时间" prop="protocolID"></el-table-column>
          <el-table-column label="账号类型" prop="accountType"></el-table-column>
          <el-table-column label="公众号ID" prop="gzhID"></el-table-column>
        </base-table>
      </base-card>
    </el-main>
    <el-aside width="456px">
      <data-board />
    </el-aside>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import BaseCard from '../../components/base-card.vue';
import BaseTable from '../../components/base-table.vue';
import ViewMore from '../../components/view-more.vue';
import DataBoard from './components/data-board.vue';

function useCount() {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  const add = () => {
    count.value += 1;
  };

  watch(count, (newCount, oldCount) => {
    // eslint-disable-next-line no-console
    console.log(`The new count value is: ${newCount} ${oldCount}`);
  });
  return { count, doubleCount, add };
}

const { count, doubleCount, add } = useCount();
const overflowVisible = ref(false);
</script>
