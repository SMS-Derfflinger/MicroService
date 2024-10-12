<template>
  <h1>历史车手</h1>
  <el-table v-if="teamData.length" :data="teamData" header-align="center" highlight-current-row>
    <el-table-column
      prop="name"
      label="姓名"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date_birth"
      label="出生日期"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      prop="nationality"
      label="国籍"
      header-align="center"
      align="center">
    </el-table-column>
  </el-table>
  <div v-if="!teamData.length" style="text-align: center; margin-top: 20px;">
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

const teamData = ref([]);

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/constructors/" + route.query.id + "/drivers",
  };
  let total = 0;
  try {
    const response = await axios.request(option);
    total = response.data.MRData.total;
    if (total == 0) {
      return;
    }
    const array = response.data.MRData.DriverTable.Drivers;
    array.sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth));
    for (let i = 0; i < total; i++) {
      teamData.value.push({
        name: array[i].givenName + " " + array[i].familyName,
        date_birth: array[i].dateOfBirth,
        nationality: array[i].nationality,
      });
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
