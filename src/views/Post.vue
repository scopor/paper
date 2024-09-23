<template>
  <div class="container mx-auto mt-24 bg-white px-8 lg:px-16 space-y-8">
    <h1 class="text-2xl font-sans text-pink-400">{{ frontmatter.title }}</h1>
    <div v-html="content" class="font-serif postContent container markdown-body"></div>
    <div class="flex flex-wrap space-x-4 items-center">
      <span v-if="frontmatter.date" class='text-pink-400 text-xs lg:text-sm -mr-2'><img src="/heart.png" alt=""/></span>
      <span class="text-xs lg:text-sm text-gray-400 items-center text-center">
         {{ formattedDate(frontmatter.date) }}
      </span>
      <span v-if="frontmatter.tags" class='text-pink-400 text-xs ml-4 transform rotate-90'><img src="/tag.png" alt=""/></span>
      <span v-for="tag in frontmatter.tags" :key="tag" class="text-xs lg:text-sm text-gray-400 hover:text-pink-400 ml-4">
        <router-link :to="{ name: 'tag', params: { tag: tag } }">{{ tag }}</router-link>
      </span>
    </div>
    <hr v-if="frontmatter.title != 'About Me' && (prevPost || nextPost)"/>
    <div class="flex pb-8 justify-between" id="nextPost">
      <span v-if="prevPost" class="hover:text-pink-300"><router-link :to="{ name: 'posts', params: { slug: prevPost.slug } }">上一篇: {{ prevPost.title }}</router-link></span>
      <span v-else></span>
      <span v-if="nextPost && frontmatter.title != 'About Me'" class="hover:text-pink-300"><router-link :to="{ name: 'posts', params: { slug: nextPost.slug } }">下一篇: {{ nextPost.title }}</router-link></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {getPostContent, getPostMetadata, PostMetadata} from '../utils/posts'
import {markdownItDiagramDom} from 'markdown-it-diagram/dom'
import mermaid from 'mermaid'
import {useCopyCode} from 'markdown-it-copy-code'
import {formattedDate} from "../utils/date.ts";
import {useTitle} from '@vueuse/core'
import {useHead} from "@unhead/vue";

const content = ref<any>(null)
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
    content.value = postContent.content;
    frontmatter.value = postContent.frontmatter;
  }

  // 更新上一篇和下一篇
  prevPost.value = currentIndex > 0 ? posts[currentIndex - 1] : null;
  nextPost.value = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
};

// 监听路由参数变化
watch(() => route.params.slug, (newSlug) => {
  updatePosts(newSlug  as string);
});

onBeforeMount(async () => {
  await mermaid.initialize({startOnLoad: true})
  await mermaid.run()
  await markdownItDiagramDom()
})

// 在组件载时初始化当前博文
onMounted( () => {
  const slug = route.params.slug as string;
  updatePosts(slug);
  useCopyCode();
});

const title = computed(() => {
  return !frontmatter.value.title ? 'Vinlane' : `${frontmatter.value.title} | Vinlane`
})

useHead({
  meta: [
    {name: 'description', content: () => frontmatter.value.description},
    {name: 'keywords', content: () => frontmatter.value.tags?.slice(', ').toString()},
  ],
})

useTitle(title)
</script>

<style scoped>

</style>
