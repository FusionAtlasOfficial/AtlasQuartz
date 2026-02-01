import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// 定义卡片的数据结构
interface CardData {
  title: string
  desc: string
  link: string
  icon?: string // 支持 emoji 或图片链接
}

// 这里配置你的卡片内容
const cards: CardData[] = [
  {
    title: "正式发布",
    desc: "完整版\n成体系的内容",
    link: "/正式发布页",
    icon: "🚀",
  },
  {
    title: "笔记杂项",
    desc: "好记性\n不如烂服务器",
    link: "/笔记杂项页",
    icon: "✍️",
  },
  {
    title: "关于我",
    desc: "正经人\n谁写日记啊",
    link: "关于我-AboutMe",
    icon: "👨‍💻",
  },
  {
    title: "GitHub",
    desc: "源代码\n欢迎交流反馈",
    link: "https://github.com/FusionAtlasOfficial/AtlasQuartz",
    icon: "🐙",
  },
]

const LinkCardsHome: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const gridStyle = {
    display: 'grid',
// 使用${cards.length}动态计算 Grid 列数，如果有 4 张卡片，就分成 4 列 (1fr 1fr 1fr 1fr)
// 若想将N个卡片显示到同一页：gridTemplateColumns写为：`repeat(${cards.length}, 1fr)`,
    gridTemplateColumns: `repeat(${cards.length}, 1fr)`,
    gap: '1rem',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  return (
    <>
      <div class={`link-cards-container ${displayClass ?? ""}`} style={gridStyle}>
        {cards.map((card) => (
          <a href={card.link} class="link-card">
          {/* 左侧图标区域 */}
          <div class="card-icon-wrapper">{card.icon}</div>
          
          {/* 右侧文字区域 */}
          <div class="card-content-wrapper">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
          
          {/* 装饰箭头 */}
          <div class="card-arrow">→</div>
        </a>
        ))}
      </div>

      {/* 搬运脚本：将 display 强制设为 grid 以防止 JS 覆盖样式 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('nav', moveCards);
        window.addEventListener('load', moveCards);

        function moveCards() {
          const cards = document.querySelector('.link-cards-container');
          const placeholder = document.getElementById('link-cards-Home-placeholder');
          
          if (cards && placeholder) {
            placeholder.appendChild(cards);
            // 搬运后强制确保 Grid 布局不丢失
            cards.style.display = 'grid'; 
          }
        }
      `}}></script>
    </>
  )
}

// 这里的 CSS 现在的核心任务是调用 quartz.config.ts 定义的变量
LinkCardsHome.css = `
.link-cards-container {
}

.link-card {
  display: flex !important;
  flex-direction: row !important; /* 水平排列：图标在左，文字在右 */
  align-items: center;
  padding: 1.2rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--lightgray);
  position: relative;
  overflow: hidden;
  min-width: 0; 

  /* 配色适配 Cyber Atlantis */
  background: var(--highlight); /* 使用高亮背景色，带透明度 */
  border: 1px solid var(--lightgray); /* 使用主题定义的边框色 (深蓝色) */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 悬停动画效果 */
.link-card:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.05); /* 悬停时的背景色 */
  border-color: var(--tertiary); 
  box-shadow: 0 0 5px var(--tertiary);
}

.card-icon-wrapper {
  font-size: 2.2rem;
  margin-right: 1.2rem;
  flex-shrink: 0; /* 防止图标被压缩 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.card-content-wrapper {
  flex-grow: 1;
  min-width: 0;
}

.card-content-wrapper h3 {
  margin: 0 0 0.2rem 0 !important;
  font-size: 1.05rem !important;
  font-weight: 700;
  color: var(--secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-card:hover .card-content-wrapper h3 {
  color: var(--tertiary); /* 悬停变为橙色，增加互动感 */
}

.card-content-wrapper p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--darkgray);
  opacity: 0.8;
  line-height: 1.3;
  overflow: hidden;
  white-space: pre-line; /* 允许手动换行并保留换行符 */
  display: block;
}

.card-arrow {
  bottom: 1.5rem;
  right: 1.5rem;
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: var(--tertiary); /* 箭头使用橙色 */
}

.link-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* 移动端响应式：屏幕小于 1630px 时强制变为两列，小于 800px 变为一列 */
@media (max-width: 1630px) {
  .link-cards-container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 800px) {
  .link-cards-container {
    grid-template-columns: 1fr !important;
    gap: 0.8rem;
  }
}

`

export default (() => LinkCardsHome) satisfies QuartzComponentConstructor