<template>
  <div class="listtask-container row">
    <div class="col-1"></div>
    <div class="listtask-nav col-2">
      <button class="" @click="showModaladdtask" ref="btncraettask" disabled>
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
      <button
        style="margin-left: 20px"
        type="button"
        class="btn btn-link"
        @click="reloadTask"
      >
        Tải lại
      </button>
      <h3 v-if="listTask.length < 1">Không có công việc nào !!!</h3>

      <!-- --------------------------------- -->
      <div
        class="card-task"
        v-for="task in listTask"
        :key="task"
        v-show="checkshow(task.data.titletask)"
        @click="openModaltaskdetail(task.id, getPerfomer(task.data.performer))"
      >
        <div class="card-task-head">
          <div class="card-task-head-icon">
            <i class="bi bi-briefcase"></i>
          </div>
          <div class="card-task-head-info">
            <h3>{{ task.data.titletask }}</h3>
            <span>Tạo ngày:{{ task.data.date }} lúc: {{ task.data.time }}</span>
          </div>
          <div class="card-task-head-status">
            <span
              class="card-task-head-status-0"
              v-if="checkStatusinfo(task.data) == 1"
              >Đang tiến hành</span
            >
            <span class="card-task-head-status-1" v-if="task.data.status == 1"
              >Chờ quản lý xác nhận</span
            >
            <span class="card-task-head-status-2" v-if="task.data.status == 2"
              >Đã hoàn thành</span
            >
            <span class="card-task-head-status-3" v-if="task.data.status == 3"
              >Không hoàn thành</span
            >
            <span
              class="card-task-head-status-3"
              v-if="checkStatusinfo(task.data) == 0"
              >Đã quá hạn</span
            >
          </div>
        </div>
        <div class="card-task-body">
          <p class="card-task-body-text">{{ task.data.description }}</p>
        </div>
        <div class="card-task-footer">
          <span>Phụ trách: </span>
          <img :src="getPerfomer(task.data.performer).avt" alt="" />
          <span>{{ getPerfomer(task.data.performer).name }}</span>
        </div>
      </div>
    </div>
    <div class="col-1"></div>

    <!-- ..................................... -->
    <modal-task v-if="showmodal" @closeModal="closeModaladdtask" />
    <modal-detail-task
      v-if="showtaskdetail"
      @closetaskdetail="closeModaltaskdetail"
      :idtask="taskdetail"
      :perfomerinfo="perfomerinfo"
    />

    <!-- ............................. -->
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
import ModalDetailTask from "./ModalDetailTask.vue";
import axios from "axios";
export default {
  data() {
    return {
      showmodal: false,
      showtaskdetail: false,
      taskdetail: null,
      perfomerinfo: null,
      loadingTask: true,
      listTask: [],
      loadListtask: [],
      members: this.$store.state.project.members,
    };
  },
  mounted() {
    if (this.$store.state.project.creator == this.$store.state.user.id) {
      this.$refs.btncraettask.disabled = false;
    }
    this.getTask();
  },
  components: { ModalTask, ModalDetailTask },
  methods: {
    checkshow(title) {
      if (this.$store.state.search == "") {
        return true;
      }
      return title.toLowerCase().includes(this.$store.state.search);
    },
    reloadTask() {
      this.loadingTask = true;
      this.getTask();
      this.clickItem(0);
    },
    checkStatusinfo(status) {
      if (status.status == 0) {
        var d = new Date();
        var nowdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        var nowtime = `${d.getHours()}:${d.getMinutes()}`;
        if (
          new Date(`${status.deadlinedate} ${status.dealinetime}`) <=
          new Date(`${nowdate} ${nowtime}`)
        ) {
          return 0;
        } else {
          return 1;
        }
      }
    },
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
          (task) =>
            task.data.status != 2 &&
            task.data.performer == this.$store.state.user.id
        );
      } else if (i == 3) {
        this.listTask = this.loadListtask.filter(
          (task) =>
            task.data.status == 2 &&
            task.data.performer == this.$store.state.user.id
        );
      }
    },
    closeModaladdtask() {
      this.showmodal = false;
    },
    showModaladdtask() {
      this.showmodal = true;
    },
    closeModaltaskdetail() {
      this.showtaskdetail = false;
    },
    openModaltaskdetail(task, getPerfomer) {
      this.taskdetail = task;
      this.perfomerinfo = getPerfomer;
      this.showtaskdetail = true;
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
.card-task-head-info span {
  color: #3a78e7;
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
  margin-left: 10px;
}
.card-task-head-status-0 {
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  padding: 3px 8px;
  background-color: rgb(255, 184, 0);
}
.card-task-head-status-1 {
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  padding: 3px 8px;
  background-color: rgb(0, 247, 255);
}
.card-task-head-status-2 {
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  padding: 3px 8px;
  background-color: rgb(43, 255, 0);
}
.card-task-head-status-3 {
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  padding: 3px 8px;
  background-color: rgb(255, 0, 0);
}
</style>
