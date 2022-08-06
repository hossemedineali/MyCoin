import Head from 'next/head'
import Image from 'next/image'
import Pagination from '../components/pagination/paginationreact'

export default function Home() {
  return (
    <>
<Head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MyCoin</title>
</Head>
    < >
     <h1>Hello</h1>
    <Pagination itemsPerPage={2}/>
    </>
    </>
  )
}
