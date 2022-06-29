import { routeName } from './enum';

export default [
  {
    path: '/home', // 首页
    name: routeName.Home,
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '',
        redirect: { name: routeName.HomeOverViewSendDocumentList },
      },
      {
        path: 'overview',
        name: routeName.HomeOverView,
        component: () => import('@/views/home/overview.vue'),
        children: [
          {
            path: '',
            redirect: { name: routeName.HomeOverViewSendDocumentList },
          },
          {
            path: 'sendDocumentList',
            name: routeName.HomeOverViewSendDocumentList,
            component: () => import('@/views/home/send-document-list.vue'),
          },
          {
            path: 'incomingDocumentList',
            name: routeName.HomeOverViewIncomingDocumentList,
            component: () => import('@/views/home/incoming-document-list.vue'),
          },
        ],
      },
      {
        path: 'viewMore',
        name: routeName.HomeViewMore,
        component: () => import('@/views/home/view-more.vue'),
      },
      {
        path: 'viewDetail',
        name: routeName.HomeViewDetail,
        component: () => import('@/views/home/view-detail.vue'),
      },
    ],
  },
  {
    path: '/externalIncomingDocument', // 外部收文
    name: routeName.externalIncomingDocument,
    component: () => import('@/views/external-incoming-document/index.vue'),
    children: [
      {
        path: '',
        redirect: { name: routeName.externalIncomingDocumentOverView },
      },
      {
        path: 'overview',
        name: routeName.externalIncomingDocumentOverView,
        component: () => import('@/views/external-incoming-document/overview.vue'),
      },
      {
        path: 'viewDetail',
        name: routeName.externalIncomingDocumentViewDetail,
        component: () => import('@/views/external-incoming-document/view-detail.vue'),
      },
      {
        path: 'newIncomingDocument',
        name: routeName.externalIncomingNewIncomingDocument,
        component: () => import('@/views/external-incoming-document/new-incoming-document.vue'),
      },
    ],
  },
  {
    path: '/workbench', //  工作台 -> 子页面
    name: 'Index',
    component: () => import('@/views/workbench/index.vue'),
  },
];
