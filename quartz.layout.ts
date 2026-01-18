import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // === Header 配置：分离 Desktop 和 Mobile 布局 ===
  header: [
    // 1. 桌面端布局
    Component.DesktopOnly(
      Component.Flex({
        components: [
          { Component: Component.PageTitle() },
          { 
            Component: Component.Links({
              links: {
                "首页": "/",
                "归档": "/tags",
                "关于": "/about",
                "项目": "/projects",
                "导航": "/navigation",
              }
            }) 
          },
          // --- 新增：签名组件 (紧接在链接后面) ---
          { 
            Component: Component.Signature({ 
              text: "—— Every Hero Has a Code" // 在这里修改你的签名文本
            }) 
          },
          // ------------------------------------
          { Component: Component.Search() }, // 直接放置，靠右逻辑交给 CSS
        ],
        gap: "large",
      })
    ),

    // 2. 移动端布局 (Mobile Only)
    Component.MobileOnly(
      Component.Flex({
        components: [
          { Component: Component.PageTitle() },
          { Component: Component.Search() },
        ],
        gap: "small",
      })
    ),
  ],
  // ==========================
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "联系方式:xxxxxx": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    // Component.PageTitle(),
    Component.Avatar(), // 自定义头像

    Component.Explorer({
      // Component.DesktopOnly(Component.Explorer({
      title: "所有文章", // 将默认的 Explorer 改为 目录
      folderClickBehavior: "collapse", // 点击文件夹的行为（折叠或跳转）
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: true, // 是否记住用户的展开状态
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}