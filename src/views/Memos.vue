<template>
  <div class="container mt-24 mx-auto px-8 lg:px-16 space-y-8">
    <h1 class="text-2xl font-bold my-4 text-pink-400">Memos</h1>
    <div v-if="gists.length === 0">Nothing</div>
    <ul>
      <li v-for="(gist, index) in gists" :key="gist.id" class="py-2">
        <div class="flex flex-col">
          <div class="flex justify-between">
            <div class="flex justify-self-start space-x-4">
              <div v-for="mark in gist.description.split(' ')">
                <div
                    class="text-sm bg-fuchsia-50 p-1 rounded-sm text-emerald-400 hover:font-bold">
                  <a :href="gist.html_url" target="_blank">{{ mark }}</a></div>
              </div>
            </div>
            <div class="flex justify-self-end">
              <div class="text-sm flex items-center">
                <span class="pr-1"><img src="/heart.png" alt=""/></span>
                <span class="hover:text-pink-400">{{ formatGistDate(gist.created_at) }}</span></div>
            </div>
          </div>
          <div class="py-4 markdown-body memos" v-if="memoses[index]" v-html="memoses[index]"></div>
        </div>
        <hr v-if="index != gists.length - 1 || (index === gists.length - 1 && (hasNextPage || currentPage != 1))"/>
      </li>
    </ul>

    <div class="flex justify-between mt-8">
      <button @click="prevPage" :disabled="currentPage === 1" class="text-black hover:text-pink-400">
        {{ currentPage === 1 ? "" : "返回上一页" }}
      </button>
      <button @click="nextPage" :disabled="!hasNextPage" class="text-black hover:text-pink-400">
        {{ !hasNextPage ? "" : "阅读更多Memos" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import {formatGistDate} from "../utils/date.ts";
import {getMemos} from "../utils/posts.ts";
import {useCopyCode} from 'markdown-it-copy-code'
import {useStore} from "../store";

const username = "scopor" // 替换为目标 GitHub 用户名
const pageSize = 5 // 每页显示的 Gist 数量
const gists = ref<any[]>([])
const memosContents = ref<string[]>([])
const currentPage = ref(1)
const hasNextPage = ref(false)
const memoses = reactive<string[]>([]);
const store = useStore()

const fetchGists = async (page: number) => {
  if (page < 1) return

  try {
    const response = await fetch(`/api/gists?username=${username}&page=${page}&per_page=${pageSize}`);
    console.log(JSON.stringify(response));
    if (!response.ok) {
      console.log(`Fetching gists for page ${page}`);
      return;
    }
    const data = await response.json();
    console.log('Received data:', data);

    gists.value = data.gists;
    hasNextPage.value = data.hasNextPage;
    currentPage.value = page;

    const memosContentsPromises = gists.value.map(async (gist) => {
      return getMemosContent(gist.files[Object.keys(gist.files)[0]].raw_url);
    });

    memosContents.value = await Promise.all(memosContentsPromises);
    memosContents.value.map((memos, index) => {
      memoses[index] = getMemos(memos)
    })
  } catch (error) {
    console.error('Error fetching gists:', error);
    // 在这里可以添加错误处理，例如显示错误消息给用户
  }
}

async function getMemosContent(memosPath: string): Promise<string> {
  try {
    const response = await fetch(memosPath);
    if (response.ok) {
      const content = await response.text();
      return content.toString()
    }
  } catch (error) {
    console.error("获取 Gist 内容时出错:", error);
    return ""
  }
  return "";
}

const nextPage = () => {
  if (hasNextPage) {
    currentPage.value++
    store.setMemosPageIndex(currentPage.value)
    fetchGists(currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    store.setMemosPageIndex(currentPage.value)
    fetchGists(currentPage.value)
  }
}

onMounted(async () => {
  await fetchGists(1)
  useCopyCode()
  await nextTick();
})

watch(() => store.memosPage, (newPage) => {
  currentPage.value = newPage;
  if (currentPage.value === 1) {
    fetchGists(currentPage.value)
  }
})

</script>

<style scoped>
/* 可以在这里添加组件特定的样式 */
</style>
