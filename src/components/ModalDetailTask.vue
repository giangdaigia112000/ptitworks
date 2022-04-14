<template>
  <div class="loading-task" v-if="!loaded">
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only"></span>
    </div>
  </div>
  <div class="modal-task-container" v-if="loaded">
    <div class="modal-main">
      <div class="modal-head">
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="closeDetailTask"
        >
          x
        </button>
        <button
          style="margin-left: 20px"
          type="button"
          class="btn btn-link"
          @click="reloadTask"
        >
          Tải lại
        </button>
      </div>
      <div class="modal-contents">
        <div class="modal-content-updatestatus">
          <button
            type="button"
            class="btn btn-success"
            v-if="checkStatus() == 1"
            @click="updataStatus(1)"
          >
            Hoàn tất
          </button>
          <button
            type="button"
            class="btn btn-warning"
            v-if="checkStatus() == 0"
            @click="extendTask"
          >
            Gia hạn
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-if="
              checkStatus() == 2 &&
              this.$store.state.user.id == this.$store.state.project.creator
            "
            @click="rejectTask()"
          >
            Từ chối
          </button>
          <button
            type="button"
            class="btn btn-info"
            v-if="
              checkStatus() == 2 &&
              this.$store.state.user.id == this.$store.state.project.creator
            "
            @click="updataStatus(2)"
          >
            Duyệt
          </button>
        </div>
        <div class="updatetime" v-if="showUpdatetime">
          <div class="form-group">
            <label for="inputEmail4">Ngày gia hạn</label>
            <input
              type="date"
              class="form-control"
              id="inputEmail4"
              v-model="updatedeadlineDate"
            />
          </div>
          <div class="form-group">
            <label for="inputEmail4">Thời gian</label>
            <input
              type="time"
              class="form-control"
              id="inputEmail4"
              v-model="updatedeadlineTime"
            />
          </div>
          <button class="btn btn-primary" @click="updateDeadline">
            Gia hạn công việc
          </button>
        </div>
        <div class="modal-content-main row">
          <div class="modal-content-main-info-left col-8">
            <h2 class="task-title">
              {{ task.titletask }}
            </h2>
            <span>Mô tả :</span>
            <p>{{ task.description }}</p>
            <span>Hình ảnh mô tả :</span>
            <div class="task-img" v-if="task.image.length > 0">
              <img
                :src="img"
                alt=""
                v-for="img in task.image"
                :key="img"
                @click="showImg(img)"
              />
            </div>
          </div>
          <div class="modal-content-main-info-right col-4">
            <div>
              <div class="modal-content-main-info-right-div">
                <span class="info-right-title">Trạng thái:</span>
                <span
                  class="card-task-head-status-0"
                  v-if="checkStatusinfo() == 1"
                  >Đang tiến hành</span
                >
                <span class="card-task-head-status-1" v-if="task.status == 1"
                  >Chờ quản lý xác nhận</span
                >
                <span class="card-task-head-status-2" v-if="task.status == 2"
                  >Đã hoàn thành</span
                >
                <span class="card-task-head-status-3" v-if="task.status == 3"
                  >Không hoàn thành</span
                >
                <span
                  class="card-task-head-status-3"
                  v-if="checkStatusinfo() == 0"
                  >Đã quá hạn</span
                >
              </div>
              <div class="modal-content-main-info-right-div">
                <span class="info-right-title">Hạn kết thúc:</span>
                <span>{{ task.deadlinedate }} lúc: {{ task.dealinetime }}</span>
              </div>
              <div class="modal-content-main-info-right-div">
                <span class="info-right-title">Phụ trách:</span>
                <span>
                  <img :src="perfomerinfo.avt" alt="" />
                  {{ perfomerinfo.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span>Bình luận</span>
        <div class="comment-main" v-for="comment in getcomment" :key="comment">
          <div>
            <img :src="comment.val().avt" alt="" />
            <div>
              <span>{{ comment.val().name }}</span>
              <p>{{ comment.val().comment }}</p>
            </div>
          </div>
          <span class="comment-time">{{ comment.val().time }}</span>
          <span
            class="remove-comment"
            v-if="comment.val().username == $store.state.user.id"
            @click="removeComment(comment)"
            >xóa</span
          >
        </div>
        <form @submit.prevent="submitComment">
          <div class="input-comment-main">
            <img :src="$store.state.user.avt" alt="" />
            <input
              class="input-send"
              type="text"
              placeholder="Viết bình luận"
              v-model="inputcomment"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="show-detail-img" v-if="showmodalImg" @click="hideImg">
      <img :src="detailImg" alt="" />
    </div>
  </div>
</template>
<script>
import { ref, push, dbchat, onValue, remove } from "../configs/firebase";
import axios from "axios";
export default {
  props: ["idtask", "perfomerinfo"],
  data() {
    return {
      showmodalImg: false,
      detailImg: "",
      inputcomment: "",
      getcomment: [],
      task: null,
      loaded: false,
      showUpdatetime: false,
      updatedeadlineTime: "",
      updatedeadlineDate: "",
    };
  },
  watch: {
    updatedeadlineDate() {
      var d = new Date();
      var nowdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      if (this.updatedeadlineDate == "") return;
      if (new Date(this.updatedeadlineDate) < new Date(nowdate)) {
        confirm("Không chọn ngày trong quá khứ");
        this.updatedeadlineDate = "";
      }
    },
    updatedeadlineTime() {
      var d = new Date();
      var nowtime = `${d.getHours()}:${d.getMinutes()}`;
      if (this.updatedeadlineTime == "") return;
      if (this.updatedeadlineDate != "" && this.updatedeadlineDate != null) {
        if (
          new Date(`${this.updatedeadlineDate} ${this.updatedeadlineTime}`) <
          new Date(`${this.updatedeadlineDate} ${nowtime}`)
        ) {
          this.updatedeadlineTime = "";
          confirm("Không chọn thời gian trong quá khứ");
        }
      } else {
        confirm("Vui lòng chọn ngày trước khi chọn thời gian");
        this.updatedeadlineTime = "";
      }
    },
  },
  mounted() {
    this.readComment();
    this.getTask();
  },
  methods: {
    checkStatus() {
      if (this.task.status == 0) {
        var d = new Date();
        var nowdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        var nowtime = `${d.getHours()}:${d.getMinutes()}`;
        if (
          new Date(`${this.task.deadlinedate} ${this.task.dealinetime}`) <=
          new Date(`${nowdate} ${nowtime}`)
        ) {
          if (this.$store.state.user.id == this.$store.state.project.creator) {
            return 0;
          }
        } else {
          if (this.$store.state.user.id == this.task.performer) {
            return 1;
          }
        }
      } else if (this.task.status == 1) {
        return 2;
      }
    },
    reloadTask() {
      this.getTask();
    },
    extendTask() {
      this.showUpdatetime = !this.showUpdatetime;
    },
    async updateDeadline() {
      try {
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/project/task/update/deadline`, {
          idtask: this.idtask,
          deadlinedate: this.updatedeadlineDate,
          deadlinetime: this.updatedeadlineTime,
        });
        if (res.data) {
          console.log(res.data);
          this.showUpdatetime = false;
        }
      } catch (error) {
        console.log(error);
      }
      this.updataStatus(0);
    },
    async getTask() {
      try {
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/findtask`, {
          idtask: this.idtask,
        });
        if (res.data) {
          console.log(res.data);
          this.task = res.data;
          this.loaded = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    rejectTask() {
      if (
        confirm("Bạn có muốn gia hạn công việc này. OKE để gia hạn!!!") == true
      ) {
        this.extendTask();
      } else {
        this.updataStatus(3);
        this.showUpdatetime = false;
      }
    },
    async updataStatus(i) {
      try {
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/project/task/update/status`, {
          idtask: this.task.id,
          status: i,
        });
        if (res.data) {
          console.log(res.data);
          confirm("Cập nhật trạng thái thành công");
          this.getTask();
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkStatusinfo() {
      if (this.task.status == 0) {
        var d = new Date();
        var nowdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        var nowtime = `${d.getHours()}:${d.getMinutes()}`;
        if (
          new Date(`${this.task.deadlinedate} ${this.task.dealinetime}`) <=
          new Date(`${nowdate} ${nowtime}`)
        ) {
          return 0;
        } else {
          return 1;
        }
      }
    },
    closeDetailTask() {
      this.$emit("closetaskdetail");
    },
    showImg(img) {
      this.detailImg = img;
      this.showmodalImg = true;
    },
    hideImg() {
      this.showmodalImg = false;
    },
    sendComment(comment) {
      var d = new Date();
      var now = `${d.getDate()}-${
        d.getMonth() + 1
      }-${d.getFullYear()} lúc ${d.getHours()}:${d.getMinutes()}`;
      push(ref(dbchat, "comment/" + this.idtask), {
        username: this.$store.state.user.id,
        name: this.$store.state.user.name,
        avt: this.$store.state.user.avt,
        time: now,
        comment: comment,
      });
    },
    submitComment() {
      if (this.inputcomment == "") return;
      this.sendComment(this.inputcomment);
      this.inputcomment = "";
    },
    readComment() {
      const starCountRef = ref(dbchat, "comment/" + this.idtask);
      onValue(starCountRef, (snapshot) => {
        this.getcomment = [];
        snapshot.forEach((element) => {
          this.getcomment.push(element);
        });
      });
    },
    removeComment(comment) {
      remove(ref(dbchat, "comment/" + this.idtask + "/" + comment.key));
    },
  },
};
</script>
<style scoped>
.modal-task-container {
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: #8d9aa684;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content-updatestatus {
  display: flex;
  justify-content: center;
}
.show-detail-img {
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: #35353584;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.show-detail-img img {
  max-height: 90%;
  min-height: 20%;
}
.modal-main {
  width: 1000px;
  padding: 10px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.modal-head {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
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
.modal-footer {
  width: 100%;
  display: inline-block;
}
.modal-footer span {
  font-weight: bold;
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
.modal-content-main-info-right-div span img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}
.modal-content-main-info-right-div {
  margin-bottom: 10px;
}
.info-right-title {
  display: inline-block;
  width: 100px;
  color: rgb(124, 124, 124);
}
.modal-content-main-info-right {
  padding: 0;
  padding-right: 10px;
}
.modal-content-main-info-right > div {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 10px 1px 1px 10px;
}
.task-title {
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: 100%;
  margin: 0;
  margin-bottom: 20px;
}
.modal-content-main-info-left span {
  font-weight: bold;
  display: inline-block;
  margin-bottom: 10px;
}
.modal-content-main-info-left p {
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: 100%;
  margin: 0;
  margin-bottom: 20px;
  text-align: justify;
}
.task-img {
  display: flex;
}
.task-img img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
  cursor: pointer;
}
.comment-main {
  width: 100%;
  position: relative;
}
.comment-main img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}
.comment-main div {
  display: flex;
}
.comment-main div > div {
  display: flex;
  flex-direction: column;
  background-color: #ededed;
  padding: 5px;
  border-radius: 10px;
}
.comment-main div > div p {
  margin: 0;
}
.comment-main > span {
  font-size: 11px;
  font-weight: normal;
  margin-right: 10px;
}
.comment-time {
  margin-left: 45px;
}
.remove-comment:hover {
  color: blue;
  cursor: pointer;
}
.input-comment-main {
  width: 100%;
}
.input-comment-main img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}
.input-send {
  height: 40px;
  border: 1px solid rgba(17, 17, 17, 0.536);
  width: 790px;
  border-radius: 10px;
  padding: 0 10px;
  padding-right: 40px;
}
.input-send:focus {
  outline: none;
}
.loading-task {
  position: absolute;
  top: 50%;
  left: 50%;
}
.updatetime {
  width: 30%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
