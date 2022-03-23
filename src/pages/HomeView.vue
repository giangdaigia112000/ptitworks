<template>
  <div class="app-container">
    <Header />
    <Body-view />
    <Footer />
  </div>
</template>
<script>
import Header from "../layouts/Header.vue";
import BodyView from "../layouts/Body.vue";
import Footer from "../layouts/Footer.vue";
export default {
  components: { Header, BodyView, Footer },
};
</script>
<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
}
</style>
