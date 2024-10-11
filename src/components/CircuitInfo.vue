<template>
  <div class="circuit-info">
    <h1>场地简介</h1>
    <div v-html="circuitInfo"></div>
    <div v-html="moreInfo"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, popScopeId } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const circuitInfo = ref('');
const circuitName = ref('');
const moreInfo = ref('');

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/2024/" + route.query.id,
  };
  try {
    const response = await axios.request(option);
    const urlResult = response.data.MRData.RaceTable.Races[0] == null ? "" : response.data.MRData.RaceTable.Races[0].Circuit.url;
    moreInfo.value = urlResult == null ? "" : "更多详细信息：" + '<a href=' + urlResult + ' target="_blank">' + urlResult + '</a>';
    circuitName.value = getTitleFromUrl(urlResult);
  } catch (error) {
    console.error(error);
  }
  if (circuitName.value === "") {
    circuitInfo.value = '未找到详细信息';
    return;
  }

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${circuitName.value}&prop=extracts&exintro&explaintext&origin=*&redirects=1`);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    circuitInfo.value = page.extract || '未找到详细信息';
  } catch (error) {
    console.error(error);
  }
});

const getTitleFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1].split('#')[0]; // 获取最后一部分
};
</script>
