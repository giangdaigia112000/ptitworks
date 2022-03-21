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
            <h3>PTITWORKS - Đăng ký tài khoản</h3>
            <p>Xin chào, vui lòng nhập thông tin đăng ký</p>
          </div>
          <div class="form">
            <form @submit.prevent="">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Số điện thoại"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Họ và tên"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Mật khẩu"
                />
              </div>
              <i class="noti">Tài khoản đã tồn tại !!!</i>
              <button type="submit" class="btn btn-primary">
                Tạo tài khoản
              </button>
            </form>
          </div>
          <div class="register">
            Đã có tài khoản Ptitwork?
            <router-link to="/dang-nhap">Đăng nhập ngay</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
