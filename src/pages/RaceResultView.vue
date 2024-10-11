<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <RaceIntro />
      <CircuitInfo />
      <RaceInfo />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import RaceIntro from '../components/RaceIntro.vue';
import CircuitInfo from '@/components/CircuitInfo.vue';
import RaceInfo from '@/components/RaceInfo.vue';

export default {
  components: {
    Header,
    RaceIntro,
    CircuitInfo,
    RaceInfo,
  },
}
</script>