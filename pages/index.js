import Head from 'next/head'
import FirstScreen from '../components/FirstScreen'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <FirstScreen></FirstScreen>
      </div>
    </>
  )
}
