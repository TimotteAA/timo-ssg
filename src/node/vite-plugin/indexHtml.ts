import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { DEFAULT_HTML_PATH, CLIENT_ENTRY_PATH } from "../constant";

/**
 * 接入内置的transformindexhtml作用：https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#middleware-mode
 *
 * @returns
 */
export function pluginIndexHtml(): Plugin {
  return {
    name: "timo-index-html",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    },
    /**
     * 动态插入script
     */
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              // 告诉vite这个是绝对路径
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: "body",
          },
        ],
      };
    },
  };
}
