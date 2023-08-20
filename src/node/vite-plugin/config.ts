import { relative } from 'path';
import { Plugin } from 'vite';
import { SiteConfig } from '../../shared/types';

/**
 * import siteData from "timo:site-data"
 */
const SITE_DATA_ID = 'timo:site-data';

export function pluginConfig(config: SiteConfig, restartServer?: () => Promise<void>): Plugin {
    return {
        name: 'timo-config',
        resolveId(source) {
            if (source === SITE_DATA_ID) {
                // 让其他的插件不处理这个import
                return '\0' + SITE_DATA_ID;
            }
        },
        /**
         * 虚拟模块内容
         *
         * @param id
         * @returns
         */
        load(id) {
            if (id === '\0' + SITE_DATA_ID) {
                return `export default ${JSON.stringify(config.siteData)}`;
            }
        },
        /**
         * 监听文件变化
         *
         */
        async handleHotUpdate(ctx) {
            // 监听的配置文件
            const watchConfigFiles = [config.configPath];
            // config文件可能在 xxx/xxx/config.ts下
            const include = (id: string) => watchConfigFiles.some((file) => id.includes(file));
            if (include(ctx.file)) {
                console.log(`\n${relative(config.root, ctx.file)} changed, restarting server...`);
                // 重启dev server，或者说重新创建server
                await restartServer();
            }
        },
    };
}
