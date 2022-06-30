<template>
  <div class="table-wrapper">
    <el-table v-bind="$attrs" ref="baseTable" :border="border">
      <slot />
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      class="pagination"
      background
      :total="total"
      :page-size-sizes="[10, 20, 50, 100]"
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseTable',

  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['change', 'update:currentPage', 'update:pageSize'],

  setup(props, { emit }) {
    function handleSizeChange(val) {
      // 改变每页数量时重置为第一页
      emit('update:pageSize', val);
      emit('update:currentPage', 1);
      emit('change');
    }

    function handleCurrentChange(val) {
      emit('update:currentPage', val);
      emit('change');
    }

    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
  margin-top: 8px;
  padding: 0 30px 0 5px;
  background: #fff;
}
</style>
