import cac from "cac";
import path from "path";

import { createDevServer } from "./dev";
import { build } from "./build";

const cli = cac("timo");

cli
  .command("dev [root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    // 编译根目录
    root = root ? path.resolve(root) : process.cwd();
    const server = await createDevServer(root);
    await server.listen();
    server.printUrls();
  });

cli
  .command("build [root]", "build project")
  .alias("build")
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
