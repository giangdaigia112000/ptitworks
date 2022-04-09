<template>
  <div class="go-back">
    <button type="button" class="btn btn-link" @click="back">Quay lại</button>
  </div>
  <div class="nav-project">
    <div class="nav-item-project" @click="clickItem(0)">
      Danh sách công việc
    </div>
    <div class="nav-item-project" @click="clickItem(1)">Tin nhắn</div>
    <div class="nav-item-project" @click="clickItem(2)">Thống kê</div>
    <div class="line-active" ref="lineactive"></div>
  </div>
  <router-view v-slot="{ Component }" v-if="loadedProject">
    <transition name="scale-slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loadedProject: false,
    };
  },
  mounted() {
    this.getDataProject();
  },
  methods: {
    back() {
      this.$router.push({ name: "project" });
    },
    clickItem(i) {
      this.$refs.lineactive.style = `transform: translateX(${i * 100}%);`;
      if (i == 0) {
        this.$router.push({ name: "listtask" });
      } else if (i == 1) {
        this.$router.push({ name: "messenger" });
      } else if (i == 2) {
        this.$router.push({ name: "chart" });
      }
    },
    async getDataProject() {
      try {
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/findproject`, {
          id: this.$route.params.id,
        });
        if (res.data.id) {
          this.$store.state.project = res.data;
          console.log(this.$store.state.project);
          this.loadedProject = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.go-back {
  position: absolute;
  top: 50px;
}
.nav-project {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 450px;
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
}
.nav-item-project {
  height: 30px;
  text-align: center;
  width: 150px;
  cursor: pointer;
}
.line-active {
  position: absolute;
  width: 150px;
  height: 3px;
  background-color: blue;
  top: calc(100% - 3px);
  left: 0;
  transform: translateX(0%);
  transition: 0.85s ease-in-out;
}
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease-in-out;
}

.scale-slide-enter-from {
  left: -110%;
  opacity: 0;
}

.scale-slide-enter-to {
  left: 0%;
  opacity: 1;
}

.scale-slide-leave-from {
  transform: scale(1);
  opacity: 1;
}

.scale-slide-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
