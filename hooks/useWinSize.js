import { useCallback, useState, useEffect } from 'react'

export default function useWinSize() {
  const [size, setSize] = useState({
    width: '0px',
    height: '0px',
  })
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
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  const deb = useCallback(debounce(onResize, 10), []) // 节流函数包裹的监听函数
  useEffect(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
    window.addEventListener('resize', deb)
    return () => {
      window.removeEventListener('resize', deb)
    }
  }, [])
  return size
}
