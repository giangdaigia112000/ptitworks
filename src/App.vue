<template>
  <!-- <div>
    <router-link to="/dang-nhap">Đăng nhập</router-link>
    <router-link to="/dang-ky">Đăng ký</router-link>
    <router-link to="/">Trang chủ</router-link>
  </div> -->
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
//import LoginView from "./pages/LoginView.vue";
// import RegisterView from "./pages/RegisterView.vue";
export default {};
</script>
<style></style>
Header
