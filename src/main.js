import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import * as icons from '@element-plus/icons-vue';

import App from './app.vue';
import router from './router';
import store from './store';

import '@/assets/style/index.scss';

// 全局组件
import BaseTable from '@/components/base-table.vue';
import BaseCard from '@/components/base-card.vue';

const app = createApp(App);

// 批量支持全量icon
Object.keys(icons).forEach((name) => {
  app.component(name, icons[name]);
});

app.component('BaseTable', BaseTable);
app.component('BaseCard', BaseCard);

app.use(router);
app.use(store);
app.use(ElementPlus, { locale: zhCn });

app.mount('#app');
