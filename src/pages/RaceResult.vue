<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <RaceInfo />
      <CircuitInfo />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import RaceInfo from '../components/RaceInfo.vue';
import CircuitInfo from '@/components/CircuitInfo.vue';

export default {
  components: {
    Header,
    RaceInfo,
    CircuitInfo,
  },
}
</script>