import Head from 'next/head'
import Screen from '../components/Screen'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Screen src='screen.jpg'></Screen>
      </div>
    </>
  )
}
