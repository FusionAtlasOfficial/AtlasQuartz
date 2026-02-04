import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Cyber Atlantis",
    pageTitleSuffix: " Fusion Atlas ",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "google", tagId: "YOUR-ID" },
    locale: "zh-CN",
    baseUrl: "fusionatlasofficial.github.io/AtlasQuartz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Young Serif",
        header: "Schibsted Grotesk",

        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },

      colors: {
        //Quartz 的默认逻辑是调用 light 调色板；为了实现固定暗色，现已将 light 的配色方案直接改为和 dark 一样。
        lightMode: {
          light: "rgb(22, 22, 22) ", //页面总背景色
          lightgray: "rgb(0, 120, 210) ", //边框色，如搜索框、分割线、侧边栏线条
          gray: "rgb(150, 150, 150) ", //图谱线条、重边框
          darkgray: "rgb(200, 200, 200) ", //正文文字
          dark: "rgb(255, 255, 255) ", //标题、图标、导航栏文字颜色
          secondary: "rgb(91, 194, 231) ", //链接颜色、当前图谱节点、主要高亮色
          tertiary: "rgb(255, 140, 66) ", // 链接悬停态 (Hover states)、已访问的图谱节点
          highlight: "rgba(50, 50, 50, 0.2) ", // 内部链接背景、代码行高亮背景
          textHighlight: "rgb(162, 255, 0) ", // Markdown 语法标记的高亮背景
        },
        darkMode: {
          light: "rgb(22, 22, 22) ", //页面总背景色
          lightgray: "rgb(0, 120, 210) ", //边框色，如搜索框、分割线、侧边栏线条
          gray: "rgb(150, 150, 150) ", //图谱线条、重边框
          darkgray: "rgb(212, 212, 212) ", //正文文字
          dark: "rgb(255, 255, 255) ", //标题、图标、导航栏文字颜色
          secondary: "rgb(91, 194, 231) ", //链接颜色、当前图谱节点、主要高亮色
          tertiary: "rgb(255, 140, 66) ", // 链接悬停态 (Hover states)、已访问的图谱节点
          highlight: "rgba(50, 50, 50, 0.2) ", // 内部链接背景、代码行高亮背景
          textHighlight: "rgb(162, 255, 0) ", // Markdown 语法标记的高亮背景
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-dark",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: true,
        enableVideoEmbed: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

/**
 * 修复 Quartz SPA 模式下频繁跳转导致移动端“下拉刷新”失效的问题
 * 核心逻辑：在每次导航后强制重置 body 滚动状态并清除 overscroll 冲突
 */

export function fixMobilePullToRefresh() {
  const resetScrollState = () => {
    const body = document.body
    const html = document.documentElement

    // 1. 强制重置滚动位置到绝对零点，防止亚像素偏离
    window.scrollTo(0, 0)

    // 2. 显式声明 overscroll 行为，强制浏览器重新评估
    body.style.overscrollBehaviorY = "auto"
    html.style.overscrollBehaviorY = "auto"

    // 3. 针对 Chromium 内核（小米浏览器、Chrome等）的特殊处理
    // 瞬时切换 overflow 状态可以强行唤醒浏览器的原生手势监听
    const originalOverflow = body.style.overflow
    body.style.overflow = "hidden"

    // 使用 requestAnimationFrame 确保在下一帧重置，避免布局抖动
    requestAnimationFrame(() => {
      body.style.overflow = originalOverflow
    })
  }

  // 监听 Quartz 特有的 nav 事件（SPA 导航完成时触发）
  document.addEventListener("nav", () => {
    resetScrollState()
  })
}
