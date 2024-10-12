<template>
  <div class="top">
    <Header/>
  </div>
  <div class="body">
    <QueryResult />
    <DriverInTeam />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import QueryResult from '@/components/QueryResult.vue';
import DriverInTeam from '@/components/DriverInTeam.vue';
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
  width: 50vw;
  position: absolute;
  top: 70px;
  left: 25vw;
}
</style>
