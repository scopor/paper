import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import viteCompression from "vite-plugin-compression"

export default defineConfig({
    build: {
        sourcemap: false,
        minify: "terser",
        chunkSizeWarningLimit: 10240,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return "vendor";
                    }
                }
            },
            plugins: [
                viteCompression({
                    verbose: true, // 是否在控制台中输出压缩结果
                    disable: false,
                    threshold: 1024000, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
                    algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
                    ext: '.js',
                    deleteOriginFile: true
                })
            ]
        },
        terserOptions: {
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
    ],
})
