import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir);
};

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: pathResolve('src'),
            common: pathResolve('src/common'),
        },
    },
    server: {
        port: 4000,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
});
