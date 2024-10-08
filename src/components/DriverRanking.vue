<template>
  <el-table :data="teamData" header-align="center" highlight-current-row>
    <el-table-column
      prop="rank"
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
      prop="nation"
      label="国籍"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
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
import image from '../assets/F1.png';
import axios from 'axios';

const teamData = ref([]);
onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/2024/driverstandings",
  };

  let total = 0;
  try {
    const response = await axios.request(option);
    total = response.data.MRData.total;
    const array = response.data.MRData.StandingsTable.StandingsLists[0];
    for (let i = 0; i < total; i++) {
      let driver_number = array.DriverStandings[i].Driver.permanentNumber;
      let birth = array.DriverStandings[i].Driver.dateOfBirth;
      if (array.DriverStandings[i].position == "1") {
        driver_number = "1";
      }
      teamData.value.push({
        rank: array.DriverStandings[i].position,
        imageUrl: "",
        name: array.DriverStandings[i].Driver.givenName + " " + array.DriverStandings[i].Driver.familyName,
        driver_number: driver_number,
        team: array.DriverStandings[i].Constructors[0].name,
        nation: array.DriverStandings[i].Driver.nationality,
        age: calculateAge(birth),
        wins: array.DriverStandings[i].wins,
        points: array.DriverStandings[i].points,
      });
    }
  } catch (error) {
    console.error(error);
  }

  for (let i = 0; i < total; i++) {
    const options = {
      url: "https://api.openf1.org/v1/drivers?driver_number=" + teamData.value[i].driver_number,
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
      teamData.value[i].imageUrl = url;
    } catch (error) {
      console.error(error);
    }
  }
});

function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
</script>
