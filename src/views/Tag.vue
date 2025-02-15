<template>
  <div class="container bg-white mx-auto px-8 lg:px-16 space-y-8">
    <div class="flex flex-wrap justify-content-start">
      <div
          v-for="tag in tags"
          :key="tag.name"
          :class="['cursor-pointer text-black flex items-start border border-gray-50 px-4 mb-2 mr-4 bg-gray-50', currentTag === tag.name ? 'font-bold text-pink-400' : '']"
          @click="selectTag(tag.name)">
        <span class="py-0.5">{{ tag.name }}</span>
        <span class="py-0 text-xs">{{ tag.count }}</span>
      </div>
    </div>
    <hr/>
    <div class="mt-8">
      <div v-if="filteredPosts.length" >
        <ul class="my-8 space-y-4">
          <li v-for="post in filteredPosts" :key="post.slug" class="flex justify-between">
            <span class="hover:text-pink-400"><router-link :to="{ name: 'posts', params: { slug: post.slug } }">{{ post.title }}</router-link></span>
            <span class="text-gray-400 hidden md:flex">{{ formattedDate(post.date) }}</span>
          </li>
        </ul>
      </div>
      <div v-else class="pb-8">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {getPostMetadata} from '../utils/posts'
import {useRoute} from 'vue-router';
import {formattedDate} from "../utils/date.ts"; // 导入 useRoute

const posts = getPostMetadata(); // 获取所有博文元数据
const tags = ref([] as { name: string; count: number; }[]); // 存储标签及其数量
const currentTag = ref(''); // 当前选中的标签

// 计算过滤后的博文列表
const filteredPosts = computed(() => {
  if (!currentTag.value) return [];
  return posts.filter(post => post.tags.includes(currentTag.value));
});

// 初始化标签和数量
const initializeTags = () => {
  const tagMap = new Map();

  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, 0);
      }
      tagMap.set(tag, tagMap.get(tag) + 1);
    });
  });

  tags.value = Array.from(tagMap, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // 按数量降序排序
};

// 选择标签
const selectTag = (tagName: string) => {
  currentTag.value = tagName;
};

// 在组件挂载时初始化标签
onMounted(() => {
  initializeTags();

  // 使用 useRoute 获取路由参数
  const route = useRoute();
  const tagName = route.params.tag; // 获取传递的标签名称
  // 如果有传递的标签名称，则设置为当前标签
  if (tagName) {
    currentTag.value = tagName as string;
  } else if (tags.value.length > 0) {
    currentTag.value = tags.value[0].name as string; // 默认选择第一个标签
  }
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
