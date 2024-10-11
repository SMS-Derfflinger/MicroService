<template>
  <h1>比赛信息</h1>
  <div class="container">
    <div class="race-info">
      <div v-html="raceTime"></div>
      <div v-html="raceLocation"></div>
      <div v-html="raceLaps"></div>
    </div>
    <img :src="imageUrl" alt="Image" style="width: 400px; height: 200px; margin-right: 10px;" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import image from '../assets/F1.png';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const raceTime = ref('时间：');
const raceLocation = ref('地点：');
const raceLaps = ref('圈数：');
const date = ref('');
const imageUrl = ref('');

onMounted(async () => {
  const option0 = {
    url: "https://api.jolpi.ca/ergast/f1/2024/" + route.query.id,
  };
  try {
    const response0 = await axios.request(option0);
    //const response1 = await axios.request(option1);
    const array = response0.data.MRData.RaceTable.Races[0];
    date.value = array.date;
    raceTime.value += array.date + ' ' + array.time;
    raceLocation.value += array.Circuit.Location.locality + ' ' + array.Circuit.Location.country;
  } catch (error) {
    console.error(error);
  }

  const option1 = {
    url: "https://v1.formula-1.api-sports.io/races?date=" + date.value + "&type=race",
    method: "GET",
    headers: {
      "x-rapidapi-host": "v1.formula-1.api-sports.io",
      "x-rapidapi-key": "3560aa0b216bf9a4d7c5b1be7cb60365",
    },
  };
  try {
    const response1 = await axios.request(option1);
    if (response1.data.response[0]) {
      raceLaps.value += response1.data.response[0].laps.total;
      imageUrl.value += response1.data.response[0].circuit.image;
    } else {
      raceLaps.value += '暂无';
      imageUrl.value = image;
    }
  } catch (error) {
    console.error(error);
  }

});
</script>

<style scoped>
.container {
  display: flex;
}
</style>