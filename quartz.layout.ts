import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.DesktopOnly(Component.PageTitle()), // 将标题设置到顶栏左侧(仅桌面模式)
    Component.Search(), // 将搜索设置到顶栏(仅桌面模式)
  ],  afterBody: [],
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
//    Component.PageTitle(),
    Component.Avatar(), // 自定义头像
    Component.MobileOnly(Component.Flex({
      components: [
        { Component: Component.PageTitle() },
//        {
//          Component: Component.Search(),
//          grow: true,
//        },
//        { Component: Component.Darkmode() },
//        { Component: Component.ReaderMode() },
      ],
    })),
    Component.Explorer({
//    Component.DesktopOnly(Component.Explorer({
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
