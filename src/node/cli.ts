import cac from 'cac';
import path from 'path';

import { build } from './build';

const cli = cac('timo');

cli.command('dev [root]', 'start dev server')
    .alias('dev')
    .action(async (root: string) => {
        // 编译根目录
        root = root ? path.resolve(root) : process.cwd();
        // const server = await createDevServer(root);
        // await server.listen();
        // server.printUrls();

        const createServer = async () => {
            const { createDevServer } = await import('./dev.js');
            const server = await createDevServer(root, async () => {
                await server.close();
                await createServer();
            });

            await server.listen();
            server.printUrls();
        };
        await createServer();
    });

cli.command('build [root]', 'build project')
    .alias('build')
    .action(async (root: string) => {
        try {
            root = path.resolve(root);
            await build(root);
        } catch (err) {
            console.log(err);
        }
    });

// 解析参数
cli.parse();
