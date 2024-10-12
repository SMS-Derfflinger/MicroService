<template>
  <div class="team-introduction">
    <h1>车队介绍</h1>
    <div v-html="teamIntroduction"></div>
    <div v-html="moreIntroduction"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const teamIntroduction = ref('');
const teamName = ref('');
const moreIntroduction = ref('');

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/constructors/" + route.query.id,
  };
  try {
    const response = await axios.request(option);
    if (response.data.MRData.total == "0") {
      return;
    }
    const urlResult = response.data.MRData.ConstructorTable.Constructors[0].url;
    moreIntroduction.value = urlResult == null ? "" : "更多详细信息：" + '<a href=' + urlResult + ' target="_blank">' + urlResult + '</a>';
    teamName.value = getTitleFromUrl(urlResult);
  } catch (error) {
    console.error(error);
  }
  if (teamName.value === "") {
    teamIntroduction.value = '未找到详细信息';
    return;
  }
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${teamName.value}&prop=extracts&exintro&origin=*&redirects=1`);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    teamIntroduction.value = page.extract || '未找到详细信息';
  } catch (error) {
    console.error(error);
  }
});

const getTitleFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1]; // 获取最后一部分
};
</script>
