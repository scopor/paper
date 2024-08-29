<template>
  <header class="bg-white text-black container mx-auto px-8 lg:px-16 pt-20" id="NavBar">
    <nav class="flex justify-between align-center items-center mb-16">
      <h1 class="text-3xl font-bold hover:text-pink-400">
        <router-link to="/" @click="goHome">微山<br>澜水</router-link>
      </h1>
      <div class="flex flex-col justify-end">
        <ul class="flex justify-end space-x-4 lg:space-x-4 text-sm">
          <li class="hover:text-pink-400">
            <router-link to="/" @click="goHome">首页</router-link>
          </li>
          <li class="hover:text-pink-400">
            <router-link to="/archive" @click="goArchive">归档</router-link>
          </li>
          <li class="hover:text-pink-400">
            <router-link to="/tag">标签</router-link>
          </li>
          <li class="hover:text-pink-400">
            <router-link to="/memos" @click="goMemos">Memos</router-link>
          </li>
          <li class="hover:text-pink-400">
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
        <ul class="flex justify-items-center justify-evenly mt-2 text-sm">
          <li class="hover:text-pink-400">
            <a href="https://twitter.com/DesperadoYan" target="_blank">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM23.3316 20.338L23.2812 19.5075C23.1301 17.3551 24.4563 15.3891 26.5548 14.6265C27.327 14.3553 28.6364 14.3214 29.4926 14.5587C29.8283 14.6604 30.4663 14.9993 30.9195 15.3044L31.7421 15.8637L32.6486 15.5756C33.1523 15.423 33.8238 15.1688 34.1259 14.9993C34.4113 14.8468 34.6631 14.762 34.6631 14.8129C34.6631 15.101 34.042 16.084 33.5216 16.6263C32.8165 17.389 33.018 17.4568 34.4449 16.9483C35.3011 16.6602 35.3178 16.6602 35.15 16.9822C35.0492 17.1517 34.5288 17.7449 33.9748 18.2872C33.0347 19.2194 32.9844 19.3211 32.9844 20.1007C32.9844 21.304 32.4136 23.8123 31.8428 25.1851C30.7852 27.7612 28.5189 30.422 26.2526 31.7609C23.063 33.6422 18.8157 34.1167 15.24 33.0151C14.0481 32.6422 12 31.6931 12 31.5237C12 31.4728 12.6211 31.405 13.3766 31.3881C14.9546 31.3542 16.5326 30.9135 17.8756 30.1339L18.7822 29.5916L17.7413 29.2357C16.264 28.7272 14.9378 27.5578 14.6021 26.4562C14.5013 26.1003 14.5349 26.0833 15.475 26.0833L16.4487 26.0664L15.6261 25.6766C14.6524 25.1851 13.7627 24.3546 13.3262 23.5072C13.0072 22.8971 12.6044 21.3548 12.7219 21.2362C12.7554 21.1854 13.108 21.287 13.5109 21.4226C14.6692 21.8463 14.8203 21.7446 14.1488 21.0328C12.8897 19.7448 12.5036 17.8296 13.108 16.0162L13.3934 15.2027L14.5013 16.3043C16.7677 18.5245 19.4369 19.8465 22.4922 20.2363L23.3316 20.338Z"
                      fill="black"></path>
              </svg>
            </a>
          </li>
          <li class="hover:text-pink-400">
            <a href="https://github.com/scopor" target="_blank">
              <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>github [#142]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                          d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                          id="github-[#142]"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </div>
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

const goMemos = () => {
  store.setMemosPageIndex(1)
  router.push('/memos')
}
</script>

<style scoped>
</style>
