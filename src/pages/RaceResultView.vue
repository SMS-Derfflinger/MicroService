<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <RaceIntro />
      <CircuitInfo />
      <RaceInfo />
      <RaceResult />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import RaceIntro from '@/components/RaceIntro.vue';
import CircuitInfo from '@/components/CircuitInfo.vue';
import RaceInfo from '@/components/RaceInfo.vue';
import RaceResult from '@/components/RaceResult.vue';

export default {
  components: {
    Header,
    RaceIntro,
    CircuitInfo,
    RaceInfo,
    RaceResult,
  },
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
