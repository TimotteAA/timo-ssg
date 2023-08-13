import { UserConfig as ViteConfig } from 'vite';

export type NavItemWithLink = {
    text: string;
    link: string;
};

export interface Sidebar {
    [path: string]: SidebarGroup;
}

export interface SidebarGroup {
    text?: string;
    items: SidebarItem[];
}

export type SidebarItem =
    | { text: string; link: string }
    | { text: string; link?: string; items: SidebarItem[] };

export interface ThemeConfig {
    nav?: NavItemWithLink[];
    sidebar?: Sidebar;
    footer?: Footer;
}

export interface Footer {
    message?: string;
    copyright?: string;
}

export interface UserConfig {
    title?: string;
    description?: string;
    themeConfig: ThemeConfig;
    vite?: ViteConfig;
}

export interface SiteConfig {
    /** work dir */
    root: string;
    /** 配置文件路径 */
    configPath: string;
    /** 配置数据 */
    siteData: UserConfig;
}
