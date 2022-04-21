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
        <div class="notification">
          <i class="bi bi-bell-fill" @click="showNoti"></i>
          <div class="count-noti" v-if="countNoti > 0">
            <span>{{ countNoti }}</span>
          </div>
          <div class="list-noti" v-if="showListNoti" ref="notibox">
            <ul>
              <h5 v-if="listNoti.length == 0">Không có thông báo nào !!!</h5>
              <!-- ....................... -->
              <li
                v-for="noti in listNoti"
                :key="noti"
                @click="isSeenNoti(noti)"
                :class="noti.val().seen == true ? 'd-flex' : 'd-flex userseen'"
              >
                <img :src="noti.val().image" alt="" />
                <div>
                  <p>
                    <span class="name-noti">{{ noti.val().namecreator }}</span>
                    {{ noti.val().message }}
                  </p>
                  <span class="time-noti">{{ noti.val().time }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-user d-flex align-items-center">
          <img class="out-avt" :src="$store.state.user.avt" alt="avata user" />
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
import { ref, dbchat, onValue, update } from "../configs/firebase";
export default {
  data() {
    return {
      user: "",
      showListNoti: false,
      countNoti: 0,
      listNoti: [],
    };
  },
  name: "HeaderView",
  mounted() {
    this.$socket.emit("Client-sent-username", {
      username: this.$store.state.user.id,
    });
    this.readNoti();
  },
  sockets: {},
  watch: {
    listNoti() {
      if (this.listNoti.length > 0) {
        this.countNoti = 0;
        this.listNoti.forEach((noti) => {
          if (noti.val().seen == false) {
            this.countNoti++;
          }
        });
      }
    },
  },
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
    showNoti() {
      this.showListNoti = !this.showListNoti;
    },
    readNoti() {
      const starCountRef = ref(
        dbchat,
        "notification/" + this.$store.state.user.id
      );
      onValue(starCountRef, (snapshot) => {
        this.listNoti = [];
        snapshot.forEach((element) => {
          this.listNoti.push(element);
        });
        this.listNoti.reverse();
      });
    },
    isSeenNoti(noti) {
      if (noti.val().seen == false) {
        update(
          ref(
            dbchat,
            "notification/" + this.$store.state.user.id + "/" + noti.key
          ),
          {
            seen: true,
          }
        );
      }
      if (noti.val().type == "project") {
        this.$router.push(`/`);
        setTimeout(() => {
          this.$router.push({ name: "project" });
        }, 100);
        this.$store.state.search = noti.val().titleProject.toLowerCase();
      }
      if (noti.val().type == "task") {
        this.$router.push(`/`);
        setTimeout(() => {
          this.$router.push(`/du-an-chi-tiet/${noti.val().idProject}`);
        }, 100);
        this.$store.state.search = noti.val().titleTask.toLowerCase();
      }
      this.showNoti();
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
  width: 50px;
  float: right;
  margin-right: 50px;
  border-radius: 5%;
  box-shadow: rgba(211, 208, 208, 0.2) -2px 0px 2px 0px;
  cursor: pointer;
  position: relative;
}
.out-avt {
  height: 38px;
  width: 38px;
  border-radius: 50%;
  margin: 5px;
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
.notification {
  width: calc(100% - 100px);
  height: 100%;
  margin: 0;
  display: inline-block;
  position: relative;
}
.notification i {
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: rgb(125, 125, 125);
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  margin-right: 10px;
}
.list-noti {
  position: absolute;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #fff;
  bottom: 0;
  transform: translateY(100%);
  border-radius: 10px;
  z-index: 50;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.list-noti ul {
  list-style: none;
  width: calc(100% -20px);
  padding: 0;
  margin: 10px;
}
.list-noti ul li {
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
}
.list-noti ul li:hover {
  background-color: #1111;
}
.userseen {
  background-color: rgba(152, 30, 30, 0.197);
}
.list-noti ul li img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.name-noti {
  font-weight: 600;
  font-size: 16px;
}
.list-noti ul li p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.notification i:hover {
  color: rgb(66, 66, 66);
}

.time-noti {
  color: blue;
  font-size: 10px;
}
.count-noti {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  text-align: center;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-100%);
}
.count-noti span {
  color: #fff;
  line-height: 20px;
  font-size: 11px;
  font-weight: bold;
}
</style>
