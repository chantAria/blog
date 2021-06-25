import { Menu } from 'antd'
import Head from 'next/head'
import Test from '../components/Test'

export default function Home() {
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <div>
        <Test src='screen.jpg'>
          <div data-depth='0.3' className='nav'>
            <Menu>
              <Menu.Item>首页</Menu.Item>
              <Menu.Item>分类</Menu.Item>
              <Menu.Item>关于</Menu.Item>
            </Menu>
          </div>
        </Test>
      </div>
      <style jsx>{`
        .nav {
          position: absolute;
          left: 10px;
        }
      `}</style>
    </>
  )
}
