import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {}

export default ((_opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()

    return (
      <footer class={`${displayClass ?? ""}`}>
        {/* 第一行 */}
        <p>
          「 {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year} 搭建 」
        </p>

        {/* 第二行 */}
        <p>
          「 Quartz 项目官方 <a href="https://github.com/jackyzha0/quartz">GitHub仓库</a> 」
        </p>

        {/* 第三行 */}
        <p>
          「 <a href="https://github.com/jackyzha0/quartz">联系我</a> 」
        </p>

        {/* 第四行 */}
        <p>
          「 <a href="#" class="back-to-top">回到顶部</a> 」
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor