<template>
  <div class="container">
    <div class="inputs">
      <input class="input"
        v-model="input"
        placeholder="请输入车队名称"
        @focus="getInput"
        @blur="leaveInput"
        clearable
      ></input>
    </div>
    <div class="list" v-show="isShow" @click="getInput">
      <ul class="fleet">
        <li v-for="item in filteredData" :key="item" @click="handleClick(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const input = ref("");
const isShow = ref(false);
const teamData = ref([]);
const maxTeams = 20;
const clickedItem = ref("");

const search = () => {
  // 跳转到结果页面
  console.log(input.value);
};

const getInput = () => {
  isShow.value = true;
};

const leaveInput = () => {
  isShow.value = false;
  console.log("leave");
};

const handleClick = (item) => {
  clickedItem.value = item;
  input.value = item;
  console.log(input.value);
  search();
};

const filteredData = computed(() => {
  return teamData.value
    .filter((item) => item.includes(input.value))
    .slice(0, maxTeams);
});

onMounted(async () => {
  const options = {
    method: "GET",
    url: "https://api.jolpi.ca/ergast/f1/2024/constructors",
  };

  try {
    const response = await axios.request(options);
    const constructors = response.data.MRData.ConstructorTable.Constructors;
    teamData.value = constructors.map(item => item.name);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.container {
  background-image: url("../assets/background.avif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  width: 100vw;
  margin: 0 auto;
}

.input {
  margin: 0 auto;
  border-radius: 5px;
  padding: 10px;
  outline: none;
  font-size: 18px;
  width: 300px;
  height: 40px;
  display: flex;
}

.list {
    background-color: white;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 5px;
    box-sizing: border-box;
    padding-top: 20px;
  }
</style>
