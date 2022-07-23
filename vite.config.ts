import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import { resolve } from 'path';

const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir);
};

export default defineConfig({
    mode: process.env.NODE_ENV,
    base: process.env.NODE_ENV === 'development' ? '/' : '/basesimple/',
    plugins: [
        react(),
        viteMockServe({
            mockPath: pathResolve('src/mock'),
            supportTs: true,
            localEnabled: true,
        }),
    ],
    resolve: {
        alias: {
            src: pathResolve('src'),
            common: pathResolve('src/common'),
            hooks: pathResolve('src/hooks'),
        },
    },
    server: {
        port: 8000,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    build: {
        outDir: './docs',
        minify: 'terser',
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    antd: ['antd'],
                    axios: ['axios'],
                },
            },
        },
    },
});
