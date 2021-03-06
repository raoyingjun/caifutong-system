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
        path: ':id/viewDetail',
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
    path: '/sendDocument', // 外部收文
    name: routeName.sendDocument,
    component: () => import('@/views/send-document/index.vue'),
    children: [
      {
        path: '',
        redirect: { name: routeName.sendDocumentOverView },
      },
      {
        path: 'overview',
        name: routeName.sendDocumentOverView,
        component: () => import('@/views/send-document/overview.vue'),
      },
      // {
      //   path: ':id/viewDetail',
      //   name: routeName.externalIncomingDocumentViewDetail,
      //   component: () => import('@/views/send-incoming-document/view-detail.vue'),
      // },
      // {
      //   path: 'newIncomingDocument',
      //   name: routeName.externalIncomingNewIncomingDocument,
      //   component: () => import('@/views/send-incoming-document/new-incoming-document.vue'),
      // },
    ],
  },
  {
    path: '/notice', // 外部收文
    name: routeName.notice,
    component: () => import('@/views/notice/index.vue'),
    children: [
      {
        path: '',
        redirect: { name: routeName.noticeOverView },
      },
      {
        path: 'overview',
        name: routeName.noticeOverView,
        component: () => import('@/views/notice/overview.vue'),
      },
      {
        path: 'newNotice',
        name: routeName.newNotice,
        component: () => import('@/views/notice/new-notice.vue'),
      },
      {
        path: ':id/editNotice',
        name: routeName.editNotice,
        component: () => import('@/views/notice/edit-notice.vue'),
      },
      {
        path: ':id/noticeDetail',
        name: routeName.noticeDetail,
        component: () => import('@/views/notice/notice-detail.vue'),
      },
    ],
  },
  {
    path: '/tag', // 外部收文
    name: routeName.tag,
    component: () => import('@/views/tag/index.vue'),
    children: [
      {
        path: '',
        redirect: { name: routeName.tagOverView },
      },
      {
        path: 'overview',
        name: routeName.tagOverView,
        component: () => import('@/views/tag/overview.vue'),
      },
    ],
  },
  {
    path: '/workbench', //  工作台 -> 子页面
    name: 'Index',
    component: () => import('@/views/workbench/index.vue'),
  },
];
