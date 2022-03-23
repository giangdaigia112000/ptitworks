<template>
  <div class="header-main">
    <nav class="row">
      <div class="col-4">
        <div
          @click="backhome"
          class="gohome logo-home d-flex align-items-center"
        >
          <img src="../assets/logo.jpg" alt="logo-ptitworks" />
          <h4>PTITWORKS</h4>
        </div>
      </div>
      <div class="col-6">2</div>
      <div class="col-2">3</div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "HeaderView",
  methods: {
    backhome() {
      this.$router.push("/hello");
    },
  },
};
</script>
<style scoped>
.header-main {
  height: 8%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px;
}
.header-main .row {
  height: 100%;
}
.gohome {
  cursor: pointer;
  width: 30%;
  margin-left: 5%;
}
.logo-home {
  height: 100%;
}
.logo-home img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 5px;
}
.logo-home h4 {
  text-align: center;
  margin: 0;
}
</style>
