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
import Header from '../components/Header.vue';
import RaceList from '../components/RaceList.vue';

export default {
  components: {
    Header,
    RaceList,
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
  height: calc(100vh - 70px);
  width: 100vw;
  position: absolute;
  top: 70px;
  left: 0px;
  right: 0px;
}
</style>
