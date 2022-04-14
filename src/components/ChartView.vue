<template>
  <div class="chart-container">
    <div class="chart-main">
      <div class="table-listmember">
        <h3>Danh sách thành viên</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Tên</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(member, index) in $store.state.project.members"
              :key="index"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td><img :src="member.avt" /> {{ member.name }}</td>
              <td>{{ member.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="chart">
        <h3>Biểu đồ thống kê công việc</h3>
        <Doughnut :chart-data="chartData" :width="width" :height="height" />
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import axios from "axios";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
export default {
  name: "BarChart",
  components: { Doughnut },
  mounted() {
    this.getTask();
  },
  data() {
    return {
      width: {
        type: Number,
        default: 500,
      },
      height: {
        type: Number,
        default: 500,
      },
      chartData: {
        labels: [
          "Công việc chưa hoàn thành",
          "Đang chờ xác nhận hoàn thành",
          "Đã hoàn thành",
          "Không hoàn thành",
        ],
        datasets: [
          {
            backgroundColor: ["#ffb100", "#04d0d7", "#41B883", "#DD1B16"],
            data: [1, 2, 3, 4],
          },
        ],
      },
      loadListtask: [],
    };
  },
  methods: {
    async getTask() {
      try {
        const url = this.$store.state.api;
        const res = await axios.post(`${url}/project/task/take`, {
          idproject: this.$store.state.project.id,
        });
        this.loadListtask = res.data;
        console.log(this.loadListtask.length);
        var taskstatus0 = this.loadListtask.filter(
          (task) => task.data.status == 0
        ).length;
        var taskstatus1 = this.loadListtask.filter(
          (task) => task.data.status == 1
        ).length;
        var taskstatus2 = this.loadListtask.filter(
          (task) => task.data.status == 2
        ).length;
        var taskstatus3 = this.loadListtask.filter(
          (task) => task.data.status == 3
        ).length;
        this.chartData.datasets[0].data = [
          taskstatus0,
          taskstatus1,
          taskstatus2,
          taskstatus3,
        ];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.chart-container {
  height: calc(100vh - 145px);
  width: 100%;
  margin: 0;
  margin-top: 10px;
}
.chart-main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.chart {
  height: 350px;
  width: 30%;
}
.table-listmember {
  width: 40%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
td img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
