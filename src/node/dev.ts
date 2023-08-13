import { createServer as createViteDevServer } from "vite";
import pluginReact from "@vitejs/plugin-react";
import { pluginIndexHtml } from "./vite-plugin/indexHtml";

export async function createDevServer(root: string) {
  return createViteDevServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()],
  });
}
