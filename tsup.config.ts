import { defineConfig } from 'tsup';

const isProduction = true;

export default defineConfig(({ watch = false }) => ({
    clean: true,
    dts: true,
    entry: {
        index: 'src/index.ts',
    },
    external: [],
    format: ['cjs', 'esm', 'iife'],
    treeshake: isProduction,
    minify: isProduction,
    sourcemap: false,
    watch,
}));