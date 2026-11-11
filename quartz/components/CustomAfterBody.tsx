// quartz/components/CustomAfterBody.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const CustomAfterBody: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    // 检查是否为私密文件夹路径
    const isPrivate = fileData.slug?.startsWith("AtlasPrivate/")

    // 根据路径分配对应的签名文本
    const signatureText = isPrivate
      ? "本文为内部私密文档，未经授权请勿传播。\nFusion Atlas Private Workspace © 2026."
      : "本站可随意转载，但请注明出处。\nFusion Atlas © 2026. All Rights Reserved.   "

    return (
      <div 
        class="secondary-text" 
        style="text-align: right; font-style: italic; white-space: pre-line;"
      >
        {signatureText}
      </div>
    )
  }

  return CustomAfterBody
}) satisfies QuartzComponentConstructor