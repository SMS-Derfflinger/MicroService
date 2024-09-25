<script setup>
import MainView from './pages/MainView.vue'
import Header from './components/Header.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/F1.png" width="125" height="125" /> -->
    <div class="top">
      <Header />
    </div>
  </header>
  <body>
    <div class="search">
      <MainView/>
    </div>
  </body>

</template>

<style scoped>
body {
  display: flex;
  height: 100%;
  width: 100%;
}

header {
  line-height: 1.5;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
