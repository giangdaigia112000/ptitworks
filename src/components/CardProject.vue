<template>
  <div class="card">
    <div class="container-img">
      <img :src="image" class="card-img-top" alt="..." />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ tile }}</h5>
      <p class="card-text">
        {{ mota }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["tile", "mota", "image"],
};
</script>
<style scoped>
.card {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 10px 10px -10px;
  border-radius: 5%;
}
.card:hover .card-img-top {
  transition: transform 0.4s ease-in-out;
  transform: scale(1.1);
}
.card:not(:hover) .card-img-top {
  transition: transform 0.4s ease-in-out;
  transform: scale(1);
}
.container-img {
  height: 150px;
  overflow: hidden;
}
.card-img-top {
  object-fit: cover;
  height: 100%;
}
.card-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 25px;
  -webkit-line-clamp: 2;
  height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
