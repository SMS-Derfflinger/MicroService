<template>
  <div class="race-info">
    <h1>比赛简介</h1>
    <div v-html="raceInfo"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const raceInfo = ref('');
const raceName = ref('');

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/2024/" + route.query.id,
  };
  try {
    const response = await axios.request(option);
    const urlResult = response.data.MRData.RaceTable.Races[0] == null ? "" : response.data.MRData.RaceTable.Races[0].url;
    raceName.value = getTitleFromUrl(urlResult);
    //console.log(raceName.value);
  } catch (error) {
    console.error(error);
  }
  if (raceName.value === "") {
    raceInfo.value = '未找到详细信息';
    return;
  }

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=${raceName.value}&origin=*`);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    raceInfo.value = page.extract || '未找到详细信息';
    const titleIndex = raceInfo.value.indexOf('Background');
    if (titleIndex !== -1) {
      raceInfo.value = raceInfo.value.substring(0, titleIndex).trim();
    }
  } catch (error) {
    console.error(error);
  }
});

const getTitleFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1]; // 获取最后一部分
};
</script>
