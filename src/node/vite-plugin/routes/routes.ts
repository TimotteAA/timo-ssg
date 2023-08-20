import { Plugin } from 'vite';

import { RouteService } from './RouteService';

interface PluginOption {
    root: string;
}
// import { routes } from "timo:routes"
export const CONVENTIONAL_ROUTE_ID = 'timo:routes';

export function pluginRoutes(options: PluginOption): Plugin {
    const routeService = new RouteService(options.root);

    return {
        name: 'plugin-routes',
        resolveId(id) {
            if (id === CONVENTIONAL_ROUTE_ID) {
                // 虚拟模块，其余插件不处理
                return '\0' + CONVENTIONAL_ROUTE_ID;
            }
        },
        load(id) {
            if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
                return routeService.generateRoutesCode();
            }
        },
        async configResolved() {
            // vite服务器启动器监听文件
            await routeService.init();
        },
    };
}
