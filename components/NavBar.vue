<template>
  <header class="bg-white text-black px-16 pt-20">
    <nav class="flex justify-between mb-10">
      <h1 class="text-3xl font-bold hover:text-pink-400"><router-link to="/">微山<br>澜水</router-link></h1>
      <ul class="flex sm:space-x-4 md:space-x-8 mt-6">
        <li class="hover:text-pink-400"><router-link to="/">首页</router-link></li>
        <li class="hover:text-pink-400"><router-link to="/archive">归档</router-link></li>
        <li class="hover:text-pink-400"><router-link to="/tag">标签</router-link></li>
        <li class="hover:text-pink-400"><router-link to="/about">关于</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'NavBar',
}
</script>

<style scoped>
/* 可以在这里添加更多样式 */
</style>
