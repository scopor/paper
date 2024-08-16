import { createApp } from 'vue'
import router from './router'
import './style.css'
import './dracula.css'
import 'github-markdown-css/github-markdown-light.css'
import 'highlight.js/styles/github.css'
import 'css.gg/icons/icons.css'

import App from './App.vue'

createApp(App).use(router).mount('#app')
