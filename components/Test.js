// {
//   src: imgSrc,
//   children.data-depth: data-depth
// }
import Parallax from 'parallax-js'
import { useEffect, useState, useRef, useCallback } from 'react'

const useWinSize = () => {
  console.log('winSize:in')
  const [size, setSize] = useState()
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
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  const deb = useCallback(debounce(onResize, 10), []) // 节流函数包裹的监听函数
  useEffect(() => {
    console.log('winSize-effect:in')
    setSize(
      {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
      console.log('winSize-effect-setState:ok')
    )
    window.addEventListener('resize', deb)
    console.log('winSize-effect:out')
    return () => {
      window.removeEventListener('resize', deb)
    }
  }, [])
  console.log('winSize:out')
  return size
}

function FlexPic(props) {
  console.log('main:in')
  const size = useWinSize()
  const [style, setStyle] = useState({}) //定义需要应用的style
  const ref = useRef() //获取img来得到宽高
  // 尺寸变化监听函数，设置新的style值
  const resize = useCallback(() => {
    console.log('main-resize:in')
    if (size === undefined) {
      setStyle({
        width: '100px',
        height: '100px',
        marginTop: '100px',
        marginLeft: '100px',
      })
      console.log('main-resize:out')
      return
    }
    const width = ref.current.width
    const height = ref.current.height
    let style
    const zoom = 1.15
    if (width / size.width > height / size.height) {
      //竖屏
      const z = height / size.height
      style = {
        width: (width / z) * zoom,
        height: (height / z) * zoom,
        marginTop: size.height / 2 - (height / z / 2) * zoom,
        marginLeft: size.width / 2 - (width / z / 2) * zoom,
      }
    } else {
      //横屏
      const z = width / size.width
      style = {
        width: (width / z) * zoom,
        height: (height / z) * zoom,
        marginTop: size.height / 2 - (height / z / 2) * zoom,
        marginLeft: size.width / 2 - (width / z / 2) * zoom,
      }
    }
    setStyle(style)
    console.log('main-resize:out')
  })

  //刚加载时Parallax化
  useEffect(() => {
    const el = document.getElementById('parallax-box')
    new Parallax(el)
  }, [])
  //窗口尺寸变化监听
  useEffect(() => {
    console.log('main-effect:in')
    resize()
    console.log('main-effect:out')
  }, [size])
  console.log('main:out')
  return (
    <div>
      <div id='parallax-box' data-clip-relative-input>
        <img ref={ref} data-depth='0.6' src={props.src} style={style}></img>
        {Object.prototype.toString.call(props.children) ===
        '[object Undefined]' ? (
          ''
        ) : Object.prototype.toString.call(props.children) ===
          '[object Array]' ? (
          props.children.map((el) => (
            <div data-depth={el.props['data-depth']} className='parallax-item'>
              {el}
            </div>
          ))
        ) : (
          <div
            data-depth={props.children.props['data-depth']}
            className='parallax-item'
          >
            {props.children}
          </div>
        )}
      </div>
      <style jsx>{`
        #parallax-box {
          height: 100vh;
          width: 100%;
          overflow: hidden;
          position: absolute;
        }
        .parallax-item {
          width: 100%;
          height: 100vh;
        }
      `}</style>
    </div>
  )
}

export default FlexPic
