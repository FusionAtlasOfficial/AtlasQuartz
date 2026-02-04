import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// 定义卡片的数据结构
interface CardData {
  title: string
  link?: string     // 链接变为可选
  icon?: string | JSX.Element | any  // 扩展类型，支持字符串(URL/Emoji)或直接嵌入 SVG}
  isModal?: boolean // 是否为弹窗模式
  qrCode?: string   // 弹窗显示的图片路径
  customClass?: string // 用于单独控制样式的类名
}

// 这里配置你的卡片内容
const cards: CardData[] = [
  {
    title: "Steam",
    link: "https://steamcommunity.com/profiles/76561198125375873/",
    // 直接粘贴 SVG 代码，注意将 fill 设置为 "currentColor" 以便随 CSS 变色
    // SVG 代码来源：https://simpleicons.org https://remixicon.com/
    customClass: "Steam-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Steam</title><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>
    ),
  },
  {
    title: "Telegram",
    link: "https://t.me/Fusion_Atlas",
    customClass: "Telegram-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      ),
  },
  {
    title: "bilibili",
    link: "https://space.bilibili.com/2811112",
    customClass: "bilibili-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bilibili</title><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/></svg>
      ),
  },
  {
    title: "GitHub",
    link: "https://github.com/FusionAtlasOfficial",
    customClass: "GitHub-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      ),  
  },
  {
    title: "Gmail邮箱",
    link: "mailto:atlaslzts@gmail.com",
    customClass: "Gmail-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
      ),  
  },
  {
    title: "知乎",
    link: "https://www.zhihu.com/people/liu-yang-43-99",
    customClass: "zhihu-card", // 注入自定义类名
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.3735 18.8965L14.8258 18.8969L15.3039 20.5335L17.9085 18.8969H20.9792V5.39468H13.3735V18.8965ZM14.9191 6.8605H19.4338V17.4311H17.7018L15.9722 18.5181L15.6573 17.4337L14.9193 17.4313V6.8607L14.9191 6.8605ZM12.0895 11.5728H8.84563C8.95376 9.89106 8.98193 8.37101 8.98193 7.01344H12.1538C12.1538 7.01344 12.2758 5.61316 11.622 5.62905H6.13529C6.35155 4.81471 6.62335 3.97414 6.94873 3.10498C6.94873 3.10498 5.45617 3.10498 4.94787 4.44368C4.73756 4.99585 4.12887 7.12109 3.04481 9.29202C3.40987 9.25229 4.61753 9.21853 5.32879 7.91359C5.45974 7.54813 5.48454 7.50046 5.64723 7.01185H7.43679C7.43679 7.66333 7.36259 11.163 7.33244 11.5702H4.09237C3.36424 11.5702 3.12755 13.036 3.12755 13.036H7.19336C6.92056 16.1307 5.45637 18.7386 2.80078 20.8003C4.07114 21.1634 5.33713 20.7427 5.96268 20.1858C5.96268 20.1858 7.38759 18.8888 8.16889 15.8876L11.5145 19.9184C11.5145 19.9184 12.0052 18.2496 11.4375 17.4365C10.9673 16.8827 9.69796 15.3847 9.15672 14.8417L8.25004 15.5621C8.52045 14.6945 8.68314 13.8519 8.7381 13.0376H12.5601C12.5601 13.0376 12.5547 11.5718 12.0895 11.5718V11.5728Z"></path></svg>
      ),  
  },
  {
    title: "豆瓣",
    link: "https://www.douban.com/people/144945774/?_i=00933693NUk2jF",
    customClass: "douban-card", // 注入自定义类名
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.3143 19.1379H20.3793C20.7221 19.1379 21 19.4158 21 19.7586V20.3793C21 20.7221 20.7221 21 20.3793 21H3.62069C3.27789 21 3 20.7221 3 20.3793V19.7586C3 19.4158 3.27789 19.1379 3.62069 19.1379H7.37438L6.41379 16.0345H8.60436C8.87152 16.0345 9.10871 16.2054 9.19319 16.4589L10.0862 19.1379H13.5988L14.8236 15.1034H5.17241C4.82962 15.1034 4.55172 14.8256 4.55172 14.4828V7.34483C4.55172 7.00203 4.82962 6.72414 5.17241 6.72414H18.8276C19.1704 6.72414 19.4483 7.00203 19.4483 7.34483V14.4828C19.4483 14.8256 19.1704 15.1034 18.8276 15.1034H17.5391L16.3143 19.1379ZM3.93103 3H20.069C20.4118 3 20.6897 3.27789 20.6897 3.62069V4.24138C20.6897 4.58418 20.4118 4.86207 20.069 4.86207H3.93103C3.58824 4.86207 3.31034 4.58418 3.31034 4.24138V3.62069C3.31034 3.27789 3.58824 3 3.93103 3ZM7.18966 8.58621C7.10396 8.58621 7.03448 8.65568 7.03448 8.74138V12.7759C7.03448 12.8616 7.10396 12.931 7.18966 12.931H16.8103C16.896 12.931 16.9655 12.8616 16.9655 12.7759V8.74138C16.9655 8.65568 16.896 8.58621 16.8103 8.58621H7.18966Z"></path></svg>
      ),  
  },
  {
    title: "网易云音乐",
    link: "https://music.163.com/#/user/home?id=80219564",
    customClass: "netease-cloud-music-card", // 注入自定义类名
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.4222 11.375C10.1278 12.4026 10.4341 13.4395 11.2058 14.0282C12.267 14.8376 13.7712 14.3289 14.0796 13.0331C14.1599 12.6958 14.1833 12.311 14.1067 11.9767C13.8775 10.9756 13.586 9.98862 13.3147 8.98094C11.9843 9.13543 10.7722 10.1533 10.4222 11.375ZM15.9698 11.0879C16.2427 12.1002 16.2553 13.1053 15.8435 14.0875C14.7148 16.7784 11.1215 17.2286 9.26951 14.9136C7.96829 13.2869 7.99065 10.953 9.32982 9.18031C10.1096 8.14796 11.1339 7.47322 12.3776 7.12595C12.5007 7.09159 12.6241 7.058 12.7566 7.02157C12.6731 6.60736 12.569 6.20612 12.5143 5.79828C12.3375 4.48137 13.026 3.29477 14.2582 2.7574C15.4836 2.22294 16.9661 2.54204 17.7889 3.51738C18.1936 3.99703 18.183 4.59854 17.7631 4.98218C17.3507 5.359 16.7665 5.32761 16.3276 4.89118C16.0809 4.64585 15.8185 4.45112 15.451 4.45569C14.9264 4.46223 14.4642 4.87382 14.5058 5.39329C14.5432 5.86105 14.6785 6.32376 14.8058 6.77892C14.8276 6.85679 15.0218 6.91415 15.1436 6.9321C16.4775 7.12862 17.6476 7.66332 18.6165 8.60769C21.1739 11.1006 21.4772 15.1394 19.2882 18.0482C17.7593 20.0797 15.6785 21.2165 13.1609 21.4567C8.53953 21.8977 4.49683 18.9278 3.46188 14.3992C2.5147 10.2551 4.8397 5.83074 8.79509 4.25032C9.38067 4.01635 9.93787 4.21869 10.1664 4.74827C10.3982 5.28546 10.147 5.83389 9.55552 6.09847C7.18759 7.15787 5.73935 8.9527 5.34076 11.5215C4.80806 14.9546 6.99662 18.2982 10.3416 19.2428C13.0644 20.0117 15.9994 19.0758 17.6494 16.9123C19.2354 14.8328 19.0484 11.8131 17.2221 10.0389C16.7172 9.54838 16.1246 9.21455 15.3988 9.02564C15.5974 9.74151 15.7879 10.4136 15.9698 11.0879Z"></path></svg>
      ),  
  },
  {
    title: "QQ",
    // 设置实际的二维码图片路径
    qrCode: "/static/QQ-qr.jpg", 
    isModal: true, 
    customClass: "QQ-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>QQ</title><path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673"/></svg>
      ),  
  },
  {
    title: "WeChat",
    // 设置实际的二维码图片路径
    qrCode: "/static/wechat-qr.png", 
    isModal: true, 
    customClass: "wechat-card", // 注入自定义类名
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WeChat</title><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>
      ),  
  },
]

const LinkCardsAboutMe: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const gridStyle = {
    display: 'grid',
    // 使用${cards.length}动态计算 Grid 列数，如果有 4 张卡片，就分成 4 列 (1fr 1fr 1fr 1fr)
    // 若想将N个卡片显示到同一页：gridTemplateColumns写为：`repeat(${cards.length}, 1fr)`,
    gridTemplateColumns: `repeat(5, 1fr)`,
    justifyContent: 'center', // 当卡片数量较少或宽度达到上限时，使整个网格在容器中居中
    gap: '1rem',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  // 渲染图标的辅助函数
  const renderIcon = (card: CardData) => {
    if (typeof card.icon === 'string') {
      if (card.icon.startsWith('http') || card.icon.startsWith('/')) {
        return <img src={card.icon} alt={card.title} loading="lazy" />;
      }
      return <span>{card.icon}</span>;
    }
    return card.icon; 
  };
  
  return (
    <>
      <div class={`link-cards-aboutme-container ${displayClass ?? ""}`} style={gridStyle}>
        {cards.map((card) => {
          const cardClass = `link-card-aboutme ${card.customClass ?? ""} ${card.isModal ? "popup-trigger" : ""}`;
          // 3. 渲染逻辑：区分 Link 和 弹窗
          if (card.isModal) {
            return (
              <div 
                class={cardClass} 
                data-popup-img={card.qrCode}
                style={{ cursor: 'pointer' }}
              >
                <div class="card-icon-wrapper-aboutme">
                  {renderIcon(card)}
                </div>
                <div class="card-content-wrapper-aboutme">
                  <h3>{card.title}</h3>
                </div>
              </div>
            )
          }

          return (
            <a href={card.link} class={cardClass} target="_blank" rel="noopener noreferrer">
              <div class="card-icon-wrapper-aboutme">
                {renderIcon(card)}
              </div>
              <div class="card-content-wrapper-aboutme">
                <h3>{card.title}</h3>
              </div>
            </a>
          );
        })}
      </div>

      {/* 4. 模态框 HTML */}
      <div id="card-modal-overlay" class="card-modal-overlay" style="display: none;">
        <div class="card-modal-content">
          <span class="card-modal-close">&times;</span>
          <img id="card-modal-img" src="" alt="Popup" />
        </div>
      </div>

      {/* 5. 脚本：包含搬运逻辑 + 模态框逻辑 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('nav', initCards);
        window.addEventListener('load', initCards);

        function initCards() {
          const cards = document.querySelector('.link-cards-aboutme-container');
          const placeholder = document.getElementById('link-cards-AboutMe-placeholder');
          
          if (cards && placeholder) {
            placeholder.appendChild(cards);
            // 搬运后强制确保 Grid 布局不丢失
            cards.style.display = 'grid'; 
          }

          // 绑定点击事件 (使用事件委托，确保搬运后依然有效)
          // 避免重复绑定，先解绑
          document.removeEventListener('click', handleCardClick);
          document.addEventListener('click', handleCardClick);
        }

        function handleCardClick(e) {
          // 查找点击目标是否是弹窗触发器
          const trigger = e.target.closest('.popup-trigger');
          const overlay = document.getElementById('card-modal-overlay');
          const modalImg = document.getElementById('card-modal-img');

          // 打开逻辑
          if (trigger && overlay && modalImg) {
            const imgSrc = trigger.getAttribute('data-popup-img');
            if (imgSrc) {
              modalImg.src = imgSrc;
              overlay.style.display = 'flex';
              // 禁止背景滚动
              document.body.style.overflow = 'hidden';
            }
            return;
          }

          // 关闭逻辑 (点击遮罩层或关闭按钮)
          if (e.target.closest('.card-modal-close') || e.target === overlay) {
            if (overlay) {
              overlay.style.display = 'none';
              document.body.style.overflow = ''; // 恢复滚动
            }
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
  box-shadow: 0 0 2px var(--lightgray); /* 边框阴影默认为主题的深蓝色 */
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

/* --- 特殊：特定样式修改 --- */
.netease-cloud-music-card .card-icon-wrapper-aboutme svg {
  width: 70px; /* 图标宽 */
  height: 70px; /* 图标高 */
  color: var(--darkgray);  /* 初始填充颜色（等同默认，方便复制） */
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

/* --- 新增：模态框样式 --- */
.card-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* 深色半透明背景 */
  z-index: 9999; /* 确保在最顶层 */
  display: none; /* 默认隐藏 */
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px); /* 背景模糊效果 */
}

.card-modal-content {
  position: relative;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: modalFadeIn 0.3s;
}

.card-modal-content img {
  max-width: 100%;
  max-height: 80vh; /* 限制图片最大高度 */
  display: block;
  border-radius: 4px;
}

/* 关闭按钮 */
.card-modal-close {
  position: absolute;
  top: -40px;
  right: -40px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.card-modal-close:hover {
  color: var(--tertiary);
}

@keyframes modalFadeIn {
  from {opacity: 0; transform: scale(0.9);}
  to {opacity: 1; transform: scale(1);}
}

/* 移动端/响应式适配 */
@media (max-width: 1630px) {
  .link-cards-aboutme-container {
    grid-template-columns: repeat(5, 1fr) !important;
  }
}

@media (max-width: 1000px) {
  .link-cards-aboutme-container {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.8rem;
  }
}

`

export default (() => LinkCardsAboutMe) satisfies QuartzComponentConstructor