import fastGlob from 'fast-glob';
import { normalizePath } from 'vite';
import path from 'path';

interface RouteMeta {
    routePath: string;
    absolutePath: string;
}

export class RouteService {
    private _routeData: RouteMeta[] = [];

    constructor(private scanDir: string) {}

    async init() {
        const files = fastGlob
            .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
                // 扫描路径
                cwd: this.scanDir,
                absolute: true,
                // 用户开发目录下忽视的地方：配置文件、构建产物、node_modules
                ignore: ['**/node_modules/**', '**/build/**', 'config.ts'],
            })
            .sort();
        // 扫出来的是绝对路径
        files.forEach((file) => {
            // file在scanDir下的相对路径
            const fileRelative = normalizePath(path.relative(this.scanDir, file));
            // 1. 路由路径
            const routePath = this.normalizeRoutePath(fileRelative);
            // 文件绝对路径
            this._routeData.push({
                routePath: routePath,
                absolutePath: file,
            });
        });
    }

    get routeData() {
        return this._routeData;
    }

    generateRoutesCode() {
        return `
            import React from 'react';
            import loadable from "@loadable/component";
            // 导入各个路由模块
            ${this.routeData
                .map((route, index) => {
                    return `const Route${index} = loadable(() => import('${route.absolutePath}'))`;
                })
                .join('\n')}
            export const routes = [
                ${this.routeData
                    .map((route, index) => {
                        return `{path: '${route.routePath}', element: React.createElement(Route${index})}`;
                    })
                    .join(',\n')}
            ]
        `;
    }

    normalizeRoutePath(rawPath: string) {
        const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
        return routePath.startsWith('/') ? routePath : `/${routePath}`;
    }
}
