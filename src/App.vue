<template>
  <div class="container max-w-5xl max-xl:max-w-full bg-white min-h-screen mx-auto" id="shadowApp">
    <NavBar></NavBar>
    <router-view class="mt-16"/>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
</style>
