<template>
  <div class="pagination-box">
    <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    total: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  setup(_, context) {
    const currentPage = ref(1);
    const pageSize = ref(10);

    const handleSizeChange = (size) => {
      context.root.$emit('request', {
        currentPage,
        size,
      });
    };

    const handleCurrentChange = (current) => {
      context.root.$emit('request', {
        current,
        size: pageSize,
      });
    };

    watch(
      () => currentPage,
      () => {
        context.root.$emit('input', currentPage);
      },
    );

    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination-box {
  text-align: right;
}
</style>
