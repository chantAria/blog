//博客头部组件,即导航栏
import { Col, Row, Menu } from 'antd'
import React from 'react'
import { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'

export default function Header() {
  return (
    <div className='header'>
      <Row justify='center'>
        {/*24栅格下,sm以下占满,md以上占10格*/}
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <span className='header-logo'>张新宇</span>
          <span className='header-text'>这是个测试</span>
        </Col>
        <Col
          //24栅格下,sm以下不占空间,md以上分别占14,8,6格.后期会进行调整
          xs={0}
          sm={0}
          md={14}
          lg={8}
          xl={6}
        >
          <Menu mode='horizontal'>
            <Menu.Item key='home'>
              <HomeOutlined />
              首页
            </Menu.Item>
            <Menu.Item key='video'>
              <YoutubeOutlined />
              视频
            </Menu.Item>
            <Menu.Item key='life'>
              <HomeOutlined />
              生活
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <style jsx>{`
        .header {
          background-color: #fff;
          padding: 0.4rem;
          overflow: hidden;
          height: 2.8rem;
          border-bottom: 1px solid #ccc;
        }
        .header-logo {
          color: #1e90ff;
          font-size: 1.4rem;
        }
        .header-text {
          font-size: 0.6rem;
          color: #999;
          padding-left: 0.3rem;
        }
        :global(.ant-menu-horizontal) {
          height: 100%;
          vertical-align: middle;
        }
        :global(.ant-menu-item) {
          font-size: 0.7rem !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
      `}</style>
    </div>
  )
}
