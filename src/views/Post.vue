<template>
  <div class="container mx-auto mt-24 bg-white px-16 space-y-8">
    <h1 class="text-2xl font-bold font-sans text-pink-400">{{ frontmatter.title }}</h1>
    <component :is="postComponent" class="font-serif "/>
    <div class="flex space-x-4 items-center">
      <span v-if="frontmatter.date" class='gg-heart text-pink-400 text-sm ml-1 -mr-2'/>
      <span class="text-sm text-gray-400 items-center text-center"> {{ !frontmatter.date ? "" : "" + new Date(frontmatter.date).toLocaleString('zh', {hour12: false}).replaceAll('/', '-') }}</span>
      <span v-if="frontmatter.date" class='gg-tag text-pink-400 text-sm ml-1 -mr-2'/>
      <span v-for="tag in frontmatter.tags" :key="tag" class="text-sm text-gray-400 hover:text-pink-300">
        <router-link :to="{ name: 'tag', params: { tag: tag } }" >{{ tag }}</router-link>
      </span>
    </div>
    <hr v-if="frontmatter.title != 'About me'"/>
    <div class="flex pb-8 justify-between">
      <span v-if="prevPost" class="hover:text-pink-300"><router-link :to="{ name: 'posts', params: { slug: prevPost.slug } }">上一篇: {{ prevPost.title }}</router-link></span>
      <span v-else="prevPost"></span>
      <span v-if="nextPost && frontmatter.title != 'About me'" class="hover:text-pink-300"><router-link :to="{ name: 'posts', params: { slug: nextPost.slug } }">下一篇: {{ nextPost.title }}</router-link></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {getPostMetadata, getPostContent, PostMetadata} from '../utils/posts'


const postComponent = ref<any>(null)
const route = useRoute()
const frontmatter = ref<any>({})
const posts = getPostMetadata(); // 获取所有博文元数据

// 定义上一篇和下一篇的引用
const prevPost = ref<PostMetadata | null>(null);
const nextPost = ref<PostMetadata | null>(null);

// 更新当前博文和上下篇博文
const updatePosts = (slug: string) => {
  const currentIndex = posts.findIndex(post => post.slug === slug);

  // 更新当前博文的内容
  const postContent = getPostContent(slug);
  if (postContent) {
    postComponent.value = defineAsyncComponent(() => Promise.resolve(postContent.component));
    frontmatter.value = postContent.frontmatter;
  }

  // 更新上一篇和下一篇
  prevPost.value = currentIndex > 0 ? posts[currentIndex - 1] : null;
  nextPost.value = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
};

// 监听路由参数变化
watch(() => route.params.slug, (newSlug) => {
  updatePosts(newSlug as string);
});

// 在组件载时初始化当前博文
onMounted(() => {
  const slug = route.params.slug as string;
  updatePosts(slug);


});
</script>

<style scoped>

</style>
