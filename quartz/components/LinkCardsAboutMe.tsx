import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// 定义卡片的数据结构
interface CardData {
  title: string
  link: string
  icon?: string | JSX.Element | any  // 扩展类型，支持字符串(URL/Emoji)或直接嵌入 SVG}
}

// 这里配置你的卡片内容
const cards: CardData[] = [
  {
    title: "Steam",
    link: "https://steamcommunity.com/profiles/76561198125375873/",
    // 直接粘贴 SVG 代码，注意将 fill 设置为 "currentColor" 以便随 CSS 变色
    // SVG 代码来源：https://simpleicons.org
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Steam</title><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>
    ),
  },
  {
    title: "Telegram",
    link: "https://t.me/Fusion_Atlas",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      ),
  },
  {
    title: "bilibili",
    link: "https://space.bilibili.com/2811112",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bilibili</title><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/></svg>
      ),
  },
  {
    title: "Gmail",
    link: "mailto:atlaslzts@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
      ),  
  },
]

const LinkCardsAboutMe: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const gridStyle = {
    display: 'grid',
    // 自动适应列数，单列最小 120px，最大 1fr
    gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`,
    justifyContent: 'center', // 当卡片数量较少或宽度达到上限时，使整个网格在容器中居中
    gap: '1rem',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  return (
    <>
      <div class={`link-cards-aboutme-container ${displayClass ?? ""}`} style={gridStyle}>
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
            <a href={card.link} class="link-card-aboutme" target="_blank" rel="noopener noreferrer">
              <div class="card-icon-wrapper-aboutme">
                {renderIcon()}
              </div>
              <div class="card-content-wrapper-aboutme">
                <h3>{card.title}</h3>
              </div>
            </a>
          );
        })}
      </div>

      {/* 搬运脚本：将 display 强制设为 grid 以防止 JS 覆盖样式 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('nav', moveCards);
        window.addEventListener('load', moveCards);

        function moveCards() {
          const cards = document.querySelector('.link-cards-aboutme-container');
          const placeholder = document.getElementById('link-cards-AboutMe-placeholder');
          
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
LinkCardsAboutMe.css = `
/* 卡片外层容器 */
.link-cards-aboutme-container {
  box-sizing: border-box; /* 确保内边距不影响容器总宽度 */
  margin: 0 auto;         /* 容器自身在父元素中居中 */
}

/* 单个卡片样式 */
.link-card-aboutme {
  display: flex !important;
  flex-direction: column !important; /* 纵向排列：图标在上，文字在下 */
  align-items: center;              /* 水平居中 */
  justify-content: center;           /* 垂直居中 */
  padding: 1.5rem 1rem;              /* 上下 1.5rem，左右 1rem */
  border-radius: 12px;               /* 圆角处理 */
  text-decoration: none !important;  /* 移除链接默认下划线 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* 平滑过渡动画，使用贝塞尔曲线增强动感 */
  border-color: var(--lightgray);    /*阴影*/
  background: var(--highlight);       /* 使用 Quartz 主题定义的高亮背景色 */
  text-align: center;                /* 文字居中 */
}

/* 卡片悬停 (Hover) 状态 */
.link-card-aboutme:hover {
  transform: translateY(-5px);       /* 悬停时向上轻微浮动 5px */
  background: rgba(255, 255, 255, 0.05); /* 悬停时背景色略微变亮 */
  box-shadow: 0 0 5px var(--tertiary);      /* 边框颜色变为主题的第三主色 */
}

/* 图标容器样式 */
.card-icon-wrapper-aboutme {
  margin-bottom: 0.8rem;             /* 图标与标题之间的间距 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1); /* 图标背景微弱的高亮 */
  border-radius: 20%;                 /* 设为圆角背景 */
  transition: all 0.3s ease;          /* 动画支持 */
  color: var(--darkgray);           /* 设置 SVG 的初始填充颜色 */
  margin: 0 0 1rem 0; /* 外边距 */

}

/* 针对嵌入式 SVG 的样式 */
.card-icon-wrapper-aboutme svg {
  width: 60px;
  height: 60px;
  fill: currentColor;                /* 关键：使 SVG 填充颜色继承父级的 color 属性 */
  transition: fill 0.3s ease;
}

/* 图片图标样式 (当 icon 为 URL 时) */
.card-icon-wrapper-aboutme img {
  width: 32px;                        /* 限制图标宽度 */
  height: 32px;                       /* 限制图标高度 */
  object-fit: contain;                /* 保持图片比例 */
}

/* 文本/Emoji 图标样式 */
.card-icon-wrapper-aboutme span {
  font-size: 2rem;                    /* 增大 Emoji 尺寸 */
}

/* 悬停时图标的变化：旋转、放大并变色 */
.link-card-aboutme:hover .card-icon-wrapper-aboutme {
  transform: rotate(360deg) scale(1.1);
  color: var(--tertiary);            /* 悬停时，SVG 图标会随之变为高亮色 */
}

/* 标题样式 */
.card-content-wrapper-aboutme h3 {
  margin: 0 !important;              /* 移除 Quartz 默认的 h3 边距 */
  font-size: 1rem !important;        /* 设置合适的字号 */
  font-weight: 600;                  /* 加粗字体 */
  color: var(--secondary);           /* 使用主题的第二文本色 */
  transition: color 0.3s ease;       /* 颜色切换过渡 */
}

/* 悬停时标题颜色变化 */
.link-card-aboutme:hover .card-content-wrapper-aboutme h3 {
  color: var(--tertiary);            /* 悬停时标题变为高亮色 */
}

/* 移动端/响应式适配 */
@media (max-width: 1630px) {
  .link-cards-aboutme-container {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

@media (max-width: 800px) {
  .link-cards-aboutme-container {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 0.8rem;
  }
}

@media (max-width: 600px) {
  .link-cards-aboutme-container {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.8rem;
  }
}

`

export default (() => LinkCardsAboutMe) satisfies QuartzComponentConstructor