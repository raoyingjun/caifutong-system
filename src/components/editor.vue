<template>
  <div style="width: 100%; border: 1px solid #d5d5d5">
    <Toolbar
      style="border-bottom: 1px solid #d5d5d5"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="html"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, shallowRef, computed } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { getFileUploadUrl } from '../configs/env';

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const html = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
const mode = 'default'; // 或 'simple'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const toolbarConfig = { excludeKeys: ['fullScreen', 'group-video'] };
const editorConfig = {
  placeholder: '请输入内容...',

  MENU_CONF: {
    uploadImage: {
      server: getFileUploadUrl(),
      fieldName: 'files',
      customInsert(res, insertFn) {
        // res 即服务端的返回结果

        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(res.data[0]);
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
