<template>
  <header class="container bg-white text-black mx-auto px-8 lg:px-16 pt-20">
    <nav class="flex justify-between mb-10">
      <h1 class="text-3xl font-bold hover:text-pink-400"><router-link to="/" @click="goHome">微山<br>澜水</router-link></h1>
      <ul class="flex space-x-4 md:space-x-8 mt-6">
        <li class="hover:text-pink-400"><router-link to="/" @click="goHome">首页</router-link></li>
        <li class="hover:text-pink-400"><router-link to="/archive" @click="goArchive">归档</router-link></li>
        <li class="hover:text-pink-400"><router-link to="/tag">标签</router-link></li>
        <li class="hover:text-pink-400"><router-link to="/about">关于</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {useStore} from '../store'
import {useRouter} from 'vue-router'

const store = useStore()
const router = useRouter()

const goHome = () => {
  store.setPageIndex(1)
  router.push('/')
}

const goArchive = () => {
  store.setArchivePageIndex(0)
  router.push('/archive')
}
</script>

<style scoped>
/* 可以在这里添加更多样式 */
</style>
