<template>
  <div class="bread-wrapper">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.id" :to="breadcrumb.path || ''">
        {{ breadcrumb.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-button v-if="breadcrumbMpids?.includes('hide')" type="text" size="small" @click="$router.back()">
      返回
    </el-button>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    const breadcrumbList = computed(() => {
      const res = [];
      const menus = computed(() => store.state.menus);

      const setBreadcrumb = (currentMenu) => {
        if (currentMenu) {
          res.unshift(currentMenu);
          if (currentMenu.bpid) {
            setBreadcrumb(menus?.value?.find((item) => item.id === currentMenu.bpid));
          }
        }
      };

      const currentMenu = menus.value.find((item) => item.path === route.path);
      setBreadcrumb(currentMenu);

      return res;
    });

    const breadcrumbMpids = computed(() => {
      return breadcrumbList.value?.map((item) => item?.mpid).filter((item) => item);
    });

    return {
      breadcrumbList,
      breadcrumbMpids,
    };
  },
});
</script>

<style lang="scss" scoped>
.bread-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin: -12px 0 20px 0;
  padding: 8px 24px;
  background: #fff;
}
</style>
