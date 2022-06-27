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
    name: '工作台',
    path: '',
    icon: '',
    limit: '',
  },
  {
    id: '3-1',
    mpid: '3',
    bpid: '3',
    name: '页面1',
    path: '/workbench',
    icon: '',
    limit: '',
  },
];
