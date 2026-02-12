import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const BackToTop: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button 
      class={classNames(displayClass, "back-to-top")} 
      id="back-to-top" 
      aria-label="回到顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  )
}

BackToTop.afterDOMLoaded = `
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    // 强制清理旧监听器，防止 SPA (单页应用) 路由跳转导致的多次绑定内存泄漏
    if (window.backToTopListener) {
      window.removeEventListener('scroll', window.backToTopListener);
    }
    
    window.backToTopListener = () => {
      if (window.scrollY > 250) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    };
    
    // 初始执行一次状态检查
    window.backToTopListener();
    
    window.addEventListener('scroll', window.backToTopListener);
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
`

BackToTop.css = `
.back-to-top {
  position: fixed;
  bottom: 1rem;
  right: 2.5rem;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  /* 延长 opacity, transform 和 visibility 动画至 0.5s，使出现/消失过程更平滑 */
  transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s ease, background-color 0.3s ease, color 0.3s ease;background-color: var(--secondary);
  color: var(--light);
  border: none;
  border-radius: 50%;
  width: 2.0rem;
  height: 2.0rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0px 10px var(--lightgray);
  /* 禁用移动端浏览器默认的半透明灰色点击高亮区块，交由自定义逻辑接管 */
  -webkit-tap-highlight-color: transparent;
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* * 硬件特性隔离逻辑 (Hardware Feature Isolation)
 * PC 端: 仅在支持精确指针 (鼠标) 且支持原生悬停的设备上触发 :hover 伪类
 */
@media (hover: hover) and (pointer: fine) {
  .back-to-top:hover {
    background-color: var(--tertiary);
    box-shadow: 0 0px 10px var(--tertiary);
  }
}

/* 页面大于 1200px 时的修正 */
@media all and (min-width: 1200px) {
  .back-to-top {
    right: 320px; 
  }
}

/* * 移动端: 针对粗略指针 (手指) 且不支持原生悬停的触摸设备
 * 使用 :active 替代 :hover，手指离开屏幕后样式会立即复原，消除“粘滞”感
 */
@media (hover: none) and (pointer: coarse) {
  .back-to-top:active {
    background-color: var(--tertiary);
    color: var(--darkgray);
    /* 增加轻微缩放作为触觉/视觉补偿 */
    transform: scale(0.9);
    /* 延长 :active 的按下动画至 0.2s，减缓突兀感 */
    transition: transform 0.2s ease, background-color 0.2s ease;
  }
}

/* 移动端缩小边距 */
@media all and (max-width: 600px) {
  .back-to-top {
    bottom: 2rem;
    right: 1.5rem;
    width: 2.8rem;
    height: 2.8rem;
  }
}

`

export default (() => BackToTop) satisfies QuartzComponentConstructor