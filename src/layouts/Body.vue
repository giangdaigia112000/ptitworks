<template>
  <div class="body-main">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "BodyView",
};
</script>
<style>
.body-main {
  height: calc(100vh - 85px);
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
