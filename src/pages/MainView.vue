<template>
<div class="containers">
  <div class="top">
    <Header />
  </div>
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
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Header from '../components/Header.vue';

const router = useRouter();
const route = useRoute();

const input = ref("");
const isShow = ref(false);
const teamData = ref([]);
const teamId = ref([]);
const maxTeams = 10;
const clickedItem = ref("");

const search = (item) => {
  // 跳转到结果页面
  console.log(input.value);
  router.push({ path: "/result", query:{ id:item } });
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
  const index = teamData.value.indexOf(item);
  search(teamId.value[index]);
};

const filteredData = computed(() => {
  return teamData.value
    .filter((item) => item.includes(input.value))
    .slice(0, maxTeams);
});

onMounted(async () => {
  const option = {
    url: "https://api.jolpi.ca/ergast/f1/constructors",
  };

  let total = 0;
  let limit = 0;
  try {
    const response = await axios.request(option);
    total = response.data.MRData.total;
    limit = response.data.MRData.limit;
  } catch (error) {
    console.error(error);
  }

  for (let i = 0; i < total / limit; i++) {
    const options = {
      url: "https://api.jolpi.ca/ergast/f1/constructors?offset=" + i * limit,
    };
    try {
      const response = await axios.request(options);
      const constructors = response.data.MRData.ConstructorTable.Constructors;
      teamData.value.push(...constructors.map(item => item.name));
      teamId.value.push(...constructors.map(item => item.constructorId));
    } catch (error) {
      console.error(error);
    }
  }
});
</script>

<style scoped>
.top {
  line-height: 1.5;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
}

.container {
  background-image: url("../assets/background.avif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  height: calc(100vh - 70px);
  width: 100vw;
  position: absolute;
  top: 70px;
  left: 0px;
  right: 0px;
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
