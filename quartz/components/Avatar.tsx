import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// 1. 引入 joinSegments 和 pathToRoot 这两个关键工具
import { FullSlug, joinSegments, pathToRoot } from "../util/path"

function Avatar({ fileData }: QuartzComponentProps) {
  // 设置跳转目标路径
  const targetPath = "/关于我-Myself/Fusion_Atlas" as FullSlug

  // === 核心修改逻辑开始 ===
  // 2. 计算当前页面(fileData.slug)距离“网站根目录”的相对路径
  //    如果在首页，baseDir 就是 "."
  //    如果在子目录，baseDir 就是 "../../" 这种形式
  const baseDir = pathToRoot(fileData.slug!)

  // 3. 动态拼接图片路径
  //    结果会自动变成 "./static/avatar.png" 或 "../../static/avatar.png"
  //    这种相对路径在 localhost 和 GitHub Pages 子目录都能完美工作
  const imagePath = joinSegments(baseDir, "static/avatar.png")
  // === 核心修改逻辑结束 ===

  return (
    <div class="avatar-container">
      <a href={targetPath} aria-label="回到关于我">
        <img 
          src={imagePath}   // 4. 这里使用动态计算出的路径
          alt="Avatar" 
          class="avatar-img" 
        />
      </a>
    </div>
  )
}

export default (() => Avatar) satisfies QuartzComponentConstructor