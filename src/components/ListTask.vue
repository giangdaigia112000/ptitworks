<template>
  <div class="listtask-container row">
    <div class="col-1"></div>
    <div class="listtask-nav col-2"></div>
    <div class="listtask-main col-8">
      <div class="project-info">
        <img :src="$store.state.project.avtProject" alt="" />
        <div class="bg-project">
          <h1>{{ $store.state.project.titleProject }}</h1>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.listtask-container {
  height: calc(100vh - 135px);
  width: 100%;
  margin: 0;
  margin-top: 10px;
}
.listtask-nav {
  height: 100%;
  margin: 0;
  padding: 0;
}
.listtask-main {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
.project-info {
  width: 100%;
  height: 200px;
  position: relative;
}
.listtask-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.bg-project {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: linear-gradient(
    to right,
    rgb(10, 114, 218),
    rgba(28, 128, 228, 0.835),
    rgba(252, 252, 252, 0)
  );
  top: 0;
  backdrop-filter: blur(1px);
}
.bg-project h1 {
  text-transform: uppercase;
  color: aliceblue;
  position: absolute;
  top: 100%;
  transform: translateY(-200%) translateX(10%);
  font-weight: 500;
}
</style>
