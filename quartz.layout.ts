import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
// 引入 FileTrieNode 类型以支持自定义排序和过滤函数的编写
import { FileTrieNode } from "./quartz/util/fileTrie"

// 全局共有：搜索、标题、深色模式、页脚
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // === Header 配置：已合并为全局统一布局 ===
  header: [
    Component.Flex({
      components: [
        {
          Component: Component.Avatar(), // 移动端专用头像组件，桌面端通过custom.scss隐藏
        },
        {
          Component: Component.PageTitle(), // 站点标题
        },
        {
          Component: Component.Links(
            // 导航链接组件
            {
              links: {
                首页: "/",
                最新内容: "/安卓刷机-Android/Atlas_个人刷机笔记_20260108",
                笔记杂项: "/笔记杂项页",
                更新日志: "/网站更新日志",
                关于: "/关于我-AboutMe",
              },
            },
          ),
        },
        {
          Component: Component.Signature(
            // 签名
            {
              text: '\"Our lives are not our own. From womb to tomb, we are bound to others, past and present, and by each crime and every kindness, we birth our future."\ ', // 签名文本
            },
          ),
        },
        {
          Component: Component.Search(), // 搜索栏
        },
      ],
      gap: "large",
    }),
  ],
  // ==========================
  afterBody: [
    Component.Signature(
      // 签名
      {
        text: "本站可随意转载，但请注明出处。\nFusion Atlas © 2026. All Rights Reserved.   ", // 签名文本
        cssClass: "secondary-text", // 必须传入自定义类名，不如会和header的.Signature冲突
      },
    ),
  ],
  footer: Component.Footer(),
}

// 笔记页特有：左边栏显示文件树，右边栏显示目录和反向链接
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    // 首页专属卡片
    Component.ConditionalRender({
      component: Component.LinkCardsHome(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.LinkCardsOfficially(),
      // 这里的 "正式发布页" 需对应 MD 文件的文件名（slug）
      condition: (page) => page.fileData.slug === "正式发布页",
    }),
  ],
  left: [
    Component.Avatar(), // 桌面端专用，移动端通过custom.scss隐藏
    // 头像下方的副标题 (仅桌面端)
    Component.DesktopOnly(
      Component.Signature({
        text: "Fusion Atlas",
        // 不传 cssClass，默认使用基础样式
      }),
    ),
    // 头像下方第二行文本 (仅桌面端)
    Component.DesktopOnly(
      Component.Signature({
        text: "Every Hero Has a Code", // 你的第二行文本内容
        cssClass: "secondary-text", // 必须传入自定义类名，不如会和第一行的.Signature冲突
      }),
    ),
    // === Explorer 1: 正式发布 (白名单模式) ===
    Component.Explorer({
      title: "正式发布", // 自定义标题
      folderClickBehavior: "collapse",
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: false, // 不保存状态，每次重置
      // 核心：白名单过滤函数
      filterFn: (node: FileTrieNode) => {
        // 1. 定义允许显示的白名单 (全部小写)(空格转换为短横线"-"")(具体文件不需要后缀)
        // 备忘：如果你想显示 "coding/web/react.md"，你必须把 "coding", "web", "react" 都加进去，
        const whitelist = new Set([
          "安卓刷机-android", // 允许的文件夹 A
          "atlas_个人刷机笔记_20260108", // 允许的具体文件 (不需要后缀)
          "atlas_个人刷机笔记各平台上传相关备忘",
          "index", // 通常建议允许 index，否则根目录可能出问题
        ])

        // 2. 检查当前节点名称是否在白名单中
        return whitelist.has(node.slugSegment.toLowerCase())
      },
      // 排序：简单的文件夹优先
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        return a.displayName.localeCompare(b.displayName)
      },
    }),

    // === Explorer 2: 筹备中... (黑名单模式，自定义排序) ===
    Component.Explorer({
      title: "筹备中...", // 自定义标题
      folderClickBehavior: "collapse", // 点击文件夹的行为（折叠或跳转）
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: false, // 不保存状态，每次重置
      // === 过滤函数：隐藏具体文件的代码 ===
      filterFn: (node: FileTrieNode) => {
        // 隐藏文件（文件名通常不带 .md 后缀，且建议使用小写进行匹配）
        const hideFiles = new Set(["关于我-aboutme", "网站更新日志", "正式发布页", "笔记杂项页"])
        // 隐藏文件夹
        const hideFolders = new Set(["安卓刷机-android"])

        // 2. 如果是文件夹，按文件夹黑名单过滤
        if (node.isFolder) {
          return !hideFolders.has(node.slugSegment.toLowerCase())
        }

        // 3. 如果是文件，按文件黑名单过滤
        // node.isFolder 为 false 时即为文件
        return !hideFiles.has(node.slugSegment.toLowerCase())
      },
      // 排序函数：自定义优先级
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        // 1. 文件夹优先于文件
        if (a.isFolder && !b.isFolder) return 1
        if (!a.isFolder && b.isFolder) return -1

        // 2. 特殊文件夹置顶 (根据 slugSegment)
        const priorityList = ["游戏攻略", "philosophy", "projects"]
        const aIndex = priorityList.indexOf(a.slugSegment.toLowerCase())
        const bIndex = priorityList.indexOf(b.slugSegment.toLowerCase())

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex // 都在列表中，按列表顺序
        if (aIndex !== -1) return -1 // a 在列表中，置顶
        if (bIndex !== -1) return 1 // b 在列表中，置顶

        // 3. 其余按名称排序 (支持数字排序 1, 2, 10)
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),

    // === Explorer 3: 网站及其他 (白名单模式，按时间倒序) ===
    Component.Explorer({
      title: "网站及其他", // 自定义标题 2
      folderClickBehavior: "collapse", // 点击文件夹的行为（折叠或跳转）
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: false, // 不保存状态，每次重置
      // 核心：白名单过滤函数
      filterFn: (node: FileTrieNode) => {
        // 1. 定义允许显示的白名单 (全部小写)(空格转换为短横线"-"")(具体文件不需要后缀)
        // 备忘：如果你想显示 "coding/web/react.md"，你必须把 "coding", "web", "react" 都加进去，
        const whitelist = new Set([
          "占位文本", // 允许的文件夹 A
          "关于我-aboutme", // 允许的具体文件 (不需要后缀)
          "网站更新日志",
          "index", // 通常建议允许 index，否则根目录可能出问题
        ])

        // 2. 检查当前节点名称是否在白名单中
        return whitelist.has(node.slugSegment.toLowerCase())
      },
      // 排序函数：倒序排列 (适合以日期命名的日记)
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        return b.displayName.localeCompare(a.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
    Component.MobileOnly(Component.Search()), // 移动端专用：在侧边栏添加搜索框
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 列表页（标签页等）特有：左边栏显示文件树，右边栏通常留空或放简单组件
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.Avatar(), // 桌面端专用，移动端通过custom.scss隐藏
    // 头像下方的副标题 (仅桌面端)
    Component.DesktopOnly(
      Component.Signature({
        text: "Fusion Atlas",
        // 不传 cssClass，默认使用基础样式
      }),
    ),
    // 头像下方第二行文本 (仅桌面端)
    Component.DesktopOnly(
      Component.Signature({
        text: "Every Hero Has a Code", // 你的第二行文本内容
        cssClass: "secondary-text", // 必须传入自定义类名，不如会和第一行的.Signature冲突
      }),
    ),
    // === Explorer 1: 正式发布 (白名单模式) ===
    Component.Explorer({
      title: "正式发布", // 自定义标题
      folderClickBehavior: "collapse",
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: false, // 不保存状态，每次重置
      // 核心：白名单过滤函数
      filterFn: (node: FileTrieNode) => {
        // 1. 定义允许显示的白名单 (全部小写)(空格转换为短横线"-"")(具体文件不需要后缀)
        // 备忘：如果你想显示 "coding/web/react.md"，你必须把 "coding", "web", "react" 都加进去，
        const whitelist = new Set([
          "安卓刷机-android", // 允许的文件夹 A
          "atlas_个人刷机笔记_20260108", // 允许的具体文件 (不需要后缀)
          "atlas_个人刷机笔记各平台上传相关备忘",
          "index", // 通常建议允许 index，否则根目录可能出问题
        ])

        // 2. 检查当前节点名称是否在白名单中
        return whitelist.has(node.slugSegment.toLowerCase())
      },
      // 排序：简单的文件夹优先
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        return a.displayName.localeCompare(b.displayName)
      },
    }),

    // === Explorer 2: 筹备中... (黑名单模式，自定义排序) ===
    Component.Explorer({
      title: "筹备中...", // 自定义标题
      folderClickBehavior: "collapse", // 点击文件夹的行为（折叠或跳转）
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: false, // 不保存状态，每次重置
      // === 过滤函数：隐藏具体文件的代码 ===
      filterFn: (node: FileTrieNode) => {
        // 隐藏文件（文件名通常不带 .md 后缀，且建议使用小写进行匹配）
        const hideFiles = new Set(["关于我-aboutme", "网站更新日志", "正式发布页", "笔记杂项页"])
        // 隐藏文件夹
        const hideFolders = new Set(["安卓刷机-android"])

        // 2. 如果是文件夹，按文件夹黑名单过滤
        if (node.isFolder) {
          return !hideFolders.has(node.slugSegment.toLowerCase())
        }

        // 3. 如果是文件，按文件黑名单过滤
        // node.isFolder 为 false 时即为文件
        return !hideFiles.has(node.slugSegment.toLowerCase())
      },
      // 排序函数：自定义优先级
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        // 1. 文件夹优先于文件
        if (a.isFolder && !b.isFolder) return 1
        if (!a.isFolder && b.isFolder) return -1

        // 2. 特殊文件夹置顶 (根据 slugSegment)
        const priorityList = ["游戏攻略", "philosophy", "projects"]
        const aIndex = priorityList.indexOf(a.slugSegment.toLowerCase())
        const bIndex = priorityList.indexOf(b.slugSegment.toLowerCase())

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex // 都在列表中，按列表顺序
        if (aIndex !== -1) return -1 // a 在列表中，置顶
        if (bIndex !== -1) return 1 // b 在列表中，置顶

        // 3. 其余按名称排序 (支持数字排序 1, 2, 10)
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),

    // === Explorer 3: 网站及其他 (白名单模式，按时间倒序) ===
    Component.Explorer({
      title: "网站及其他", // 自定义标题 2
      folderClickBehavior: "collapse", // 点击文件夹的行为（折叠或跳转）
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: false, // 不保存状态，每次重置
      // 核心：白名单过滤函数
      filterFn: (node: FileTrieNode) => {
        // 1. 定义允许显示的白名单 (全部小写)(空格转换为短横线"-"")(具体文件不需要后缀)
        // 备忘：如果你想显示 "coding/web/react.md"，你必须把 "coding", "web", "react" 都加进去，
        const whitelist = new Set([
          "占位文本", // 允许的文件夹 A
          "关于我-aboutme", // 允许的具体文件 (不需要后缀)
          "网站更新日志",
          "index", // 通常建议允许 index，否则根目录可能出问题
        ])

        // 2. 检查当前节点名称是否在白名单中
        return whitelist.has(node.slugSegment.toLowerCase())
      },
      // 排序函数：倒序排列 (适合以日期命名的日记)
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        return b.displayName.localeCompare(a.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
    Component.MobileOnly(Component.Search()), // 移动端专用：在侧边栏添加搜索框
  ],
  right: [],
}
