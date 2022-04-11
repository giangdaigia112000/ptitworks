<template>
  <div class="modal-task-container">
    <div class="modal-main">
      <div class="modal-head">
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="closeModal"
        >
          x
        </button>
      </div>
      <div class="modal-content">
        <div class="form-group">
          <label for="inputEmail4">Tên công việc</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail4"
            v-model="titletask"
          />
        </div>
        <div class="form-group">
          <label for="inputEmail4">Hình ảnh mô tả</label>
          <div class="imgtask-container">
            <div
              class="list-imgtask"
              v-for="imgtask in listImgTask"
              :key="imgtask"
            >
              <i
                class="bi bi-x-octagon-fill"
                @click="deleteImgtask(imgtask)"
              ></i>
              <img :src="imgtask" alt="" class="img-loaded" />
            </div>
            <div class="input-imgtask" @click="clickuploadfile">
              <i class="bi bi-camera-fill"></i>
              <input
                type="file"
                hidden
                ref="inputimgtask"
                @change="uploadImgtask"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Mô tả công việc</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="inputState">Người thực hiện</label>
          <select id="inputState" class="form-control" v-model="performer">
            <option
              v-for="member in $store.state.project.members"
              :key="member"
              :value="member.username"
            >
              {{ member.name }} - {{ member.username }}
            </option>
          </select>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <label for="inputEmail4">Ngày hạn kết thúc</label>
            <input
              type="date"
              class="form-control"
              id="inputEmail4"
              v-model="deadlineDate"
            />
          </div>
          <div class="form-group col-6">
            <label for="inputEmail4">Thời gian</label>
            <input
              type="time"
              class="form-control"
              id="inputEmail4"
              v-model="deadlineTime"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="closeModal"
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="creatTask"
              ref="btncreatproject"
            >
              <p v-if="!showloading" style="color: #fff; margin: 0; padding: 0">
                Tạo công việc mới
              </p>
              <span
                class="spinner-grow spinner-grow-sm text-light"
                role="status"
                aria-hidden="true"
                v-if="showloading"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  dbstorage,
  refstorage,
  uploadBytes,
  getDownloadURL,
} from "../configs/firebase";
import axios from "axios";
export default {
  watch: {
    deadlineDate() {
      var d = new Date();
      var nowdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      if (this.deadlineDate == "") return;
      if (new Date(this.deadlineDate) < new Date(nowdate)) {
        confirm("Không chọn ngày trong quá khứ");
        this.deadlineDate = "";
      }
    },
    deadlineTime() {
      var d = new Date();
      var nowtime = `${d.getHours()}:${d.getMinutes()}`;
      if (this.deadlineTime == "") return;
      if (this.deadlineDate != "" && this.deadlineDate != null) {
        if (
          new Date(`${this.deadlineDate} ${this.deadlineTime}`) <
          new Date(`${this.deadlineDate} ${nowtime}`)
        ) {
          this.deadlineTime = "";
          confirm("Không chọn thời gian trong quá khứ");
        }
      } else {
        confirm("Vui lòng chọn ngày trước khi chọn thời gian");
        this.deadlineTime = "";
      }
    },
  },
  data() {
    return {
      idproject: this.$store.state.project.id,
      status: 0,
      date: "",
      time: "",
      titletask: "",
      description: "",
      listImgTask: [],
      performer: null,
      deadlineTime: null,
      deadlineDate: null,
      showloading: false,
    };
  },
  methods: {
    clickuploadfile() {
      this.$refs.inputimgtask.click();
    },
    async uploadImgtask(e) {
      const file = e.target.files[0];
      const storageRef = refstorage(dbstorage, "task/" + file.name);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
      });
      await getDownloadURL(storageRef, file).then((url) => {
        this.listImgTask.push(url);
      });
    },
    deleteImgtask(imgtask) {
      this.listImgTask = this.listImgTask.filter((item) => item !== imgtask);
    },
    closeModal() {
      this.$emit("closeModal");
    },
    async creatTask() {
      try {
        this.showloading = true;
        if (
          this.titletask.length < 3 ||
          this.description.length < 3 ||
          this.deadlineTime == null ||
          this.deadlineDate == null ||
          this.performer == null
        ) {
          confirm("Vui lòng điền đầy đủ thông tin");
          this.showloading = false;
          return;
        }
        const url = this.$store.state.api;
        var d = new Date();
        this.date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        this.time = `${d.getHours()}:${d.getMinutes()}`;
        const res = await axios.post(`${url}/createtask`, {
          idproject: this.idproject,
          titletask: this.titletask,
          status: this.status,
          date: this.date,
          time: this.time,
          description: this.description,
          image: this.listImgTask,
          performer: this.performer,
          deadlinedate: this.deadlineDate,
          dealinetime: this.deadlineTime,
        });
        if (res.data) {
          console.log(res.data);
          confirm("Tạo công việc mới thành công");
          this.closeModal();
        }
      } catch (error) {
        console.log(error);
      }
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
  background-color: #8d9aa63a;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-main {
  width: 500px;
  padding: 10px;
  height: auto;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 10px;
}
.modal-head {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}
.form-group {
  padding: 5px;
}
.form-group textarea {
  max-height: 150px;
}
.modal-main .row {
  margin: 0;
}
.input-imgtask {
  width: 100px;
  height: 100px;
  background-color: rgb(165, 165, 163);
  position: relative;
  cursor: pointer;
}
.input-imgtask i {
  position: absolute;
  font-size: 30px;
  color: rgb(108, 107, 107);
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.imgtask-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  height: auto;
}
.img-loaded {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.list-imgtask {
  width: 100px;
  height: 100px;
  position: relative;
  margin-right: 5px;
}
.list-imgtask i {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 2px;
  cursor: pointer;
}
</style>
