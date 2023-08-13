import { defineConfig } from 'tsup';

export default defineConfig({
    // 单独打包dev.ts的原因，让createDevServer可以动态地import使用
    entry: ['src/node/cli.ts', 'src/node/index.ts', 'src/node/dev.ts'],
    bundle: true,
    splitting: true,
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    //   ployfill
    shims: true,
});
