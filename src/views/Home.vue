<template>
  <main class="container mx-auto px-8 lg:px-16 py-10">
    <div class="flex flex-col">
      <div v-for="(post, index) in paginatedPosts" :key="post.slug" class="bg-white py-4 transition-shadow duration-300 space-y-8">
        <h1 class="text-2xl">
          <router-link :to="{ name: 'posts', params: { slug: post.slug } }" class="font-sans hover:text-pink-400">
            {{ post.title }}
          </router-link>
        </h1>
        <p v-if="post.frontmatter?.cover"><img :src=" post.frontmatter?.cover " alt=""/></p>
        <p class="font-serif mt-2" v-html="post.description"></p>
        <p class="flex justify-start items-center">
          <div class="flex flex-wrap justify-start items-center">
            <span v-if="post.date" class='gg-heart text-pink-400 text-xs lg:text-sm'/>
            <span class="text-xs lg:text-sm text-gray-400 hover:text-pink-400 pl-2">
              {{ formattedDate(post.date) }}
            </span>
            <span v-if="post.tags && post.tags.length" class='gg-tag text-pink-400 text-xs lg:text-sm ml-4'/>
            <div class="flex flex-wrap text-xs lg:text-sm text-gray-400 hover:text-pink-400 ml-2 " v-for="tag in post.tags" :key="tag">
              <router-link :to="{ name: 'tag', params: { tag: tag } }">{{ tag }}</router-link>
            </div>
          </div>
        </p>
        <p class="mt-4">
          <hr v-if="!(index === paginatedPosts.length - 1 && currentPage === totalPages) || !(index === paginatedPosts.length - 1 && totalPages === 1)"/>
        </p>
      </div>
      <div class="flex text-sm justify-between pt-8" id="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="text-black hover:text-pink-400">
          {{ currentPage === 1 ? "&nbsp" : "返回上一页" }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-black hover:text-pink-400">
          {{ currentPage === totalPages ? " " : "阅读更多文章" }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {getPostMetadata, PostMetadata} from '../utils/posts'
import {useStore} from '../store'
import {formattedDate} from "../utils/date.ts";

const store = useStore()
const allPosts = ref<PostMetadata[]>([])
const recentPosts = ref<PostMetadata[]>([])
const currentPage = ref(1)
const postsPerPage = 3
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
    store.setPageIndex(currentPage.value)
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    store.setPageIndex(currentPage.value)
  }
}

watch(() => store.page, (newPage) => {
  currentPage.value = newPage;
})
</script>

<style scoped>
/* 可以在这里添加更多样式 */
</style>
