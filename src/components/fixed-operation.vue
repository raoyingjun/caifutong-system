<template>
  <teleport to="body">
    <div class="justify-end g-operation g-fixed g-fixed-bottom" v-bind="$attrs">
      <slot />
    </div>
  </teleport>
</template>
<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
onMounted(() => {
  store.commit('setLayoutFooterVisible', true);
});
onBeforeUnmount(() => {
  store.commit('setLayoutFooterVisible', false);
});
</script>
