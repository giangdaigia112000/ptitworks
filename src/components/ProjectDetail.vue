<template>
  <div>
    <button type="button" class="btn btn-link" @click="back">Quay lại</button>
  </div>
  <div>{{ $route.params.id }}</div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
