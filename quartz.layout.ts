import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

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
                归档: "/tags",
                导航: "/navigation",
                关于: "/about",
                打钱: "/give me money",
              },
            },
          ),
        },
        {
          Component: Component.Signature(
            // 签名
            {
              text: "—— Every Hero Has a Code", // 签名文本
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
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "联系方式:xxxxxx": "https://discord.gg/cRFFHYye7t",
    },
  }),
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
  ],
  left: [
    Component.Avatar(), // 桌面端专用，移动端通过custom.scss隐藏
    Component.Explorer({
      title: "所有文章", // 将默认的 Explorer 改为 自定义内容
      folderClickBehavior: "collapse", // 点击文件夹的行为（折叠或跳转）
      folderDefaultState: "collapsed", // 默认展开还是折叠
      useSavedState: true, // 是否记住用户的展开状态
    }),
    Component.MobileOnly(Component.Search()), // 移动端专用：在侧边栏添加搜索框
    Component.MobileOnly(
      Component.Signature({
        text: "—— Every Hero Has a Caade", // 签名文本
      }),
    ), // 移动端专用：在侧边栏添加搜索框
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
