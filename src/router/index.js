import { createRouter, createWebHistory } from 'vue-router';
import childrenRoutes from '@/router/routes';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/home',
      component: () => import(/* webpackChunkName: "Layout"*/ '@/components/layout.vue'),
      children: childrenRoutes,
    },
  ],
});

export default router;
