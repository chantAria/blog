import Head from 'next/head'
import BlogList from '../components/Index/BlogList'
import FirstScreen from '../components/Index/FirstScreen'

const one = {
  title: '如何解决Antd覆盖NextJS全局样式',
  content:
    '首先要说明一点，这个解决方法虽然有效但却使antd失去了按需引入的功能，造成了性能损耗。因此是否有效见仁见智。',
  date: '六月 23, 2021',
  url: 'url',
}
const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => one)

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <FirstScreen data={datas[0]}></FirstScreen>
        <BlogList arr={datas.slice(1)}></BlogList>
        <div className='div'>加载更多</div>
      </div>
      <style jsx>{`
        .div {
        }
      `}</style>
    </>
  )
}
