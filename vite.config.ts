import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import {code, meta, link} from 'md-powerpack'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItPrism from 'markdown-it-prism'
import highlight from 'highlight.js/lib/core'


export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown({
            builders: [code(), meta(), link()],
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
                breaks: true,
                xhtmlOut: true,
                highlight: ((str, lang) => {
                    console.log(lang)
                    if (lang && highlight.getLanguage(lang)) {
                        console.log(lang)
                        try {
                            return highlight.highlight(lang, str).value;
                        } catch (___) {
                            console.log("parse error.")
                        }
                    }
                    return '';
                })
            },
            markdownItUses: [
                markdownItAnchor,
                markdownItPrism
            ],
            markdownItSetup(md) {
                md.use(markdownItAnchor)
                md.use(markdownItPrism)
            },
            // 将 Markdown 文件作为 Vue 组件处理
            vuePlugin: {
                exposeFrontmatter: true
            }
        })
    ],
})
