import Parallax from 'parallax-js'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import React, { Component } from 'react'
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

export default class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {},
      size: {},
    }
    this.ref = React.createRef()
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    const el = document.getElementById('parallax-box')
    new Parallax(el)
    const size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
    const width = this.ref.current.width
    const height = this.ref.current.height
    let z
    width / size.width > height / size.height
      ? (z = height / size.height)
      : (z = width / size.width)
    console.log(width, height, z)
    const style = {
      width: (width / z) * 1.2,
      height: (height / z) * 1.2,
      marginLeft: -0.1 * width,
      marginTop: -0.1 * height,
    }
    this.setState({
      size,
      style,
    })
  }

  componentWillUpdate() {
    window.removeEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    })
  }

  render() {
    return (
      <div>
        <div id='parallax-box' data-clip-relative-input>
          <img
            ref={this.ref}
            data-depth='0.6'
            src='screen.jpg'
            style={this.state.style}
          ></img>
        </div>
        <div className='content'>111</div>
        <style jsx>{`
          #parallax-box {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            position: relative;
          }
          img {
            position: absolute;
            left: 50%;
            top: 50%;
          }
          .content {
            height: 300px;
          }
        `}</style>
      </div>
    )
  }
}
