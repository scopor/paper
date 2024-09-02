import {createApp} from 'vue'
import router from './router'
import {createPinia} from "pinia";
import './style.css'
import 'github-markdown-css/github-markdown-light.css'
import 'highlight.js/styles/xcode.min.css'
import 'markdown-it-copy-code/styles/base.css'
import 'markdown-it-copy-code/styles/medium.css'
import 'prismjs/themes/prism-coy.css'
import App from './App.vue'
import { createHead } from '@unhead/vue'

const head = createHead()
const pinia = createPinia()

createApp(App).use(router).use(pinia).use(head).mount('#app')
