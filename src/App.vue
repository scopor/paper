<template>
  <div class="flex flex-col justify-items-center items-center">
    <div class="flex flex-col lg:w-2/5 w-full bg-white lg:my-16">
      <div class="shadow-md mb-1">
        <NavBar></NavBar>
        <router-view/>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* 可以在这里添加全局样式 */
</style>
