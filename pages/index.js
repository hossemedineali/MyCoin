import Head from 'next/head';
import { useEffect, useState } from 'react';
import Coins from '../components/coins/coin';
import GlobalData from '../components/coins/GlobalData';
import Paginate from '../components/pagination/pagination';
import Scroll from '../components/ui/coinidui/scroll';



 function Home(props) {

  const [currentpage, setcurrentPage] = useState(1);
  const [currentdata,setcurrentdata]= useState([])
  
  
  
  
  const handleChange = (event, value) => {
    setcurrentPage(value);
  };



  useEffect(() => {
    async function fetchdata(){
     const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page='+currentpage+'&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
     const coins = await res.json()

     coins.forEach((element) => {
      element.coinid = element.market_cap_rank
    });

    
     setcurrentdata(coins)
     
     
    }
    
    fetchdata()

    
   },[currentpage]);



  return (
            <>
                 <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>MyCoin</title>
                 </Head>
                    <Scroll showBelow={450} />
                 
                    <GlobalData/>
                    <Coins currentdata={currentdata}/>
                    <Paginate  page={currentpage} handleChange={handleChange}/>
                 
    </>
    
  )
}

export function GetServerSideProps(){

  /* axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page='+currentpage+'&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
  .then(function (response) {
    // handle success

    const axiosdata=response
    console.log('axios GetServerSideProps')
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
 */

  return{
    props: {
      axiosdata:5555
    },
  }
}



export default  Home;