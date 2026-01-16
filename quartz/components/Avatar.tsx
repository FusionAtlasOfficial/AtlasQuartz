import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// 1. 引入必要的工具函数：resolveRelative (处理链接), joinSegments, pathToRoot (处理资源路径)
import { FullSlug, resolveRelative, joinSegments, pathToRoot } from "../util/path"

function Avatar({ fileData }: QuartzComponentProps) {
  // === 修复 1: 链接跳转问题 ===
  // 目标页面的 slug (注意：去掉开头的斜杠，保持纯净的路径)
  const targetSlug = "关于我-Myself/Fusion_Atlas" as FullSlug
  
  // 使用 resolveRelative 自动计算从“当前页面”到“目标页面”的正确路径
  // 这样无论是在首页还是子文件夹，或者在 GitHub Pages 子目录，链接永远正确
  const targetPath = resolveRelative(fileData.slug!, targetSlug)


  // === 修复 2: 图片显示问题 (上一轮提到的) ===
  const baseDir = pathToRoot(fileData.slug!)
  const imagePath = joinSegments(baseDir, "static/avatar.png")

  return (
    <div class="avatar-container">
      {/* href 使用计算后的 targetPath，src 使用计算后的 imagePath */}
      <a href={targetPath} aria-label="回到关于我">
        <img 
          src={imagePath} 
          alt="Avatar" 
          class="avatar-img" 
        />
      </a>
    </div>
  )
}

export default (() => Avatar) satisfies QuartzComponentConstructor