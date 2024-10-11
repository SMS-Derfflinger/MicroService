<template>
  <div class="race-introduction">
    <h1>比赛简介</h1>
    <div v-html="raceIntroduction"></div>
    <div v-html="moreIntroduction"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const raceIntroduction = ref('');
const raceName = ref('');
const moreIntroduction = ref('');

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/2024/" + route.query.id,
  };
  try {
    const response = await axios.request(option);
    const urlResult = response.data.MRData.RaceTable.Races[0] == null ? "" : response.data.MRData.RaceTable.Races[0].url;
    moreIntroduction.value = urlResult == null ? "" : "更多详细信息：" + '<a href=' + urlResult + ' target="_blank">' + urlResult + '</a>';
    raceName.value = getTitleFromUrl(urlResult);
  } catch (error) {
    console.error(error);
  }
  if (raceName.value === "") {
    raceIntroduction.value = '未找到详细信息';
    return;
  }

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${raceName.value}&prop=extracts&exintro&explaintext&origin=*&redirects=1`);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    raceIntroduction.value = page.extract || '未找到详细信息';
  } catch (error) {
    console.error(error);
  }
});

const getTitleFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1]; // 获取最后一部分
};
</script>
