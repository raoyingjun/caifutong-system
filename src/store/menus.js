/*
 * 一级菜单没有 mpid 和 bpid， 二级三级子菜单有， mpid 如果设置为 hide 则隐藏该子菜单，一般是详情页
 * bpid 用于显示导航面包屑内容
 */

export default [
  {
    id: '1',
    name: '首页',
    path: '/home',
    icon: '',
    limit: '',
  },
  {
    id: '2',
    name: '外部收文',
    path: '/externalIncomingDocument',
    icon: '',
    limit: '',
  },
  {
    id: '3',
    name: '对外发文',
    path: '/sendDocument',
    icon: '',
    limit: '',
  },
  {
    id: '4',
    name: '工作台',
    path: '',
    icon: '',
    limit: '',
  },
  {
    id: '4-1',
    mpid: '4',
    bpid: '4',
    name: '页面1',
    path: '/workbench',
    icon: '',
    limit: '',
  },
  {
    id: '5',
    name: '公告管理',
    path: '/notice',
    icon: '',
    limit: '',
  },
  {
    id: '6',
    name: '标签管理',
    path: '/tag',
    icon: '',
    limit: '',
  },
];
