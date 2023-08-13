import fs from 'fs-extra';
import path from 'path';
import { loadConfigFromFile, normalizePath } from 'vite';
import { SiteConfig, UserConfig } from '../shared/types';

/**
 * 支持三种参数配置：1.对象；2.异步；3.异步函数
 */
type RawConfig = UserConfig | (() => UserConfig | Promise<UserConfig>) | Promise<UserConfig>;

/**
 * 读取配置文件对象
 *
 * @param root
 * @param command
 * @param mode
 * @returns
 */
export async function resolveUserConfig(
    root: string,
    command: 'serve' | 'build',
    mode: 'development' | 'production',
) {
    // 1. 确定配置文件路径
    const configPath = getConfig(root);
    // 2. 读取配置文件内容
    const result = await loadConfigFromFile(
        {
            mode,
            command,
        },
        configPath,
        root,
    );

    if (result) {
        //
        const { config: rawConfig = {} as RawConfig } = result;
        // 1. object 2. function 3. promise

        const userConfig = (await (typeof rawConfig === 'function'
            ? rawConfig()
            : rawConfig)) as UserConfig;
        return [normalizePath(configPath), userConfig] as const;
    } else {
        return [normalizePath(configPath), {} as UserConfig] as const;
    }
}

/**
 * 对传入的userConfig做非空的默认值处理
 *
 * @param userConfig
 * @returns
 */
export function resolveSiteData(userConfig: UserConfig): UserConfig {
    return {
        title: userConfig.title || 'TimoJs',
        description: userConfig.description || 'A ssg framework for learning',
        themeConfig: userConfig.themeConfig,
        vite: userConfig.vite || {},
    };
}

export async function resolveConfig(
    root: string,
    command: 'serve' | 'build',
    mode: 'development' | 'production',
) {
    const [confitPath, userConfig] = await resolveUserConfig(root, command, mode);
    const siteConfig: SiteConfig = {
        root,
        configPath: confitPath,
        siteData: resolveSiteData(userConfig as UserConfig),
    };
    return siteConfig;
}

function getConfig(root: string) {
    try {
        const supportConfigFiles = ['config.ts', 'config.js'];
        const configPath = supportConfigFiles
            .map((file) => path.resolve(root, file))
            .find(fs.pathExistsSync);
        return configPath;
    } catch (err) {
        console.error(`Failter to load user config: ${err}`);
        throw err;
    }
}

/**
 * 用户自定义配置
 *
 * @param config
 * @returns
 */
export function defineConfig(config: UserConfig) {
    return config;
}
