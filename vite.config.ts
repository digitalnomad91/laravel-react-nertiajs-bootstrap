import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/sass/app.scss', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '~fa': '/node_modules/@fortawesome/fontawesome-free/scss',
        },
    },
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
    server: {
        host: '0.0.0.0',
        hmr: {
            host: '127.0.0.1',
        },
    },
})
