<template>
  <div class="table-wrapper">
    <el-table v-bind="$attrs" ref="baseTable" :border="border">
      <slot />
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      class="pagination"
      background
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BaseTable',

  props: {
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 10,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['change', 'update:size', 'update:page'],

  setup(props, { emit }) {
    const pageSize = computed(() => props.size);
    const currentPage = computed(() => props.page / props.size + 1);

    function handleSizeChange(val) {
      // 改变每页数量时重置为第一页
      emit('update:size', val);
      emit('update:page', 0);
      emit('change');
    }

    function handleCurrentChange(val) {
      emit('update:page', (val - 1) * pageSize.value);
      emit('update:size', pageSize.value);
      emit('change');
    }

    return {
      pageSize,
      currentPage,
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
