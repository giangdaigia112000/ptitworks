<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
//import LoginView from "./pages/LoginView.vue";
// import RegisterView from "./pages/RegisterView.vue";
export default {};
</script>
<style>
/* .slide-leave-active {
  transition: opacity 0.5s ease;
  opacity: 0.5;
  animation: slide-out 0.5s ease-in forwards;
}

.slide-leave {
  opacity: 1;
  transform: translate(0);
}
@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2%);
  }
} */
</style>
