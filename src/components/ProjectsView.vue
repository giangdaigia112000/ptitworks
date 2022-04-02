<template>
  <div class="project-container row">
    <div class="nav-project col-1">
      <div class="add-project">
        <button
          type="button"
          class="btn btn-info btn-add-project"
          @click="addProject"
        >
          <i class="gg-math-plus"></i>
        </button>
      </div>
      <ul class="nav-list" ref="list">
        <li @click="clickitem(0)" class="nav-item active">
          <i class="gg-menu-grid-r"></i>
          <span> Tất cả dự án</span>
        </li>
        <li @click="clickitem(1)" class="nav-item">
          <i class="gg-menu-boxed"></i>
          <span>Dự án của tôi</span>
        </li>
        <li @click="clickitem(2)" class="nav-item">
          <i class="gg-collage"></i>
          <span>Dự án liên quan</span>
        </li>
        <li @click="clickitem(3)" class="nav-item">
          <i class="gg-align-bottom"></i>
          <span>Thống kê</span>
        </li>
      </ul>
    </div>
    <div class="cards col-11">
      <h3 style="margin: 15px 0px">Danh sách tất cả dự án</h3>
      <div class="list-card">
        <CardProject
          v-for="project in listProject"
          :key="project"
          :tile="project.data.titleProject"
          :mota="project.data.description"
          :image="project.data.avtProject"
          v-show="checkshow(project.data.titleProject)"
        />
      </div>
    </div>
  </div>
  <!-- Modal -->
  <ModalAddproject v-if="showModal" @closemodal="closeModal" />
  <!-- Loading -->
  <div class="loading-project" v-if="loadingProject">
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only"></span>
    </div>
  </div>
</template>
<script>
import CardProject from "./CardProject.vue";
import ModalAddproject from "./ModalAddproject.vue";
import axios from "axios";
export default {
  data() {
    return {
      loadingProject: true,
      showModal: false,
      projects: [],
      listProject: [],
    };
  },
  async created() {
    const url = this.$store.state.api;
    const res = await axios.post(`${url}/project/take`, {
      username: this.$store.state.user.id,
    });
    this.loadingProject = false;
    this.projects = res.data;
    this.listProject = this.projects;
  },
  components: { CardProject, ModalAddproject },
  methods: {
    checkshow(title) {
      if (this.$store.state.search == "") {
        return true;
      }
      return title.toLowerCase().includes(this.$store.state.search);
    },
    clickitem(item) {
      for (var i = 0; i < 4; i++) {
        this.$refs.list.children[i].classList.remove("active");
      }
      this.$refs.list.children[item].classList.add("active");
    },
    addProject() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
<style scoped>
.nav-project {
  padding: 0;
  margin: 0;
  position: relative;
  left: 20px;
}
.add-project {
  text-align: center;
}
.btn-add-project {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  margin-top: 10px;
  position: relative;
}
.btn-add-project:hover:before {
  content: "Tạo dự án mới";
  position: absolute;
  width: 120px;
  height: 30px;
  background-color: #3b3838;
  color: aliceblue;
  cursor: default;
  padding-top: 3px;
  border-radius: 5%;
  left: 0;
  top: 0;
  transform: translateX(55px);
}
.btn-add-project i {
  color: aliceblue;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.nav-list {
  list-style: none;
  padding: 0;
}
.nav-list li {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
  border-radius: 15px;
  cursor: pointer;
}
.active * {
  color: blue;
}
.nav-list li:hover {
  background-color: rgb(240, 240, 240);
}
.list-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
.cards {
  padding: 0 2%;
}
.loading-project {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
