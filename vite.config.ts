import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import {code, meta, link} from 'md-powerpack'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItPrism from 'markdown-it-prism'
import highlight from 'highlight.js/lib/core'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis', // 将 global 定义为 globalThis
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true, // 启用 Buffer polyfill
                }),
            ],
        },
    },
    plugins: [
        vue({
            include: [/\.vue$/],
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
                    if (lang && highlight.getLanguage(lang)) {
                        try {
                            return highlight.highlight(lang as string, str as string).value;
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
