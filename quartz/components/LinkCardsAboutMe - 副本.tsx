import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// 定义卡片的数据结构
interface CardData {
  title: string
  link: string
  icon?: string | JSX.Element // 扩展类型，支持字符串(URL/Emoji)或直接嵌入 SVG
}

// 这里配置你的卡片内容
const cards: CardData[] = [
  {
    title: "Steam",
    link: "https://steamcommunity.com/profiles/76561198125375873/",
    // 直接粘贴 SVG 代码，注意将 fill 设置为 "currentColor" 以便随 CSS 变色
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <title>Steam</title>
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
      </svg>
    ),
  },
  {
    title: "Telegram",
    link: "https://t.me/Fusion_Atlas",
    icon: "https://simpleicons.org/icons/telegram.svg", // 保留图片链接形式作为对比
  },
  {
    title: "Bilibili",
    link: "https://space.bilibili.com/2811112",
    icon: "https://www.bilibili.com/favicon.ico",
  },
  {
    title: "Gmail",
    link: "mailto:atlaslzts@gmail.com",
    icon: "https://simpleicons.org/icons/gmail.svg",
  },
]

const LinkCardsAboutMe: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`,
    gap: '1rem',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  return (
    <>
      <div class={`link-cards-container ${displayClass ?? ""}`} style={gridStyle}>
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
            <a href={card.link} class="link-card" target="_blank" rel="noopener noreferrer">
              <div class="card-icon-wrapper">
                {renderIcon()}
              </div>
              <div class="card-content-wrapper">
                <h3>{card.title}</h3>
              </div>
            </a>
          );
        })}
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('nav', moveCards);
        window.addEventListener('load', moveCards);

        function moveCards() {
          const cards = document.querySelector('.link-cards-container');
          const placeholder = document.getElementById('link-cards-AboutMe-placeholder');
          if (cards && placeholder) {
            placeholder.appendChild(cards);
            cards.style.display = 'grid'; 
          }
        }
      `}}></script>
    </>
  )
}

LinkCardsAboutMe.css = `
/* 卡片外层容器 */
.link-cards-container {
  box-sizing: border-box; /* 确保内边距不影响容器总宽度 */
}

/* 单个卡片样式 */
.link-card {
  display: flex !important;
  flex-direction: column !important; /* 纵向排列：图标在上，文字在下 */
  align-items: center;              /* 水平居中 */
  justify-content: center;           /* 垂直居中 */
  padding: 1.5rem 1rem;              /* 上下 1.5rem，左右 1rem */
  border-radius: 12px;               /* 圆角处理 */
  text-decoration: none !important;  /* 移除链接默认下划线 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* 平滑过渡动画，使用贝塞尔曲线增强动感 */
  border: 1px solid var(--lightgray); /* 使用 Quartz 主题定义的浅灰色边框 */
  background: var(--highlight);       /* 使用 Quartz 主题定义的高亮背景色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 基础阴影 */
  text-align: center;                /* 文字居中 */
}

/* 卡片悬停 (Hover) 状态 */
.link-card:hover {
  transform: translateY(-5px);       /* 悬停时向上轻微浮动 5px */
  background: rgba(255, 255, 255, 0.05); /* 悬停时背景色略微变亮 */
  border-color: var(--tertiary);      /* 边框颜色变为主题的第三主色 */
  box-shadow: 0 8px 15px var(--highlight); /* 增强阴影，产生发光感 */
}

/* 图标容器样式 */
.card-icon-wrapper {
  margin-bottom: 0.8rem;             /* 图标与标题之间的间距 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.03); /* 图标背景微弱的高亮 */
  border-radius: 50%;                 /* 设为圆形背景 */
  transition: all 0.3s ease;          /* 动画支持 */
  color: var(--secondary);           /* 设置 SVG 的初始填充颜色 */
}

/* 针对嵌入式 SVG 的样式 */
.card-icon-wrapper svg {
  width: 30px;
  height: 30px;
  fill: currentColor;                /* 关键：使 SVG 填充颜色继承父级的 color 属性 */
  transition: fill 0.3s ease;
}

/* 图片图标样式 (当 icon 为 URL 时) */
.card-icon-wrapper img {
  width: 32px;                        /* 限制图标宽度 */
  height: 32px;                       /* 限制图标高度 */
  object-fit: contain;                /* 保持图片比例 */
}

/* 文本/Emoji 图标样式 */
.card-icon-wrapper span {
  font-size: 2rem;                    /* 增大 Emoji 尺寸 */
}

/* 悬停时图标的变化：旋转、放大并变色 */
.link-card:hover .card-icon-wrapper {
  transform: rotate(5deg) scale(1.1);
  color: var(--tertiary);            /* 悬停时，SVG 图标会随之变为高亮色 */
}

/* 标题样式 */
.card-content-wrapper h3 {
  margin: 0 !important;              /* 移除 Quartz 默认的 h3 边距 */
  font-size: 1rem !important;        /* 设置合适的字号 */
  font-weight: 600;                  /* 加粗字体 */
  color: var(--secondary);           /* 使用主题的第二文本色 */
  transition: color 0.3s ease;       /* 颜色切换过渡 */
}

/* 悬停时标题颜色变化 */
.link-card:hover .card-content-wrapper h3 {
  color: var(--tertiary);            /* 悬停时标题变为高亮色 */
}

/* 移动端/响应式适配 */
@media (max-width: 600px) {
  .link-cards-container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
`

export default (() => LinkCardsAboutMe) satisfies QuartzComponentConstructor