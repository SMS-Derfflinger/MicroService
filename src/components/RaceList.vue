<template>
  <el-table :data="raceData" header-align="center" highlight-current-row>
    <el-table-column
      prop="round"
      label="场次"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="时间"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="race"
      label="比赛"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="circuit"
      label="场地"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="location"
      label="地点"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      label="详情"
      header-align="center"
      align="center">
      <template #default="scope">
        <el-button @click="search(scope.row)" type="danger">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const raceData = ref([]);

const search = (item) => {
  // 跳转到结果页面
  console.log(item.round);
  router.push({ path: "/race-result", query:{ id:item.round } });
};

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/2024/races",
  };

  let total = 0;
  try {
    const response = await axios.request(option);
    total = response.data.MRData.total;
    const array = response.data.MRData.RaceTable.Races;
    for (let i = 0; i < total; i++) {
      raceData.value.push({
        round: array[i].round,
        url: array[i].url,
        date: caculateDate(array[i].date, array[i].time),
        race: array[i].raceName,
        circuit: array[i].Circuit.circuitName,
        location: array[i].Circuit.Location.locality + " " + array[i].Circuit.Location.country,
        status: isStatusCompleted(array[i].date, array[i].time) ? "已结束" : "即将到来",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

function caculateDate(date, time) {
  const [year, month, day] = date.split('-');
  const formattedDate = `${year}年${parseInt(month)}月${parseInt(day)}日 ${time}`;
  return formattedDate;
}

function isStatusCompleted(date, time) {
  const dateTimeStr = `${date}T${time}`;
  const targetDateTime = new Date(dateTimeStr);
  const currentDateTime = new Date();
  return currentDateTime > targetDateTime;
}
</script>

<style scoped>
.router-link {
  color: blue; /* 可自定义链接颜色 */
  text-decoration: underline; /* 可自定义下划线样式 */
}

.router-link:hover {
  color: darkblue; /* 悬停时颜色变化 */
}
</style>