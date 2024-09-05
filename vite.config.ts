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
                    html = html.replace(/<link rel="modulepreload" crossorigin href="(\/assets\/(?!index-)[^.]+\.js)">/g,
                        (_, url) => `<script defer async src="${url}"></script>`
                    );
                    html = html.replace(/<link rel="modulepreload" crossorigin href="(\/assets\/index-[^.]+\.js)">/g, '');


                    const linkToMove = html.match(/<link rel="stylesheet" crossorigin href="\/assets\/style-[^.]+\.css">/g) || [];
                    html = html.replace(/<link rel="stylesheet" crossorigin href="\/assets\/style-[^.]+\.css">/g, '');
                    html = html.replace(/(<meta charset="UTF-8"\/>)/, (match) => {
                        return `${match}\n${linkToMove.join('\n')}`;
                    });

                    // 将所有带有 defer 和 async 属性的 <script> 标签移动到 </body> 之后
                    const scriptsToMove = html.match(/<script defer async src="([^"]+)"><\/script>/g) || [];
                    html = html.replace(/<script defer async type="module" src="([^"]+)"><\/script>/g, '');
                    html = html.replace(/(<\/body>)/, (match) => {
                        return `${match}\n${scriptsToMove.join('\n')}`;
                    });
                    return html.replace(/^\s*[\r\n]/gm, '');
                }
            }
        }
    ],
})
