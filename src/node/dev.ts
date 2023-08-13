import { createServer as createViteDevServer } from 'vite';
import pluginReact from '@vitejs/plugin-react';

import { pluginIndexHtml } from './vite-plugin/indexHtml';
import { pluginConfig } from './vite-plugin/config';
import { resolveConfig } from './config';
import { PACKAGE_ROOT } from './constant';

export async function createDevServer(root: string, restartServer: () => Promise<void>) {
    const config = await resolveConfig(root, 'serve', 'development');
    return createViteDevServer({
        root,
        plugins: [pluginIndexHtml(), pluginReact(), pluginConfig(config, restartServer)],
        server: {
            fs: {
                allow: [PACKAGE_ROOT],
            },
        },
    });
}
