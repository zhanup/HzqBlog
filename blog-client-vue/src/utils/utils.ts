export const debounce = (fn: Function, t: number) => {
  let timeId: any = null
  const delay = t || 500
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}

// 滚动到顶部
export const scrollToTop = (): void => {
  document.body.scrollIntoView({ behavior: 'smooth' })
  if (document.body.scrollIntoView) {
    document.body.scrollIntoView({ behavior: 'smooth' })
  } else {
    let sTop = document.documentElement.scrollTop || document.body.scrollTop
    if (sTop > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, sTop - sTop / 8)
    }
  }
}

// 格式化时间
export const formatDate = (date: string | Date): string => {
  if (!date) return ''
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// export 