<template>
  <h1>比赛结果</h1>
  <el-table v-if="raceData.length" :data="raceData" header-align="center" highlight-current-row>
    <el-table-column
      prop="position"
      label="排位"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column 
      label="车手" 
      header-align="center"
      align="center"
      width=200>
      <template v-slot="scope">
        <div style="display: flex; align-items: center;">
          <img :src="scope.row.imageUrl" alt="Image" style="width: 50px; height: 50px; margin-right: 10px;"/>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="driver_number"
      label="编号"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="team"
      label="所属车队"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="points"
      label="得分"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间"
      header-align="center"
      align="center">
    </el-table-column>
  </el-table>
  <div v-if="!raceData.length" style="text-align: center; margin-top: 20px;">
      <span>暂无数据</span>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import image from '../assets/F1.png';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const raceData = ref([]);

onMounted(async () => {
  const option0 = {
    url: "https://api.jolpi.ca/ergast/f1/2024/" + route.query.id + "/results",
  };

  let total = 0;
  try {
    const response0 = await axios.request(option0);
    total = response0.data.MRData.total;
    if (total == 0) {
      return;
    }
    const array = response0.data.MRData.RaceTable.Races[0].Results;
    for (let i = 0; i < 3; i++) {
      raceData.value.push({
        position: array[i].position,
        imageUrl: "",
        name: array[i].Driver.givenName + " " + array[i].Driver.familyName,
        driver_number: array[i].number,
        team: array[i].Constructor.name,
        points: array[i].points,
        time: array[i].Time.time,
      });
    }
  } catch (error) {
    console.error(error);
  }

  for (let i = 0; i < total; i++) {
    const options = {
      url: "https://api.openf1.org/v1/drivers?driver_number=" + raceData.value[i].driver_number,
    };
    let j = 0;
    try {
      const responses = await axios.request(options);
      let url = responses.data[0].headshot_url;
      for (; j < responses.data.length; j++) {
        if (url != null) {
          break;
        }
        url = responses.data[j].headshot_url;
      }
      if (url == null) {
        url = image;
      }
      raceData.value[i].imageUrl = url;
    } catch (error) {
      console.error(error);
    }
  }
});

</script>