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
  height: 86%;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
