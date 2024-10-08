<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/f1_logo.png" alt="Logo" />
    </div>
    <div class="slogans">
      <h1>F1 Formula</h1>
      <h2>2024赛季</h2>
    </div>
    <nav class="nav">
      <button @click="navigate('/')">主页</button>
      <button @click="navigate('/race')">比赛</button>
      <button @click="navigate('/ranking')">排行榜</button>
    </nav>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

const navigate = (page) => {
  console.log(`Navigating to ${page}`);
  router.push(page);
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: 70px;
  background-color: #dc112c;
  color: white;
}

h1 {
  margin-top: 20px;
  font-weight: 500;
  font-size: 1.5rem;
  position: relative;
  white-space: nowrap;
  top: -10px;
}

h2 {
  font-weight: 500;
  font-size: 1.0rem;
  position: relative;
  top: -10px;
}

.logo img {
  height: 40px;
}

.nav {
  display: flex;
}

button {
  border: none;
  cursor: pointer;
  color: white;
  background-color: #dc112c;
  font-size: 18px;
  width: 120px;
  height: 70px;
}

button:hover {
  background-color: #38043c;
}
</style>
