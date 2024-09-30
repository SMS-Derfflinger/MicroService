<template>
  <div class="top">
    <Header/>
  </div>
  <button @click=print ></button>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Header from '../components/Header.vue';

const router = useRouter();
const route = useRoute();

const print= () => {
  console.log(route.query.id);
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

</style>
