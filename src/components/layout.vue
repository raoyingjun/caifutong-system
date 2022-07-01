<template>
  <el-container class="page-container">
    <the-header />
    <el-container class="content-container">
      <the-sidebar :is-menu-collapse="isMenuCollapse"></the-sidebar>
      <el-main :class="[mainClas, isMenuCollapse ? 'menu-collapse' : 'menu-uncollapse']">
        {{ mainClas }}
        <the-breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
    <div :class="isMenuCollapse ? 'menu-collapsed' : 'menu-uncollapsed'" @click="isMenuCollapse = !isMenuCollapse">
      <i :class="isMenuCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'" />
    </div>
  </el-container>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';
import TheHeader from './the-header.vue';
import TheSidebar from './the-sidebar.vue';
import TheBreadcrumb from './the-breadcrumb.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { TheHeader, TheSidebar, TheBreadcrumb },

  setup() {
    const store = useStore();
    const state = reactive({
      isMenuCollapse: false,
    });
    const mainClas = computed(() => {
      const h = store.state.layoutFooterVisible ? 'main-area footer-height' : 'main-area';
      console.log(h);
      return h;
    });
    return {
      ...toRefs(state),
      mainClas,
    };
  },
});
</script>

<style scoped lang="scss">
.page-container {
  flex-direction: column;
  .content-container {
    flex-direction: row;
    .main-area {
      height: calc(100vh - 75px);
      overflow: auto;
      background-color: #f5f7fa;
      transition: padding 0.3s;
      &.footer-height {
        height: calc(100vh - 75px - 78px);
      }
    }
  }

  .menu-collapse {
    left: 0;
    width: 100vw;
  }

  .menu-uncollapse {
    width: calc(100vw - 220px);
  }

  .menu-uncollapsed {
    position: absolute;
    bottom: 50%;
    z-index: 2;
    margin-left: 200px;
    padding-top: 12px;
    padding-bottom: 14px;
    padding-left: 4px;
    font-size: 20px;
    cursor: pointer;
    -moz-transition: margin-left 0.3s;
    -webkit-transition: margin-left 0.3s;
    -o-transition: margin-left 0.3s;
    transition: margin-left 0.3s;
    &:hover {
      color: #1493d6;
    }
  }

  .menu-uncollapsed::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: #697391;
    transform: perspective(0.2em) rotateY(-5deg);
    -moz-opacity: 0.4;
    -khtml-opacity: 0.4;
    opacity: 0.4;
    filter: alpha(opacity=50);
    content: '';
  }

  .menu-collapsed {
    position: absolute;
    bottom: 50%;
    z-index: 2;
    margin-left: 0;
    padding-top: 12px;
    padding-right: 3px;
    padding-bottom: 14px;
    font-size: 20px;
    cursor: pointer;
    -moz-transition: margin-left 0.3s;
    -webkit-transition: margin-left 0.3s;
    -o-transition: margin-left 0.3s;
    transition: margin-left 0.3s;
    &:hover {
      left: 3px;
      color: #1493d6;
    }
  }

  .menu-collapsed::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #cccfda;
    transform: perspective(0.2em) rotateY(5deg);
    content: '';
    // -moz-opacity: 0.4;
    // -khtml-opacity: 0.4;
    // opacity: 0.4;
  }
}
</style>
