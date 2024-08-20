<template>
  <main class="container mx-auto px-12 py-10">
    <div class="flex flex-col ">
      <div v-for="(post, index) in paginatedPosts" :key="post.slug"
           class="bg-white p-4 pb-8 transition-shadow duration-300 space-y-8">
        <h1 class="text-2xl font-semibold text-black font-sans">
          <router-link :to="{ name: 'posts', params: { slug: post.slug } }" class="text-black hover:text-pink-400">
            {{ post.title }}
          </router-link>
        </h1>
        <p class="font-serif mt-2">{{ post.description }}</p>
        <p class="flex space-x-4 items-center">
          <span v-if="post.date" class='gg-heart text-pink-400 text-sm ml-1 pb-2 -mr-2'/>
          <span class="text-sm text-gray-400 hover:text-pink-400">
            {{ !post.date ? "" : new Date(post.date).toLocaleString('zh', {hour12: false}).replaceAll('/', '-') }}
          </span>
          <span v-if="post.tags && post.tags.length" class='gg-tag text-pink-400 text-sm ml-1 -mr-2'/>
          <div class="flex-shrink text-sm text-gray-400 hover:text-pink-400" v-for="tag in post.tags" :key="tag">
            <router-link :to="{ name: 'tag', params: { tag: tag } }">{{ tag }}</router-link>
          </div>
        </p>
        <p class="mt-4">
          <hr v-if="totalPages != 1 && index == paginatedPosts.length - 1"/>
        </p>
      </div>
      <div class="flex text-sm justify-between p-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="text-black hover:text-pink-400">
          {{ currentPage === 1 ? "" : "返回上一页" }}
        </button>
        <span class="pl-4">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-black hover:text-pink-400">
          {{ currentPage === totalPages ? "" : "阅读更多文章" }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {getPostMetadata, PostMetadata} from '../utils/posts'

const allPosts = ref<PostMetadata[]>([])
const recentPosts = ref<PostMetadata[]>([])
const currentPage = ref(1)
const postsPerPage = 5
let totalPages = ref(0);

onMounted(() => {
  allPosts.value = getPostMetadata();
  totalPages = computed(() => Math.ceil(allPosts.value.length / postsPerPage));
  recentPosts.value = allPosts.value.slice(0, 5) // 获取最新的5篇文章
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return allPosts.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* 可以在这里添加更多样式 */
</style>
