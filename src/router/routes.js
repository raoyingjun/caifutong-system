export default [
  {
    path: '/home', // 首页
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/workbench', //  工作台 -> 子页面
    name: 'Index',
    component: () => import('@/views/workbench/index.vue'),
  },
];
