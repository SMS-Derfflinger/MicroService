<script setup>
import Background from '../components/Background.vue'
</script>

<template>
  <div class="background">
    <Background />
  </div>
  <div class="search">
    <input class="input"
      v-model="input"
      placeholder="请输入车队名称"
      @focus="getInput"
      @blur="leaveInput"
      clearable
    ></input>
    <div class="list" v-show="isShow" @click="getInput">
      <ul class="hot-teams">
        <li
        v-for="item in filteredData"
        :key="item"
        @click="handleClick(item)"
        >
        {{ item }}
        </li>
      </ul>
    </div>
    <button @click="increment">查询</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      input: "",
      isShow: "",
      teamData: [],
      maxFleets: 5,
      clickedItem: "",
    };
  },
  methods: {
    increment() {
      this.count++
    },
    getInput() {
      this.isShow = true;
    },
    leaveInput() {
      this.isShow = false;
      console.log("blur");
    },
  },
  mounted() {
    this.increment()
  }
};
</script>

<style>
.background {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
}

.search {
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .input {
    border-radius: 5px;
    padding: 10px;
    outline: none;
    display: flex;
    font-size: 18px;
    width: 300px;
    height: 40px;
  }
  button {
    border: none;
    cursor: pointer;
    color: white;
    background-color: #dc112c;
    border-radius: 5px;
    font-size: 18px;
    min-width: 60px;
    min-height: 40px;
  }
  button:hover {
    background-color: #38043c;
  }
}

</style>
