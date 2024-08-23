<template>
  <div class="container bg-white mx-auto px-8 lg:px-16 space-y-8">
    <div class="flex flex-col mt-24">
      <div v-for="(year, index) in currentYears" :key="year" class="space-y-4">
        <h1 class="text-2xl text-pink-400 ">{{ year }}</h1>
        <ul>
          <li v-for="post in groupedPosts[year]" :key="post.slug" class="flex justify-between my-4">
              <span>
                <router-link :to="{ name: 'posts', params: { slug: post.slug } }"
                             class="text-black hover:text-pink-400">
                  {{ post.title }}
                </router-link>
              </span>
            <span>{{ formattedDate(post.date) }}</span>
          </li>
        </ul>
        <hr :class="[ index === currentYears.length - 1 ? '' : 'pb-4' ]" v-if="index !== currentYears.length - 1 || endYearIndex < years.length || currentPage != 0"/>
      </div>
    </div>
    <div class="flex justify-between pb-6 -mr-1 -ml-1">
      <button class="hover:text-pink-400" @click="prevPage"><span v-if="currentPage != 0">上一页</span></button>
      <button class="hover:text-pink-400" @click="nextPage"><span v-if="endYearIndex < years.length">下一页</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {getPostMetadata, PostMetadata} from '../utils/posts.ts'; // 根据实际路径引入
import {useStore} from '../store'
import {formattedDate} from "../utils/date.ts";

const posts = getPostMetadata();
const currentPage = ref(0);
const postsPerPage = 2; // 每页显示的年份数量
const store = useStore();

// 按年份分组
const groupedPosts: Record<string, PostMetadata[]> = {};
posts.forEach(post => {
  const year = new Date(post.date).getFullYear();
  if (!groupedPosts[year]) {
    groupedPosts[year] = [];
  }
  groupedPosts[year].push(post);
});

// 获取年份并倒序排列
const years = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));

// 计算当前页的年份
const startYearIndex = computed(() => currentPage.value * postsPerPage);
const endYearIndex = computed(() => startYearIndex.value + postsPerPage);
const currentYears = computed(() => years.slice(startYearIndex.value, endYearIndex.value));

// 分页控制函数
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    store.setArchivePageIndex(currentPage.value)
  }
};

const nextPage = () => {
  if (endYearIndex.value < years.length) {
    currentPage.value++;
    store.setArchivePageIndex(currentPage.value)
  }
};

watch(() => store.archivePage, (newPage) => {
  currentPage.value = newPage;
})
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
