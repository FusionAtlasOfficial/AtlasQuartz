import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  text: string
}

const Signature: QuartzComponentConstructor<Options> = (opts?: Options) => {
  const SignatureComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const text = opts?.text ?? ""
    return (
      <div className={classNames(displayClass, "signature")}>
        <p>{text}</p>
      </div>
    )
  }
  return SignatureComponent
}

export default Signature