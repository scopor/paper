<template>
  <main class="container mx-auto px-8 lg:px-16 space-y-8">
    <div class="flex flex-col">
      <div v-for="(post, index) in paginatedPosts" :key="post.slug" class="bg-white transition-shadow duration-300 space-y-8" @click="preview(post.slug)">
        <h1 class="text-2xl font-bold">
          <router-link :to="{ name: 'posts', params: { slug: post.slug } }" class="hover:text-pink-400">
            {{ post.title }}
          </router-link>
        </h1>
        <div v-if="post.frontmatter?.cover"><img :src=" post.frontmatter?.cover " alt=""/></div>
        <div class="pb-4" style="font-size: 18px; line-height: 2" v-html="post.description"></div>
        <div class="flex">
          <div class="flex flex-wrap justify-start items-center align-center">
            <span v-if="post.date" class='text-pink-400 text-xs'>
              <img src="/heart.png" alt=""/>
            </span>
            <span class="text-xs text-gray-400 hover:text-pink-400 pl-2">
              {{ formattedDate(post.date) }}
            </span>
            <span v-if="post.tags && post.tags.length" class='text-pink-400 text-xs ml-4 transform rotate-90'>
              <img src="/tag.png" alt=""/>
            </span>
            <div class="flex flex-wrap text-xs text-gray-400 hover:text-pink-400 ml-2" v-for="tag in post.tags" :key="tag">
              <router-link :to="{ name: 'tag', params: { tag: tag } }">{{ tag }}</router-link>
            </div>
          </div>
        </div>
        <div class="pb-8">
          <hr v-if="!(index === paginatedPosts.length - 1 && currentPage === totalPages) || !(index === paginatedPosts.length - 1 && totalPages === 1)"/>
        </div>
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
import router from "../router";

const store = useStore()
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

const preview = (slug: string) => {
  router.push(`/posts/${slug}`)
}


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
</style>
