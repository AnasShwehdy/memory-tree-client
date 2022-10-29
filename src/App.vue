<script setup>
import { RouterView, RouterLink } from 'vue-router'

</script>

<template>
  <div class="app">
    <div style="display: flex;
    align-items: baseline;
    justify-content: space-evenly;
">
      <router-link to="/">Home</router-link>
      <router-link to="/history">History</router-link>
    </div>

    <div style="margin:80px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

body {
  background: #fff;
  color: #000;
}
</style>
