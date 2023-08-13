import { InlineConfig, Rollup, build as viteBuild } from "vite";
import path, { join } from "path";
import fs from "fs-extra";

import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constant";

export async function build(root: string = process.cwd()) {
  // 打包出来的源码
  const [clientBundle, serverBundle] = await bundle(root);
  // cli，用require动态加载内容，产物内容在root的./temp目录下
  const serverEntryPath = path.resolve(root, ".temp", "ssr-entry.js");
  const { render } = require(serverEntryPath);
  console.log("renderInServer ", require(serverEntryPath));
  await renderPage(render, root, clientBundle);
}

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: "production",
    root,
    build: {
      ssr: isServer ? true : false,
      assetsDir: isServer ? "" : "asset",
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: isServer
          ? // server中的包，直接在.temp目录下，且入口文件没有hash
            { format: "cjs", entryFileNames: "[name].js" }
          : { format: "esm" },
      },
    },
  });

  console.log("Building client + server bundles.....");

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // 打包client
      viteBuild(resolveViteConfig(false)),
      //   打包server
      viteBuild(resolveViteConfig(true)),
    ]);
    return [clientBundle, serverBundle] as [
      Rollup.RollupOutput,
      Rollup.RollupOutput
    ];
  } catch (err) {
    console.log(err);
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: Rollup.RollupOutput
) {
  // 客户端入口文件
  const clientEntryChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log("Rendering page in server side...");
  const appHtml = render();
  // 服务端html文件
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientEntryChunk?.fileName}"></script>
  </body>
</html>`.trim();
  // 确保build目录存在
  await fs.ensureDir(join(root, "build"));
  // 写入index.html文件，也就是含有完整App字符串的html文件
  await fs.writeFile(join(root, "build/index.html"), html);
  // 删除ssr产物
  await fs.remove(join(root, ".temp"));
}
