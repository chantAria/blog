import { Menu, Row, Col } from 'antd'
import FlexPic from '../components/FlexPic'

export default function Home() {
  return (
    <div className='root'>
      <FlexPic src='screen.jpg'></FlexPic>
      <Row justify='end' className='nav'>
        <Col xs={18} sm={12} md={10} lg={8} xl={7} xxl={6}>
          <Menu mode='horizontal' className='menu'>
            <Menu.Item>首页</Menu.Item>
            <Menu.Item>分类</Menu.Item>
            <Menu.Item>关于</Menu.Item>
          </Menu>
        </Col>
      </Row>
      <style jsx global>{`
        .root {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .nav {
          margin-top: 10vh;
        }
        .menu {
          background-color: rgba(0, 0, 0, 0);
          border-bottom: 0;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  )
}
