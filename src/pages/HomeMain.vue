<template>
  <div class="home-container">
    <div class="project-btn btn" @click="goProject">
      <i class="bi bi-projector"></i> <span>Dự án</span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goProject() {
      this.$router.push("/du-an");
    },
    goEform() {
      this.$router.push("/phieu-yeu-cau");
    },
  },
};
</script>
<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 100px;
  height: 100px;
  border: 1px solid #1111;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.btn:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.project-btn:hover * {
  color: rgb(181, 42, 42);
}
.eform-btn:hover * {
  color: burlywood;
}
.btn i {
  font-size: 30px;
}
</style>
