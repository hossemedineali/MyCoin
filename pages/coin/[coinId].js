import { Avatar, Box,Chip, Grid, LinearProgress, Typography } from '@mui/material';
import Links from '../../components/links/links';

import HeadCoinInfo from '../../components/ui/coinidui/HeadCoinInfo';
import NumbersInfo from '../../components/ui/coinidui/NumbersInfo';
import ProgressBar from '../../components/ui/coinidui/ProgressBar';

const Coin = ({coininfo}) => {
    
        let progresspercentagehelper = 100 -Math.ceil((((coininfo.market_data.high_24h.usd-coininfo.market_data.current_price.usd)/(coininfo.market_data.high_24h.usd-coininfo.market_data.low_24h.usd))*100))
        
        return ( 
        <Box sx={{margin:{xs:'1rem',sm:'3rem',md:'2rem'}}}>
         <Grid container>
            <Grid xs={12} md={8}>
            <HeadCoinInfo coininfo={coininfo}
                market_cap_rank={coininfo.market_cap_rank}
                image={coininfo.image.small}
                id={coininfo.id}
                symbol={coininfo.symbol}
                current_price={coininfo.market_data.current_price.usd}
                price_change_percentage_24h={coininfo.market_data.price_change_percentage_24h}
                 />

            <ProgressBar progresspercentagehelper={progresspercentagehelper}
                low_24h={coininfo.market_data.low_24h.usd}
                high_24h={coininfo.market_data.high_24h.usd}
            />
            
            <NumbersInfo 
            market_cap={coininfo.market_data.market_cap.usd}
            volume_24h={coininfo.market_data.total_volume.usd}
            fully_diluted_valuation={coininfo.market_data.fully_diluted_valuation.usd}
            circulating_supply={coininfo.market_data.circulating_supply}
            total_supply={coininfo.market_data.total_supply}
            max_supply={coininfo.market_data.max_supply}    
            />
            </Grid>

            <Grid xs={12} md={4}>
                <Links coininfo={coininfo}/>
            </Grid>
         </Grid>
        </Box>
      
  );
}



export async function getStaticPaths(){

    return {
        fallback:true,
        paths:[
           { params: {
                coinId:'bitcoin',
                
            }}
        ]
    }
}

export async function getStaticProps(context){
console.log(context.params.coinId)
    const res = await fetch('https://api.coingecko.com/api/v3/coins/'+context.params.coinId)
    const coins = await res.json()

    return {
        props: {
          coininfo:coins
        },
      };
}
 
export default Coin;

