<template>
  <base-confirm-dialog custom-class="choose-urgency-people-dialog" title="批量催办">
    <template v-for="(roleList, index) in rolePeopleList" :key="index">
      <el-checkbox
        v-model="roleList.selectAll"
        class="ml-12 mb-20"
        :indeterminate="roleList.isIndeterminate"
        @change="handleCheckAllChange(index)"
        >{{ roleList.role }}</el-checkbox
      >
      <el-checkbox-group v-model="roleList.selectedPeopleList" @change="(v) => handleCheckedChange(v, index)">
        <div v-for="(peoples, index) in roleList.peopleList" :key="index" class="justify-space-between mh-12 mb-20">
          <el-checkbox v-for="(people, index) in peoples" :key="index" :label="people" />
        </div>
      </el-checkbox-group>
    </template>
  </base-confirm-dialog>
</template>
<script setup>
/**
 * 该组件接受的 props 与 el-dialog 的 props 一致
 */
import { ref } from 'vue';

const roles = ['传阅人', '回复人'];
const rolePeopleList = ref(
  Array(2)
    .fill(null)
    .map((v, i) => ({
      selectAll: false,
      isIndeterminate: false,
      role: roles[i],
      peopleList: Array(4)
        .fill(null)
        .map((v, rowIndex) =>
          Array(4)
            .fill(null)
            .map((v, colIndex) => `vivianxu(许微微)_${rowIndex}_${colIndex}`),
        ),
      selectedPeopleList: [],
    })),
);
const handleCheckAllChange = (index) => {
  const rolePeople = rolePeopleList.value[index];
  rolePeople.isIndeterminate = false;
  rolePeople.selectedPeopleList = rolePeople.selectAll ? rolePeople.peopleList.flat() : [];
};

const handleCheckedChange = (value, index) => {
  const checkedCount = value.length;
  const rolePeople = rolePeopleList.value[index];
  rolePeople.selectAll = checkedCount === rolePeople.peopleList.flat().length;
  rolePeople.isIndeterminate = checkedCount > 0 && checkedCount < rolePeople.peopleList.flat().length;
};
</script>
<style lang="scss">
.choose-urgency-people-dialog {
  &.el-dialog {
    width: 881px;
  }
}
</style>
