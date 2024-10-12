<template>
  <div class="top">
    <Header/>
  </div>
  <div class="body">
    <QueryResult />
    <HistoryDriver />
    <CurrentDriver />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import QueryResult from '@/components/QueryResult.vue';
import HistoryDriver from '@/components/HistoryDriver.vue';
import CurrentDriver from '@/components/CurrentDriver.vue';
</script>

<style scoped>
.top {
  line-height: 1.5;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  position: absolute;
  top: 70px;
  left: 10vw;
}
</style>
