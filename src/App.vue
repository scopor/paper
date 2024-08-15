<template>
  <div class="flex flex-col justify-items-center items-center">
    <div class="flex flex-col sm:w-auto md:w-2/5 bg-white my-16">
      <div class="shadow-md mb-1">
        <NavBar></NavBar>
        <router-view/>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
}
</script>

<style>
/* 可以在这里添加全局样式 */
</style>
