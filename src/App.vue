<template>
  <div class="container max-w-5xl bg-white min-h-screen shadow-md mx-auto" id="shadowApp">
    <div class="sticky top-0 z-50 bg-white">
      <NavBar></NavBar>
    </div>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
</style>
