import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments } from "../util/path"

const Avatar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`avatar ${displayClass ?? ""}`} style={{ 
      display: "flex", 
      justifyContent: "center", // 水平居中
      width: "100%"            // 占据侧边栏全部宽度
    }}>
      <img 
        src="/static/avatar.png" 
        alt="Avatar" 
        style={{
          width: "150px",      // 头像宽度
          height: "150px",     // 头像高度
          borderRadius: "70%", // 圆形头像
          objectFit: "cover",
          marginBottom: "1rem"
        }} 
      />
    </div>
  )
}

export default (() => Avatar) satisfies QuartzComponentConstructor