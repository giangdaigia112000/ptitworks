<template>
  <div class="profile-container">
    <div class="profile-head">
      <nav class="row">
        <div class="col-4">
          <div
            @click="backhome"
            class="gohome logo-home d-flex align-items-center"
          >
            <img src="../assets/logo.jpg" alt="logo-ptitworks" />
            <h4>PTITWORKS</h4>
          </div>
        </div>
        <div class="col-4"></div>
        <div class="col-4"></div>
      </nav>
    </div>
    <div class="profile-main">
      <h1>Tài khoản của tôi</h1>
      <hr />
      <ul>
        <li class="active" @click="showinfo('info')" ref="detailinfo">
          Chi tiết tài khoản
        </li>
        <li @click="showinfo('pass')" ref="repassword">Đổi mật khẩu</li>
      </ul>
      <div class="info-main" v-if="show">
        <div class="avt">
          <img :src="newuser.avt" alt="avt" />
          <input
            type="file"
            name=""
            id=""
            v-show="false"
            ref="chosefile"
            @change="updateavt"
          />
          <button class="btn btn-outline-info" @click="chosefile">
            Đổi hình ảnh
          </button>
        </div>
        <div class="form-update">
          <form @submit.prevent="">
            <div class="form-group">
              <label for="Username">Tài khoản</label>
              <input
                type="text"
                class="form-control"
                v-model="newuser.username"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="name">Họ và tên</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="newuser.name"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="name">Email</label>
              <input
                type="email"
                class="form-control"
                id="name"
                v-model="newuser.email"
              />
            </div>
            <button type="submit" class="btn btn-primary">Đổi thông tin</button>
          </form>
        </div>
      </div>
      <div class="pass-main" v-if="!show">
        <form @submit.prevent="">
          <div class="form-group">
            <label for="Username">Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="newuser.password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Đổi mật khẩu</button>
        </form>
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
export default {
  data() {
    return {
      show: true,
      newuser: {
        username: "",
        password: "",
        name: "",
        avt: "",
        email: "",
      },
    };
  },
  created() {
    this.newuser.username = this.$store.state.user.username;
    this.newuser.password = this.$store.state.user.password;
    this.newuser.name = this.$store.state.user.name;
    this.newuser.avt = this.$store.state.user.avt;
    this.newuser.email = this.$store.state.user.email;
  },
  methods: {
    backhome() {
      this.$router.push({ path: "/" });
    },
    showinfo(key) {
      if (key == "info") {
        this.show = true;
        this.$refs.detailinfo.classList.add("active");
        this.$refs.repassword.classList.remove("active");
      } else if (key == "pass") {
        this.show = false;
        this.$refs.detailinfo.classList.remove("active");
        this.$refs.repassword.classList.add("active");
      }
    },
    chosefile() {
      this.$refs.chosefile.click();
    },
    async updateavt(e) {
      const file = e.target.files[0];
      const storageRef = refstorage(dbstorage, "avt/" + file.name);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
      });
      await getDownloadURL(storageRef, file).then((url) => {
        this.newuser.avt = url;
        console.log(url);
      });
    },
  },
};
</script>
<style scoped>
.profile-container {
  height: 100vh;
  overflow: hidden;
}
.profile-head {
  width: 100%;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px;
}
.profile-head row {
  width: 100%;
  height: 100%;
}
.logo-home {
  height: 100%;
}
.gohome {
  cursor: pointer;
  width: 30%;
  margin-left: 5%;
}
.logo-home img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 5px;
}
.logo-home h4 {
  text-align: center;
  margin: 0;
}
.profile-main {
  width: 50%;
  height: 100%;
  margin: 0 auto;
}
.profile-main hr {
  margin: 0;
}
.profile-main h1 {
  margin-top: 10px;
}
.profile-main ul {
  display: flex;
  list-style: none;
  margin: 5px 0;
}
.profile-main ul li {
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
}
.profile-main ul .active {
  border-bottom: 2px solid rgb(27, 27, 27);
}
.info-main {
  width: 100%;
}
.avt {
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.avt img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}
.form-update {
  width: 70%;
  margin: 0 auto;
}
.form-group input {
  margin-bottom: 10px;
}
.pass-main {
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
