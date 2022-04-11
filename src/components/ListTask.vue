<template>
  <div class="listtask-container row">
    <div class="col-1"></div>
    <div class="listtask-nav col-2">
      <button class="" @click="showModaladdtask">
        <i class="bi bi-plus-circle-fill"></i><span>Tạo công việc mới</span>
      </button>
      <div class="listtask-nav-item" @click="clickItem(0)">
        <i class="bi bi-journals"></i> <span>Tát cả công việc</span>
      </div>
      <div class="listtask-nav-item" @click="clickItem(1)">
        <i class="bi bi-person-badge-fill"></i><span>Công việc của tôi</span>
      </div>
      <div class="listtask-nav-item" @click="clickItem(2)">
        <i class="bi bi-exclamation-circle-fill"></i
        ><span>Công việc chưa hoàn thành</span>
      </div>
      <div class="listtask-nav-item" @click="clickItem(3)">
        <i class="bi bi-calendar2-check-fill"></i
        ><span>Công việc đã hoàn thành</span>
      </div>
      <div class="listtask-nav-item-active" ref="itemactive"></div>
    </div>
    <div class="listtask-main col-8">
      <div class="project-info">
        <img :src="$store.state.project.avtProject" alt="" />
        <div class="bg-project">
          <h1>{{ $store.state.project.titleProject }}</h1>
        </div>
      </div>
      <h3 v-if="listTask.length < 1">Không có công việc nào !!!</h3>
      <div class="card-task" v-for="task in listTask" :key="task">
        <div class="card-task-head">
          <div class="card-task-head-icon">
            <i class="bi bi-briefcase"></i>
          </div>
          <div class="card-task-head-info">
            <h3>{{ task.data.titletask }}</h3>
            <span>Tạo ngày:{{ task.data.date }} lúc:{{ task.data.time }}</span>
          </div>
          <div class="card-task-head-status">
            <span class="card-task-head-status-icon">{{
              task.data.status
            }}</span>
          </div>
        </div>
        <div class="card-task-body">
          <p class="card-task-body-text">{{ task.data.description }}</p>
        </div>
        <div class="card-task-footer">
          <img :src="getPerfomer(task.data.performer).avt" alt="" />
          <span>{{ getPerfomer(task.data.performer).name }}</span>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
    <modal-task v-if="showmodal" @closeModal="closeModaladdtask" />
    <div class="loading-task" v-if="loadingTask">
      <div
        class="spinner-border text-primary"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>
<script>
import ModalTask from "./ModalAddtask.vue";
import axios from "axios";
export default {
  data() {
    return {
      showmodal: false,
      loadingTask: true,
      listTask: [],
      loadListtask: [],
      members: this.$store.state.project.members,
    };
  },
  mounted() {
    this.getTask();
  },
  components: { ModalTask },
  methods: {
    clickItem(i) {
      this.$refs.itemactive.style = `transform: translateY(${i * 70}px);`;
      if (i == 0) {
        this.listTask = this.loadListtask;
      } else if (i == 1) {
        this.listTask = this.loadListtask.filter(
          (task) => task.data.performer == this.$store.state.user.id
        );
      } else if (i == 2) {
        this.listTask = this.loadListtask.filter(
          (task) => task.data.status != 2
        );
      } else if (i == 3) {
        this.listTask = this.loadListtask.filter(
          (task) => task.data.status == 2
        );
      }
    },
    closeModaladdtask() {
      this.showmodal = false;
    },
    showModaladdtask() {
      this.showmodal = true;
    },
    getPerfomer(username) {
      const perfomer = this.members.filter(
        (member) => member.username == username
      );
      return {
        avt: perfomer[0].avt,
        name: perfomer[0].name,
      };
    },
    async getTask() {
      try {
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/project/task/take`, {
          idproject: this.$store.state.project.id,
        });
        this.loadListtask = res.data;
        this.listTask = this.loadListtask;
        console.log(this.listTask);
        this.loadingTask = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.listtask-container {
  height: calc(100vh - 135px);
  width: 100%;
  margin: 0;
  margin-top: 10px;
}
.loading-task {
  position: absolute;
  top: 50%;
  left: 50%;
}
.listtask-nav {
  height: 100%;
  margin: 0;
  padding: 0;
  padding-top: 130px;
  position: relative;
}
.listtask-nav-item {
  width: 90%;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px;
}
.listtask-nav i {
  font-size: 18px;
}
.listtask-nav button {
  border-radius: 30px;
  width: 70%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10%;
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  background-color: rgb(205, 205, 194);
}
.listtask-nav button:hover {
  background-color: #3a78e7;
}
.listtask-nav button:hover * {
  color: #fff;
}
.listtask-nav-item-active {
  position: absolute;
  width: 95%;
  height: 60px;
  top: 200px;
  border: 1px solid #65696f;
  border-right: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #0051ff30);
  transition: 0.5s ease-in-out;
}
.listtask-main {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
.project-info {
  width: 100%;
  height: 130px;
  position: relative;
  margin-bottom: 20px;
}
.listtask-main img {
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  margin-left: 50%;
}
.bg-project {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: linear-gradient(
    to left,
    rgba(10, 114, 218, 0),
    #3a78e7,
    #3a78e7
  );
  top: 0;
  backdrop-filter: blur(1px);
}
.bg-project h1 {
  text-transform: uppercase;
  color: aliceblue;
  position: absolute;
  top: 100%;
  transform: translateY(-150%) translateX(10%);
  font-weight: 500;
}

.card-task {
  width: 98%;
  margin: 1%;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.443) 0px 0px 0px 1px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}
.card-task-head {
  display: flex;
  margin-bottom: 10px;
}
.card-task-head-icon i {
  font-size: 20px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.card-task-head-icon {
  background-color: #3a78e7;
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 50%;
  margin-right: 10px;
}
.card-task-head-info {
  flex: auto;
}
.card-task-head-info h3 {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: 600px;
  height: 28px;
}
.card-task-head-info span {
  font-size: 12px;
}
.card-task-body p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 25px;
  margin: 0;
  -webkit-line-clamp: 3;
  height: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.card-task-body {
  margin-bottom: 10px;
}
.card-task-footer {
  display: flex;
  align-items: center;
}
.card-task-footer img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin: 0;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
