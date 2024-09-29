<script setup>
import MainView from './pages/MainView.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="container">
    <div class="top">
      <Header />
    </div>
    <div class="search">
      <MainView/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.search {
  position: absolute;
  top: 70px;
  left: 0px;
  right: 0px;
}

.top {
  line-height: 1.5;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
}
</style>
