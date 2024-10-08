<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <DriverRanking />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Header from '../components/Header.vue';
import DriverRanking from '../components/DriverRanking.vue';

export default {
  components: {
    Header,
    DriverRanking,
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

.body{
  display: flex;
  justify-content: center;
  height: calc(100vh - 70px);
  width: 100vw;
  position: absolute;
  top: 70px;
  left: 0px;
  right: 0px;
}
</style>