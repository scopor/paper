import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
    build: {
        cssCodeSplit: false,
        minify: "terser",
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 10240,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const chunk = id.toString().split("node_modules/")[1].split("/")[0].toString();

                        const chunkMap: { [key: string]: string } = {
                            'katex': 'katex',
                            'markdown': 'markdown',
                            'flowchart': 'flowchart',
                            'mermaid': 'mermaid',
                            'highlight': 'highlight',
                            'cytoscape': 'cytoscape',
                            'elkjs': 'elkjs'
                        };

                        // 检查chunk是否在chunkMap中
                        for (const key in chunkMap) {
                            if (chunk.includes(key)) {
                                if (key === 'mermaid' && id.includes('Diagram')) {
                                    return "diagram";
                                }
                                return chunkMap[key];
                            }
                        }
                        return "vendor";
                    } else {
                        return "index";
                    }
                }
            },
            plugins: []
        },
        terserOptions: {
            sourceMap: false,
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis', // 将 global 定义为 globalThis
            },
            plugins: [],
        },
    },
    plugins: [
        nodePolyfills(),
        vue({
            include: [/\.vue$/],
        }),
        {
            name: 'html-transform',
            transformIndexHtml: {
                enforce: 'post', // 确保在其他处理之后执行
                async transform(html) {
                    console.log("html:" + html)
                    // 这里可以对 html 进行修改
                    // 例如，添加一个 meta 标签
                    html = html.replace(/<link rel="modulepreload" crossorigin href="(\/assets\/(?!index-)[^.]+\.js)">/g,
                        (_, url) => `<script defer async type="module" src="${url}"></script>`
                    );
                    return html.replace(/<link rel="modulepreload" crossorigin href="(\/assets\/index-[^.]+\.js)">/g, '');
                }
            }
        }
    ],
})
