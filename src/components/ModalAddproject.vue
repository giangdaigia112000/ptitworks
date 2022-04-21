<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tạo mới dự án</h5>
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            x
          </button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            placeholder="Tên dự án..."
            class="input-nameproject"
            v-model="project.titleProject"
          />
          <div class="container-uploadimg">
            <label for="input-img" class="preview">
              <i class="gg-software-upload"></i>
              <span>Tải ảnh lên</span>
              <img
                :src="project.avtProject"
                alt="img-project"
                class="image-project"
                ref="imgproject"
              />
            </label>
            <input
              type="file"
              hidden
              id="input-img"
              @change="uploadimgproject"
            />
          </div>
        </div>
        <!--                       -->
        <div class="wrapper">
          <div class="title-member">
            <h5>Thành viên dự án</h5>
          </div>
          <div class="content-member">
            <ul class="list-member">
              <div class="getmember" v-if="showmember" @click="addToMembers">
                <img
                  v-if="getdatamember.name != ''"
                  class="memberavt"
                  :src="getdatamember.avt"
                  alt=""
                />
                <p>{{ getdatamember.name }}</p>
                <p>{{ getdatamember.message }}</p>
              </div>
              <div
                class="spinner-border text-primary"
                v-if="loadinguser"
                role="status"
              ></div>
              <li
                v-for="member in project.members"
                :key="member"
                @click="removeMember(member)"
              >
                <button type="button" class="btn btn-primary">
                  {{ member.username }} - {{ member.name }}
                  <span class="badge badge-light">x</span>
                </button>
              </li>
              <form class="form-floating" @submit.prevent="getMember">
                <input
                  class="form-control"
                  type="text"
                  spellcheck="false"
                  placeholder="Nhập vào username"
                  v-model="inputmember"
                />
                <label for="floatingTextarea2">Nhập vào username</label>
              </form>
            </ul>
          </div>
        </div>
        <!-- ...................... -->
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style="height: 100px"
            v-model="project.description"
          ></textarea>
          <label for="floatingTextarea2">Mô tả dự án</label>
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
            @click="creatProject"
            ref="btncreatproject"
          >
            <p v-if="!showloading" style="color: #fff; margin: 0; padding: 0">
              Tạo dự án mới
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
  data() {
    return {
      project: {
        titleProject: "",
        avtProject: "",
        description: "",
        creator: this.$store.state.user.id,
        members: [],
        date: "",
        time: "",
      },
      getdatamember: {
        name: "",
        avt: "",
        message: "",
      },
      showmember: false,
      inputmember: "",
      member: "",
      getmember: null,
      showloading: false,
      loadinguser: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closemodal");
    },
    async creatProject() {
      this.$refs.btncreatproject.disabled = true;
      this.showloading = true;
      if (
        this.project.members.length > 0 &&
        this.project.titleProject != "" &&
        this.project.description != ""
      ) {
        try {
          const url = this.$store.state.api;
          var d = new Date();
          this.project.date = `${d.getDate()}-${
            d.getMonth() + 1
          }-${d.getFullYear()}`;
          this.project.time = `${d.getHours()}:${d.getMinutes()}`;
          const res = await axios.post(`${url}/createproject`, this.project);
          this.$socket.emit("check-member-in-project", {
            namecreator: this.$store.state.user.name,
            project: this.project,
          });
          if (confirm(`${res.data.msg.message}`)) {
            this.$emit("closemodal");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        confirm("Vui lòng nhập đủ thông tin !!!");
      }
      this.$refs.btncreatproject.disabled = false;
      this.showloading = false;
      console.log(this.project.date);
    },
    async uploadimgproject(e) {
      const file = e.target.files[0];
      const storageRef = refstorage(dbstorage, "avt/" + file.name);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
      });
      await getDownloadURL(storageRef, file).then((url) => {
        this.project.avtProject = url;
        this.$refs.imgproject.style = "display : inline-block;";
      });
    },
    removeMember(member) {
      this.project.members = this.project.members.filter(
        (item) => item !== member
      );
    },
    async getMember() {
      this.loadinguser = true;
      this.getdatamember.name = "";
      this.getdatamember.avt = "";
      this.getdatamember.message = "";
      this.member = this.inputmember;
      this.inputmember = "";
      if (this.member.length > 9) {
        if (
          !this.project.members.filter(
            (member) => member.username == this.member
          ).length > 0 &&
          this.member != this.$store.state.user.id
        ) {
          try {
            const url = this.$store.state.api;
            const res = await axios.post(`${url}/finduser`, {
              username: this.member,
            });
            if (res.data.name) {
              this.getdatamember.name = res.data.name;
              this.getdatamember.avt = res.data.avt;
              console.log(this.member);
              this.getmember = {
                username: this.member,
                name: res.data.name,
                avt: res.data.avt,
              };
              this.loadinguser = false;
            } else {
              this.loadinguser = false;
              this.getdatamember.message = res.data.msg.message;
            }

            this.showmember = true;
            console.log(this.getmember);
          } catch (error) {
            console.log(error);
          }
        } else {
          this.loadinguser = false;
          this.showmember = true;
          this.getdatamember.message =
            "tài khoản đã được thêm hoặc chính là bạn";
          this.inputmember = "";
        }
      }
    },
    addToMembers() {
      if (this.getdatamember.name != "") {
        this.project.members.push(this.getmember);
        this.member = "";
        this.getmember = null;
      }
      this.showmember = false;
    },
  },
};
</script>
<style scoped>
.modal {
  background-color: #504e4e65;
  display: block;
  backdrop-filter: blur(2px);
}
.modal-dialog {
  max-width: 800px;
}
.modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.input-nameproject {
  border: none;
  outline: none;
  font-size: 25px;
  width: 100%;
  padding: 20px;
}
.container-uploadimg {
  width: 600px;
  height: 200px;
}
.preview {
  border: 1px dashed rgb(134, 134, 134);
  width: 100%;
  height: 100%;
  font-size: 22px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.form-floating {
  margin: 0px 20px;
}
.wrapper {
  margin: 0px 20px;
}
.list-member {
  width: calc(100%);
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid rgb(197, 197, 197);
  position: relative;
}
.getmember {
  position: absolute;
  z-index: 100;
  background-color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
  min-width: 200px;
  left: 50%;
  top: 0%;
  transform: translateX(-50%) translateY(-105%);
  border-radius: 10px;
}
.getmember img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
.getmember p {
  color: aliceblue;
  margin: 0;
}
.image-project {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  display: none;
}
.list-member li {
  cursor: pointer;
  margin: 3px;
}
.content-member ul input {
  flex: 1;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 14px;
}
</style>
