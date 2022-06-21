<template>
  <base-card class="home" margin="ltr">
    <img class="img" src="@/assets/img/images/home_notice_banner.jpg" />
    <h2>this is home page {{ count }}, {{ doubleCount }}</h2>
    <el-button type="primary" @click="add">add</el-button>
    <el-icon :size="20">
      <edit />
    </el-icon>
  </base-card>
</template>
<style scoped lang="scss">
.img {
  width: 364px;
  height: 224px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
