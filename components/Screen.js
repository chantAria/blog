import Parallax from 'parallax-js'
import { useEffect, useState, useRef, useCallback } from 'react'

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

export default function Screen({src}) {
  const [style, setStyle] = useState({}) //定义需要应用的style
  const ref = useRef() //获取img来得到宽高
  // 尺寸变化监听函数，设置新的style值
  const onResize = useCallback(() => {
    const size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
    const width = ref.current.width
    const height = ref.current.height
    let z
    let marginLeft = null
    if (width / size.width > height / size.height) {
      //竖屏
      z = height / size.height
      marginLeft = size.width / 2 - width / 2 
    } else {
      //横屏
      z = width / size.width
    }
    setStyle({
      width: (width / z) * 1.2,
      height: (height / z) * 1.2,
      marginLeft: marginLeft ? marginLeft : -0.08 * (width / z),
      marginTop: -0.08 * (height / z),
    })
  }, [])
  const deb = useCallback(debounce(onResize, 10),[])// 节流函数包裹的监听函数
  //刚加载时Parallax化
  useEffect(() => {
    const el = document.getElementById('parallax-box')
    new Parallax(el)
  }, [])
  //窗口尺寸变化监听
  useEffect(() => {
    window.addEventListener('resize', deb)
    onResize()
    return () => {
      window.removeEventListener('resize', deb)
    }
  }, [])

  return (
    <div>
      <div id='parallax-box' data-clip-relative-input>
        <img ref={ref} data-depth='0.6' src={src} style={style}></img>
        <div className='cover' data-depth='0'></div>
        <div className='test' data-depth='0.2'>111</div>
      </div>
      <style jsx>{`
        #parallax-box {
          height: 100vh;
          width: 100%;
          overflow: hidden;
          text-align: center;
        }
        .cover{
            
            width: 200px;
            height: 100px;
            background-color: red;
            -webkit-clip-path:polygon(
                0 0,
                50% 70%，
                60% 40%
            )
        }
        .test {
          font-size: 10rem;
        }
      `}</style>
    </div>
  )
}
