import { Avatar, Box,Chip, Grid, LinearProgress, Typography } from '@mui/material';
import MyInfoTab from '../../components/charts/MyInfoTab/Tab';
import Links from '../../components/links/links';
import Head from 'next/head';

import HeadCoinInfo from '../../components/ui/coinidui/HeadCoinInfo';
import NumbersInfo from '../../components/ui/coinidui/NumbersInfo';
import ProgressBar from '../../components/ui/coinidui/ProgressBar';

import axios from 'axios';
import Scroll from '../../components/ui/coinidui/scroll';

const Coin = ({coininfo}) => {

        
    let progresspercentagehelper =0

        if(coininfo.market_data.high_24h.usd!=null&&coininfo.market_data.low_24h.usd!=null){
            progresspercentagehelper = 100 -Math.ceil((((coininfo.market_data.high_24h.usd-coininfo.market_data.current_price.usd)/(coininfo.market_data.high_24h.usd-coininfo.market_data.low_24h.usd))*100))
        }
        //let progresspercentagehelper = 100 -Math.ceil((((coininfo.market_data.high_24h.usd-coininfo.market_data.current_price.usd)/(coininfo.market_data.high_24h.usd-coininfo.market_data.low_24h.usd))*100))
        
        return ( 
          <>
                  <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{coininfo.id} price live : {coininfo.symbol} price live chart and more</title>
                 </Head>
                 <Scroll showBelow={950}/>
        <Box sx={{margin:{xs:'0',sm:'3rem',md:'2rem'}}}>
        <Box sx={{height:{xs:'auto',md:'72vh'} ,paddingTop:'0' }}>
         <Grid container>
            <Grid item xs={12} md={8}>
            <HeadCoinInfo coininfo={coininfo}
                market_cap_rank={coininfo.market_cap_rank}
                image={coininfo.image.small}
                id={coininfo.id}
                symbol={coininfo.symbol}
                current_price={coininfo.market_data.current_price.usd}
                price_change_percentage_24h={coininfo.market_data.price_change_percentage_24h}
                 />

            { progresspercentagehelper>0 && <ProgressBar progresspercentagehelper={progresspercentagehelper}
                low_24h={coininfo.market_data.low_24h.usd}
                high_24h={coininfo.market_data.high_24h.usd}
            />}
            
            <NumbersInfo 
            market_cap={coininfo.market_data.market_cap.usd}
            volume_24h={coininfo.market_data.total_volume.usd}
            fully_diluted_valuation={coininfo.market_data.fully_diluted_valuation.usd}
            circulating_supply={coininfo.market_data.circulating_supply}
            total_supply={coininfo.market_data.total_supply}
            max_supply={coininfo.market_data.max_supply}    
            />
            </Grid>

            <Grid item xs={12} md={4}>
                <Links coininfo={coininfo}/>
            </Grid>
         </Grid>
         </Box>

          
            <MyInfoTab coininfo={coininfo}/>

        </Box>

        </>
      
  );
}







export async function getServerSideProps({ query }) {
    const coinId = query.coinId
    let coininfo
    await axios.get('https://api.coingecko.com/api/v3/coins/'+coinId+'?sparkline=true')
  .then(function (response) {
    // handle success
     coininfo=response.data
    
  })
  .catch(function (error) {
  
    if (error.message=='Request failed with status code 404') {
        coininfo = error.message
    }
    
  })
  .then(function () {
 
  });

  if (coininfo=='Request failed with status code 404'){
    return {redirect: {
        permanent: false,
        destination: `/404`
      },}
   } else{
    return{
        props:{
            coininfo
        }
    }
   }
  }


export default Coin;

