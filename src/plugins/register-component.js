import * as icons from '@element-plus/icons-vue';
// 全局组件
import BaseTable from '@/components/base-table.vue';
import BaseCard from '@/components/base-card.vue';
import BaseSelect from '@/components/base-select.vue';
import BaseConfirmDialog from '@/components/base-confirm-dialog.vue';
export default {
  install(app) {
    // 批量支持全量icon
    Object.keys(icons).forEach((name) => {
      app.component(name, icons[name]);
    });

    app.component('BaseTable', BaseTable);
    app.component('BaseCard', BaseCard);
    app.component('BaseSelect', BaseSelect);
    app.component('BaseConfirmDialog', BaseConfirmDialog);
  },
};
