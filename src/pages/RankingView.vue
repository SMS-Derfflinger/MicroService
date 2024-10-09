<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <div class="buttons">
        <button class="my-button" @click="currentComponent = 'DriverRanking'">车手排名</button>
        <button class="my-button" @click="currentComponent = 'TeamRanking'">车队排名</button>
      </div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Header from '../components/Header.vue';
import DriverRanking from '../components/DriverRanking.vue';
import TeamRanking from '../components/TeamRanking.vue';

export default {
  components: {
    Header,
    DriverRanking,
    TeamRanking,
  },
  data() {
    return {
      currentComponent: 'DriverRanking'
    };
  }
}
</script>

<style scoped>
.top {
  line-height: 1.5;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 70px);
  width: 100vw;
  position: absolute;
  top: 70px;
  left: 0px;
  right: 0px;
}

.my-button {
  background-color: #eaeff1;
  color: rgb(35, 32, 32);
  padding: 10px 20px;
  border: 2px solid #7d7e7f;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.my-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.my-button:hover {
  border-color: #003d80;
}

.my-button:active,
.my-button:focus {
  background-color: #478fee;
  color: rgb(255, 255, 255);
  outline: none;
}
</style>