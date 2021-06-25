// {
//   src: imgSrc,
//   children.data-depth: data-depth
// }
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

function Screen(props) {
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
    let style
    const zoom = 1.2
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
  }, [])
  const deb = useCallback(debounce(onResize, 10), []) // 节流函数包裹的监听函数
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
  console.log(Object.prototype.toString.call(props.children))
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
            id='a'
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
          text-align: center;
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

export default Screen
