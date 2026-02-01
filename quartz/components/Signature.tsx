import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// 定义接口，新增 cssClass 字段用于样式区分
interface Options {
  text: string
  cssClass?: string // 可选的自定义类名
}

const Signature: QuartzComponentConstructor<Options> = (opts?: Options) => {
  const SignatureComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const text = opts?.text ?? ""
    // 获取传入的自定义类名，如果没有则为空字符串
    const customClass = opts?.cssClass ?? ""
    // 使用 "|" 分隔符拆分字符串，例如 "左侧文字|右侧文字"
    
    return (
      // 将 displayClass (Quartz默认), "signature" (基础标识), customClass (用户自定义) 组合
      <div className={classNames(displayClass, "signature", customClass)}>
        <p>{text}</p>
      </div>
    )
  }
  return SignatureComponent
}

export default Signature