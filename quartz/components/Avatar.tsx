import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

function Avatar({ fileData }: QuartzComponentProps) {
  // 保持原有跳转逻辑不变
  const targetPath = "/关于我-Myself/Fusion_Atlas" as FullSlug

  return (
    <div class="avatar-container">
      <a href={targetPath} aria-label="回到关于我">
        {/* 修改说明：如果你的仓库名是 AtlasQuartz，路径应为 /AtlasQuartz/static/avatar.png */}
        <img 
          src="/AtlasQuartz/static/avatar.png" 
          alt="Avatar" 
          class="avatar-img" 
        />
      </a>
    </div>
  )
}

export default (() => Avatar) satisfies QuartzComponentConstructor