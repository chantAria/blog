import Head from 'next/head'
// import Header from '../components/Header'
import Screen from '../components/Screen'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        {/* <Header></Header> */}
        <Screen></Screen>
      </div>
    </>
  )
}
