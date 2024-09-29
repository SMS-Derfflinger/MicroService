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
      <ul class="teams" v-show="isShow">
        <li v-for="item in filteredData" :key="item" @mousedown="handleClick(item, $event)">
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
  console.log("input");
};

const leaveInput = () => {
  isShow.value = false;
  console.log("leave");
};

const handleClick = (item, event) => {
  event.stopPropagation();
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
  align-items: center;
  height: calc(100vh - 70px);
  width: 100vw;
}

.inputs {
  position: relative;
  top: 20%;
  width: 300px;
  height: 340px;
}

.input {
  margin: 0 auto;
  border-radius: 5px;
  padding: 10px;
  outline: none;
  font-size: 18px;
  width: 300px;
  height: 40px;
}

.teams {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.teams li {
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.teams li:hover {
  background-color: #e0e0e0;
}

</style>
