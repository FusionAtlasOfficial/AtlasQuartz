import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// 定义卡片的数据结构
interface CardData {
  title: string
  desc: string
  link: string
  icon?: string | JSX.Element | any  // 扩展类型，支持字符串(URL/Emoji)或直接嵌入 SVG}
}

// 这里配置你的卡片内容
const cards: CardData[] = [
  {
    title: "2026安卓救砖/刷机/备份入门知识超级汇总 & 小米12Pro刷机笔记",
    desc: "前后总耗时近一个月，最终全文近四万字，算是笔者竭尽所能追求详尽完整而写的刷机教程汇总文，不敢说多么深刻全面，但至少力求准确，同时尽可能提高可读性。",
    link: "安卓刷机-Android/",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Android</title><path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z"/></svg>
    ),
  },
  {
    title: "如何搞一个自己的网站？（其实是网站开发日志页 🤪）",
    desc: "绝大多数人对网站构建的完整流程没有太多概念，那我在做简单科普的同时，也是为自己梳理思路，何乐而不为？",
    link: "网站开发日志",
    icon: "🧐",
  },
  {
    title: "为什么要搞一个自己的网站？（其实是首页 🤪）",
    desc: "首页当然也算！哔哔了不少字儿呢！才不是为了能多占一个位置显得没那么空......",
    link: "./",
    icon: "🤔",
  },
  {
    title: "筹备中...",
    desc: "To be continued...... 😋",
    link: "笔记杂项页",
    icon: "⏳️",
  },
  {
    title: "筹备中...",
    desc: "To be continued...... 😋",
    link: "笔记杂项页",
    icon: "⏳️",
  },
]

const LinkCardsOfficially: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const gridStyle = {
    display: 'grid',
// 使用${cards.length}动态计算 Grid 列数，如果有 4 张卡片，就分成 4 列 (1fr 1fr 1fr 1fr)
// 若想将N个卡片显示到同一页：gridTemplateColumns写为：`repeat(${cards.length}, 1fr)`,
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: '1rem',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  return (
    <>
      <div class={`link-cards-officially-container ${displayClass ?? ""}`} style={gridStyle}>
      {cards.map((card) => {
          // 判断 icon 的渲染逻辑
          const renderIcon = () => {
            if (typeof card.icon === 'string') {
              if (card.icon.startsWith('http') || card.icon.startsWith('/')) {
                return <img src={card.icon} alt={card.title} loading="lazy" />;
              }
              return <span>{card.icon}</span>;
            }
            return card.icon; // 如果是 JSX (SVG)，直接渲染
          };

          return (
          <a href={card.link} class="link-card-officially">
          {/* 左侧图标区域 */}
          <div class="card-icon-wrapper-officially">{renderIcon()}</div>
          
          {/* 右侧文字区域 */}
          <div class="card-content-wrapper-officially">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
          
          {/* 装饰箭头 */}
          <div class="card-arrow">→</div>
        </a>
          );
        })}
      </div>

      {/* 搬运脚本：将 display 强制设为 grid 以防止 JS 覆盖样式 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('nav', moveCards);
        window.addEventListener('load', moveCards);

        function moveCards() {
          const cards = document.querySelector('.link-cards-officially-container');
          const placeholder = document.getElementById('link-cards-Officially-placeholder');
          
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
LinkCardsOfficially.css = `
.link-cards-officially-container {
}

.link-card-officially {
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
.link-card-officially:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.05); /* 悬停时的背景色 */
  border-color: var(--tertiary); 
  box-shadow: 0 0 5px var(--tertiary);
}

.card-icon-wrapper-officially {
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

/* 针对嵌入式 SVG 的样式 */
.card-icon-wrapper-officially svg {
  width: 35px;
  height: 35px;
  fill: currentColor;                /* 关键：使 SVG 填充颜色继承父级的 color 属性 */
  transition: fill 0.3s ease;
}

/* 图片图标样式 (当 icon 为 URL 时) */
.card-icon-wrapper-officially img {
  width: 40px;                        /* 限制图标宽度 */
  height: 40px;                       /* 限制图标高度 */
  object-fit: contain;                /* 保持图片比例 */
}

/* 文本/Emoji 图标样式 */
.card-icon-wrapper-officially span {
  font-size: 2rem;                    /* 增大 Emoji 尺寸 */
}

.card-content-wrapper-officially {
  flex-grow: 1;
  min-width: 0;
}

.card-content-wrapper-officially h3 {
  margin: 0 0 0.2rem 0 !important;
  font-size: 1.05rem !important;
  font-weight: 700;
  color: var(--secondary);
  white-space: pre-line; /* 允许手动换行并保留换行符 */
  word-break: break-word;     /* 确保长单词或中英文混合时能断行 */
  overflow: hidden;
}

.link-card-officially:hover .card-content-wrapper-officially h3 {
  color: var(--tertiary); /* 悬停变为橙色，增加互动感 */
}

.card-content-wrapper-officially p {
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

.link-card-officially:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* 移动端响应式：保证任何时候都是1列 */
@media (max-width: 1630px) {
  .link-cards-officially-container {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}

@media (max-width: 800px) {
  .link-cards-officially-container {
    grid-template-columns: 1fr !important;
    gap: 0.8rem;
  }
}

`

export default (() => LinkCardsOfficially) satisfies QuartzComponentConstructor