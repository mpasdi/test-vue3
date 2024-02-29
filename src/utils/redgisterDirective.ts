import { App } from 'vue'

// 图片懒加载指令
const imageLazyLoad = (el, binding) => {
  const options = {}
  const intersectionObserver = new IntersectionObserver(callBack, options)
  intersectionObserver.observe(el)

  function callBack(mutationList: Array<IntersectionObserverEntry>) {
    mutationList.forEach((mutation) => {
      if (mutation.isIntersecting) {
        //   这个setTimeout是为了模式懒加载效果
        setTimeout(() => {
          el.setAttribute('src', binding.value)
          el.setAttribute('style', 'visibility: visible')
          intersectionObserver.unobserve(el)
        }, 200)
      } else {
        el.setAttribute('style', 'visibility: hidden')
      }
    })
  }
}
export const registerDirective = {
  install(app: App) {
    app.directive('imageLazyLoad', imageLazyLoad)
  }
}
