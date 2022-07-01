<template>
  <el-aside class="page-sidebar" :class="isMenuCollapse ? 'case-aside-close' : 'case-aside-open'">
    <el-menu
      :collapse="isMenuCollapse"
      :default-active="activeMenu"
      :default-openeds="subMenuIds"
      background-color="#1F2745"
      text-color="#b2bfdc"
      active-text-color="#fff"
    >
      <template v-for="rootMenu in menusTree">
        <el-sub-menu v-if="rootMenu.children" :key="rootMenu.id" :index="rootMenu.id">
          <template #title>
            <span class="root-menu">{{ rootMenu.name }}</span>
          </template>

          <el-menu-item
            v-for="secondMenu in rootMenu.children"
            :key="secondMenu.id"
            :index="secondMenu.id"
            :popper-class="secondMenu.path"
            @click="handleClick"
          >
            {{ secondMenu.name }}
          </el-menu-item>
        </el-sub-menu>

        <!-- 一级菜单 -->
        <el-menu-item v-else :key="rootMenu.id" :index="rootMenu.id" :popper-class="rootMenu.path" @click="handleClick">
          <span>{{ rootMenu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { defineComponent, computed } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const HIDE_MENU = 'hide';

// 工具方法： 从扁平数组 menus 转为树状结构 menus
const toMenuTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  const data = cloneDeep(array);
  const resultTree = [];
  const hash = {};

  data.forEach((item) => {
    hash[item[id]] = item;
  });

  data.forEach((item) => {
    const firstMenuObj = hash[item[pid]];

    if (firstMenuObj) {
      if (!firstMenuObj[children]) {
        firstMenuObj[children] = [];
      }

      firstMenuObj[children].push(item);
    } else {
      resultTree.push(item);
    }
  });

  return resultTree;
};

export default defineComponent({
  props: {
    isMenuCollapse: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const menus = computed(() => store.state?.menus);
    const visibleMenus = menus.value.filter((menu) => menu.mpid !== HIDE_MENU);
    const menusTree = computed(() => toMenuTree(visibleMenus, 'id', 'mpid'));

    const subMenuIds = menusTree?.value
      // eslint-disable-next-line array-callback-return
      ?.map((menu) => {
        if (menu?.children) {
          return menu?.id;
        }
      })
      .filter((menu) => menu);

    const activeMenu = computed(() => {
      const currentMenu = menus?.value?.find((menu) => menu.path === route.path);
      if (!currentMenu) return '';
      if (currentMenu.mpid === HIDE_MENU) {
        return currentMenu.bpid; // 如果是隐藏菜单，则取父级id
      }

      return currentMenu.id;
    });

    function handleClick({ index }) {
      const clickedMenu = menus.value.find((menu) => menu?.id === index);
      router.push(clickedMenu?.path);
    }

    return {
      menus,
      menusTree,
      subMenuIds,
      activeMenu,
      handleClick,
    };
  },
});
</script>

<style scoped lang="scss">
.page-sidebar {
  height: calc(100vh - 64px);
  background-color: #1f2745;
  box-shadow: 0 8px 8px #e0e1e2;
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 6px;
  }
  .root-menu {
    font-weight: bold;
  }
  .el-menu-item.is-active {
    background: #32385b;
    border-right: 4px solid #1573ff;
  }
}

.case-aside-close {
  z-index: 2;
  width: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  transition: width 150ms linear;
}

.case-aside-open {
  z-index: 2;
  width: 220px;
  // height: calc(100vh - 50px);
  overflow-y: auto;
  transition: width 300ms linear;
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 6px;
  }
}
</style>
