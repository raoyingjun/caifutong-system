import { createRouter, createWebHistory } from 'vue-router';
import childrenRoutes from '@/router/routes';
import { routeName } from './enum';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: { name: routeName.HomeOverViewSendDocumentList },
      component: () => import(/* webpackChunkName: "Layout"*/ '@/components/layout.vue'),
      children: childrenRoutes,
    },
  ],
});

export default router;
