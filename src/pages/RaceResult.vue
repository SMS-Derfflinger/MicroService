<template>
  <div class="containers">
    <div class="top">
      <Header />
    </div>
    <div class="body">
      <Race />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Race from '../components/RaceInfo.vue';

export default {
  components: {
    Header,
    Race,
  },
}
</script>