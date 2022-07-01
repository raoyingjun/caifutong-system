import * as icons from '@element-plus/icons-vue';
// 全局组件
import BaseTable from '@/components/base-table.vue';
import BaseCard from '@/components/base-card.vue';
import BaseSelect from '@/components/base-select.vue';
import BaseConfirmDialog from '@/components/base-confirm-dialog.vue';
import BaseUpload from '@/components/base-upload.vue';
import FixedOperation from '@/components/fixed-operation.vue';
import UserSelect from '@/components/user-select.vue';

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
    app.component('BaseUpload', BaseUpload);
    app.component('FixedOperation', FixedOperation);
    app.component('UserSelect', UserSelect);
  },
};
