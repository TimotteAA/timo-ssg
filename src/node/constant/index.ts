import { join } from 'path';

// export const PACKAGE_ROOT = join(__dirname, "../../../");
// tsup打包后入口为dist/cli.mjs
export const PACKAGE_ROOT = join(__dirname, '../');

/**
 * 动态插入的script的src：/src/runtime/client-entry.tsx
 */
export const CLIENT_ENTRY_PATH = join(PACKAGE_ROOT, 'src', 'runtime', 'client-entry.tsx');

/**
 * ssr入口
 */
export const SERVER_ENTRY_PATH = join(PACKAGE_ROOT, './src/runtime/ssr-entry.tsx');

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');
