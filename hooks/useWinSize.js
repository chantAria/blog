import { useCallback, useState, useEffect } from 'react'

export default function useWinSize() {
  //获取窗口尺寸的hook,检测窗口size变化
  const [size, setSize] = useState({})
  //防抖函数
  const debounce = useCallback((fn, delay) => {
    let timer = null
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay)
    }
  }, [])
  //第一个参数为声明的函数,即防抖函数的返回值
  const onResize = useCallback(
    debounce(() => {
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      })
    }, 100),
    []
  )
  useEffect(() => {
    window.addEventListener('resize', onResize)
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return size
}
