<template>
  <div class="header-main">
    <nav class="row">
      <div class="col-4">
        <div
          @click="backhome"
          class="gohome logo-home d-flex align-items-center"
        >
          <img src="../assets/logo.jpg" alt="logo-ptitworks" />
          <h5>PTITWORKS</h5>
        </div>
      </div>
      <div class="col-4 box-search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Tìm kiếm"
          aria-label="Search"
          v-model="$store.state.search"
        />
      </div>
      <div class="col-4">
        <div class="info-user d-flex align-items-center">
          <img class="out-avt" :src="$store.state.user.avt" alt="avata user" />
          <h6>{{ $store.state.user.name }}</h6>
          <i class="gg-chevron-down"></i>
          <div class="modal-profile">
            <div class="main-profile">
              <img class="in-avt" :src="$store.state.user.avt" alt="avt" />
              <h5>{{ $store.state.user.name }}</h5>
              <p>{{ $store.state.user.id }}</p>
              <div class="btn-frofile">
                <div class="go-profile" @click="profile">
                  <i class="gg-profile"></i>
                </div>
                <div class="go-logout" @click="logout">
                  <i class="gg-log-off"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "",
    };
  },

  name: "HeaderView",
  methods: {
    backhome() {
      this.$router.push("/");
    },
    profile() {
      this.$router.push({ name: "profile" });
    },
    logout() {
      localStorage.removeItem("token");
      this.$store.state.user = null;
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
.header-main {
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px;
  margin-bottom: 5px;
}
.header-main .row {
  height: 100%;
  color: #3a3838;
}
.gohome {
  cursor: pointer;
  width: 30%;
  margin-left: 5%;
}
.box-search {
  display: flex;
  padding: 8px;
}
.logo-home {
  height: 100%;
}
.logo-home img {
  height: 38px;
  width: 38px;
  border-radius: 50%;
  margin: 5px;
  object-fit: cover;
}
.info-user {
  height: 100%;
  float: right;
  margin-right: 10%;
  border-radius: 5%;
  box-shadow: rgba(211, 208, 208, 0.2) -2px 0px 2px 0px;
  cursor: pointer;
  position: relative;
}
.out-avt {
  height: 38px;
  width: 38px;
  border-radius: 50%;
  margin: 5px 10px 5px 10px;
  object-fit: cover;
}
.logo-home h5 {
  text-align: center;
  margin: 0;
}
.info-user h6 {
  text-align: center;
  margin: 0;
  margin-right: 5px;
}
.modal-profile {
  position: absolute;
  min-width: 200px;
  top: 100%;
  right: 0;
  border-radius: 5%;
  display: none;
  cursor: default;
  transform-origin: top;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 100;
}
.info-user:hover .modal-profile {
  animation: show-modal-frofile ease-in-out 0.3s;
  display: block;
}

.main-profile {
  width: 100%;
  height: 200px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.main-profile h5 {
  color: blue;
}
.in-avt {
  object-fit: cover;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px 0 8px 0;
}
@keyframes show-modal-frofile {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.btn-frofile {
  position: absolute;
  right: 10px;
  top: 30px;
}
.btn-frofile i {
  color: #625f5f;
  display: inline-block;
  transform: translateX(40%);
}
.btn-frofile .gg-profile {
  transform: scale(0.8) translateX(20%);
}
.btn-frofile div {
  height: 30px;
  width: 30px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30%;
  cursor: pointer;
}
.btn-frofile div:hover i {
  color: blue;
}
.go-profile {
  position: relative;
}
.go-logout {
  position: relative;
}
.go-profile:hover:before {
  content: "Hồ sơ cá nhân";
  position: absolute;
  right: 0;
  transform: translateX(-30px);
  width: 120px;
  height: 30px;
  text-align: center;
  background-color: #3b3838;
  color: aliceblue;
  cursor: default;
  padding-top: 3px;
  border-radius: 5%;
}
.go-logout:hover:before {
  content: "Đăng xuất";
  position: absolute;
  right: 0;
  transform: translateX(-30px);
  width: 120px;
  height: 30px;
  text-align: center;
  background-color: #3b3838;
  color: aliceblue;
  cursor: default;
  padding-top: 3px;
  border-radius: 5%;
}
</style>
