// quartz/components/Links.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  links: Record<string, string>
}

const Links: QuartzComponentConstructor<Options> = (opts) => {
  const LinksComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}
    return (
      <div className={classNames(displayClass, "nav-links")}>
        {Object.entries(links).map(([text, link]) => (
          <a key={text} href={link}>{text}</a>
        ))}
      </div>
    )
  }
  return LinksComponent
}

export default Links