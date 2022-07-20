import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'normalize.css';
import RegisterComponent from './plugins/register-component';
import App from './app.vue';
import router from './router';
import store from './store';

import '@/assets/style/index.scss';

const app = createApp(App);

app.use(RegisterComponent);
app.use(router);
app.use(store);
app.use(ElementPlus, { locale: zhCn });

app.mount('#app');

store.dispatch('getUrgencyDegrees');
store.dispatch('getIncomingDocTypes');
store.dispatch('getIncomingDocSecretLevels');
store.dispatch('getIncomingDocTags');
store.dispatch('getTagTypes');
