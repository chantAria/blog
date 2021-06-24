import Parallax from 'parallax-js'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'

//防抖函数
const debounce = (fn, delay) => {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

export default function Screen() {
  console.log('渲染')
  const [style, setStyle] = useState({}) //定义需要应用的style
  const ref = useRef() //获取img来得到宽高
  const onResize = () => {
    const size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
    const width = ref.current.width
    const height = ref.current.height
    let z
    if (width / size.width > height / size.height) {
      //竖屏
      z = height / size.height
    } else {
      //横屏
      z = width / size.width
    }
    console.log(width, height, z)
    setStyle({
      width: (width / z) * 1.2,
      height: (height / z) * 1.2,
      marginLeft: -0.08 * (width / z),
      marginTop: -0.08 * (height / z),
    })
  }
  const deb = debounce(onResize, 10)
  //刚加载时Parallax化
  useEffect(() => {
    const el = document.getElementById('parallax-box')
    new Parallax(el)
  }, [])
  //窗口尺寸变化监听
  useLayoutEffect(() => {
    window.addEventListener('resize', deb)
    onResize()
    return () => {
      window.removeEventListener('resize', deb)
    }
  }, [])

  return (
    <div>
      <div id='parallax-box' data-clip-relative-input>
        <img ref={ref} data-depth='0.6' src='screen.jpg' style={style}></img>
      </div>
      <div className='content'>111</div>
      <style jsx>{`
        #parallax-box {
          height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
          text-align: center;
        }
        .content {
          height: 300px;
        }
      `}</style>
    </div>
  )
}
