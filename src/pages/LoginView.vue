<template>
  <div class="d-flex justify-content-center pw-container">
    <div class="left">
      <img src="../assets/login_banner.png" alt="" />
    </div>
    <div class="right">
      <div class="login-container">
        <div class="info">
          <i>Powered by Giang-Dũng-Cường team</i>
        </div>
        <div class="form-container">
          <div class="title">
            <h3>PTITWORKS - Đăng nhập</h3>
            <p>Xin chào, vui lòng nhập thông tin đăng nhập</p>
          </div>
          <div class="form">
            <form @submit.prevent="login">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Tên đăng nhập"
                  v-model="username"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Mật khẩu"
                  v-model="password"
                />
              </div>
              <i class="noti">{{ noti }}</i>
              <button type="submit" class="btn btn-danger" ref="btnlogin">
                <p
                  v-if="!showloading"
                  style="color: #fff; margin: 0; padding: 0"
                >
                  Đăng nhập
                </p>
                <span
                  class="spinner-grow spinner-grow-sm text-light"
                  role="status"
                  aria-hidden="true"
                  v-if="showloading"
                ></span>
              </button>
            </form>
          </div>
          <div class="register">
            Chưa có tài khoản Ptitwork?
            <router-link to="/dang-ky">Đăng ký ngay</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showloading: false,
      username: "",
      password: "",
      noti: "",
    };
  },

  // async beforeCreate() {
  //   const url = this.$store.state.api;
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const res = await axios.post(`${url}/checktoken`, {
  //       token: token,
  //     });
  //     this.$store.state.user = res.data.user;
  //     console.log(this.$store.state.user);
  //     //this.$store.state.islogin = true;
  //     this.$router.push("/");
  //   }
  // },
  methods: {
    login() {
      this.$refs.btnlogin.disabled = true;
      this.showloading = true;
      this.checkUser();
    },
    async checkUser() {
      try {
        if (this.username == "" || this.password == "") {
          this.$refs.btnlogin.disabled = true;
          return;
        }
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/login`, {
          username: this.username,
          password: this.password,
        });
        console.log(res.data);
        this.noti = res.data.msg.message;
        this.$refs.btnlogin.disabled = false;
        this.showloading = false;
        if (res.data.user) {
          this.$store.state.user = res.data.user;
          //this.$store.state.islogin = true;
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.pw-container {
  height: 100vh;
  background-color: aqua;
  overflow: hidden;
}
.left {
  width: 50%;
  height: 100%;
  background-color: #eaf0fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
img {
  width: 70%;
  margin: 0 auto;
}
.right {
  width: 50%;
  height: 100%;
  background-color: #ffffff;
}
.login-container {
  margin: 0 15% 0 15%;
}
.info {
  text-align: right;
  color: #a6aebb;
}
.title {
  margin-bottom: 30px;
  color: #212121;
}
.form-container {
  margin-right: 20%;
  text-align: center;
  margin-top: 15%;
}
.form {
  text-align: left;
}
.form button {
  padding: 10px;
  width: 100%;
  margin-top: 30px;
}
.form .form-group input {
  margin: 20px 0 20px 0;
  padding-top: 10px;
  padding-bottom: 10px;
}
.register {
  margin-top: 20px;
  color: #7d8590;
}
.noti {
  color: red;
}
@media only screen and (max-width: 900px) {
  .left {
    width: 30%;
  }
  .right {
    width: 70%;
  }
}
@media only screen and (max-width: 600px) {
  .left {
    display: none;
  }
  .right {
    width: 100%;
  }
}
</style>
