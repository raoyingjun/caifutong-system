<template>
  <base-card>
    <base-table
      :data="tableData"
      :total="totalCount"
      :header-cell-style="{ background: '#fafafa', color: '#606266' }"
      @change="handlePageChange"
    >
      <el-table-column label="账号类型" prop="accountType"></el-table-column>
      <el-table-column label="公众号名称" prop="gzhName"></el-table-column>
      <el-table-column label="公众号ID" prop="gzhID"></el-table-column>
      <el-table-column label="协议单号" prop="protocolID"></el-table-column>
      <el-table-column label="提交时间">
        <template #default="{ row }">
          <div>{{ row.submitTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="120px">
        <template #default="{ row }">
          <el-button type="text" @click="view(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </base-table>
  </base-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { serviceA } from '@/apis';

const getData = (currentPage = 1, pageSize = 10) => {
  serviceA
    .getProductByName({
      pageSize: currentPage,
      curPage: pageSize,
    })
    .then((res) => {
      tableData.value = res.Response.Result;
      totalCount.value = res.Response.total;
    });
};

const totalCount = ref(120);
const tableData = ref([
  {
    accountType: '机构',
    gzhName: '测试号',
    orgName: '深圳市腾讯计算机系统有限公司',
    gzhID: '123',
    protocolID: '123',
    submitTime: '2021',
    email: '1299407913@qq.com',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    accountType: '个人',
    gzhName: '测试号',
    gzhID: '123',
    protocolID: '123',
    submitTime: '2022',
  },
]);

const handlePageChange = (currentPage, pageSize) => {
  getData(currentPage, pageSize); // 获取到最新的 currentPage 和 pageSize 参数，然后请求接口重新获取列表数据，刷新页面
};

onMounted(async () => {
  // getData();
});
</script>

<style lang="scss" scoped>
.protocol {
  padding: 24px;
  background: #fff;
}

.protocol-tab {
  margin-bottom: 20px;
}

.protocol-search {
  display: flex;

  .el-form-item {
    width: 320px;
    margin-right: 40px;
  }
}

.protocol-table {
  margin-top: 20px;
}
</style>
