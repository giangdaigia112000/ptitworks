<template>
  <div class="project-container row">
    <div class="nav-project col-2"></div>
    <div class="list-card col-10">
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
      <CardProject />
    </div>
  </div>
</template>
<script>
import CardProject from "./CardProject.vue";
export default {
  components: { CardProject },
};
</script>
<style scoped>
.list-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2%;
  grid-row-gap: 30px;
  margin-top: 20px;
}
</style>
