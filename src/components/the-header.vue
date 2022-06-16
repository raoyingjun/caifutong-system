<template>
  <el-header class="page-header">
    <div class="wx-logo">系统名称xxx</div>

    <el-dropdown trigger="click" class="user-profile">
      <div class="profile">
        <div>{{ '用户名xx' }}</div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 65px;
  line-height: 65px;
  .profile {
    line-height: 65px;
  }
}
</style>
