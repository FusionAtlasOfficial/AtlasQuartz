import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

function Avatar({ fileData }: QuartzComponentProps) {
  // 设置你想要跳转的目标路径
  // 注意：这里使用相对根目录的路径，通常不带 .md 后缀
  const targetPath = "/关于我-Myself/Fusion_Atlas" as FullSlug

  return (
    <div class="avatar-container">
      <a href={targetPath} aria-label="回到关于我">
        <img 
          src="/static/avatar.png" 
          alt="Avatar" 
          class="avatar-img" 
        />
      </a>
    </div>
  )
}

export default (() => Avatar) satisfies QuartzComponentConstructor