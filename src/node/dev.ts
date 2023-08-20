import { createServer as createViteDevServer } from 'vite';
import pluginReact from '@vitejs/plugin-react';

import { pluginIndexHtml } from './vite-plugin/indexHtml';
import { pluginConfig } from './vite-plugin/config';
import { pluginRoutes } from './vite-plugin/routes/routes';
import { resolveConfig } from './config';
import { PACKAGE_ROOT } from './constant';

export async function createDevServer(root: string, restartServer: () => Promise<void>) {
    const config = await resolveConfig(root, 'serve', 'development');
    return createViteDevServer({
        // root,
        root: PACKAGE_ROOT,
        plugins: [
            pluginIndexHtml(),
            pluginReact(),
            pluginConfig(config, restartServer),
            pluginRoutes({ root: config.root }),
        ],
        server: {
            fs: {
                allow: [PACKAGE_ROOT],
            },
        },
    });
}
