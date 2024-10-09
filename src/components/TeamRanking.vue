<template>
  <el-table :data="teamData" header-align="center" highlight-current-row>
    <el-table-column
      prop="rank"
      label="排位"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column 
      label="车队"
      header-align="center"
      align="center"
      width=400>
      <template v-slot="scope">
        <div style="display: flex; align-items: center;">
          <img :src="scope.row.imageUrl" alt="Image" style="width: 200px; height: 100px; margin-right: 10px;"/>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="nation"
      label="国籍"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="wins"
      label="胜场"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="points"
      label="得分"
      header-align="center"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const teamData = ref([]);
onMounted(async () => {
  const option0 = {
    url: "https://api.jolpi.ca/ergast/f1/2024/constructorstandings",
  };

  const option1 = {
    url: "https://v1.formula-1.api-sports.io/rankings/teams?season=2024",
    method: "GET",
	  headers: {
		  "x-rapidapi-host": "v1.formula-1.api-sports.io",
		  "x-rapidapi-key": "3560aa0b216bf9a4d7c5b1be7cb60365",
    },
  };

  let total = 0;
  try {
    const response0 = await axios.request(option0);
    const response1 = await axios.request(option1);
    total = response0.data.MRData.total;
    const array = response0.data.MRData.StandingsTable.StandingsLists[0];
    for (let i = 0; i < total; i++) {
      teamData.value.push({
        rank: array.ConstructorStandings[i].position,
        imageUrl: response1.data.response[i].team.logo,
        name: array.ConstructorStandings[i].Constructor.name,
        nation: array.ConstructorStandings[i].Constructor.nationality,
        wins: array.ConstructorStandings[i].wins,
        points: array.ConstructorStandings[i].points,
      });
    }
  } catch (error) {
    console.error(error);
  }
});
</script>