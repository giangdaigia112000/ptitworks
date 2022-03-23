<template>
  <div class="notfound-container">
    <img src="../assets/404.png" alt="" />
    <div class="btngohome">
      <button @click="gohome" class="btn btn-danger">Về trang chủ</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    gohome() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.notfound-container {
  height: 100vh;
  overflow: hidden;
  text-align: center;
}
.notfound-container img {
  width: 50%;
}
.btngohome {
  margin-top: 30px;
}
</style>
