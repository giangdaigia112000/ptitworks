<template>
  <div class="project-container row">
    <div class="nav-project col-1"></div>
    <div class="cards col-11">
      <h3 style="margin: 15px 0px">Danh sách tất cả dự án</h3>
      <div class="list-card">
        <CardProject
          v-for="project in projects"
          :key="project"
          :tile="project.tile"
          :mota="project.mota"
          :image="project.image"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CardProject from "./CardProject.vue";
export default {
  data() {
    return {
      projects: [
        {
          tile: "Lộ trình học Back-end",
          mota: "Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.",
          image:
            "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
        },
        {
          tile: "Siêu năng lực",
          mota: "Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.",
          image:
            "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg",
        },
      ],
    };
  },
  components: { CardProject },
};
</script>
<style scoped>
.nav-project {
  padding: 0;
  margin: 0;
}
.list-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2%;
  grid-row-gap: 30px;
}
.cards {
  padding: 0 2%;
}
</style>
