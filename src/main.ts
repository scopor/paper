import {createApp} from 'vue'
import router from './router'
import {createPinia} from "pinia";
import './style.css'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/xcode.min.css'
// import 'highlight.js/styles/color-brewer.css'
import 'css.gg/icons/icons.css'
import 'markdown-it-copy-code/styles/base.css'
import 'markdown-it-copy-code/styles/medium.css'
import 'prismjs/themes/prism-coy.css'
import App from './App.vue'

export const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
