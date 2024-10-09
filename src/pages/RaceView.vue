<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <RaceList />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Header from '../components/Header.vue';
import RaceList from '../components/RaceList.vue';

export default {
  components: {
    Header,
    RaceList,
  },
}

</script>