<template>
  <div class="card">
    <img :src="$store.state.user.avt" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </p>
    </div>
  </div>
</template>
<style scoped>
.card {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 10px 10px -10px;
}
.card-img-top {
  object-fit: cover;
  height: 150px;
}
.card-text {
  width: 100%;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 25px;
  -webkit-line-clamp: 2;
  height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
