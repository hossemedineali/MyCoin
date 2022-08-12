import styled from "@emotion/styled";
import { Typography ,Box, Divider, Grid} from "@mui/material";


export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0
  });
  
 export function roundperc(value, precision) {
    var multiplier = Math.pow(10, precision || 1);
    return Math.round(value * multiplier) / multiplier;
}

const mm=['Jan','Feb','Mar','Apr','May','Jui','Jui','Aug','Sep','Oct','Nov','Dec']

 function getdate(stringdate){
    var dateObj = new Date(stringdate);
  var month = dateObj.getUTCMonth(); //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear(); 
  var newdate = mm[month] + ' '+ day + ',' + year 
  return newdate

 }


const PriceStatics = (props) => {

   const ath= getdate(props.coininfo.market_data.atl_date.usd)

    return ( <Box container sx={{
        background:'#D6EAF8',
        width:'100%',
        margin:{xs:' 4rem auto',md:'auto'},
        padding:'1rem',
        borderRadius:'10px'
    }}>
        <Typography variant="h5" sx={{fontWeight:'700'}}>{props.coininfo.symbol.toUpperCase()} Price Statics</Typography>
        <Typography variant="p">{props.coininfo.id.charAt(0).toUpperCase() + props.coininfo.id.slice(1)} Price Today</Typography>
        <Grid  sx={{display:'flex',width:'100%',padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>Bitcoin Price</Typography>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.current_price.usd)}</Typography>
            
        </Grid>
        <Divider/>
      

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>24hLow/24h High</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.low_24h.usd)}/</Typography>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.high_24h.usd)}</Typography>
            </Box>
            
        </Grid>
        <Divider/>

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>7d Low / 7d High</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{currencyFormatter.format(Math.min(...props.coininfo.market_data.sparkline_7d.price))}/</Typography>
            <Typography >{currencyFormatter.format(Math.max(...props.coininfo.market_data.sparkline_7d.price))}</Typography>
            </Box>
            
        </Grid>
        <Divider/>

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>Trading Volume</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.total_volume.usd)}</Typography>
            
            </Box>
            
        </Grid>
        <Divider/>

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>Market Cap Rank</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography ># {props.coininfo.market_cap_rank}</Typography>
           
            </Box>
            
        </Grid>
        <Divider/>

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>Market Cap</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.market_cap.usd)}</Typography>
            
            </Box>
            
        </Grid>
        <Divider/>

        

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>All-Time High</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.ath.usd ) }  </Typography>
            <Typography color={'red'} fontSize={'14px'}>
            {roundperc(props.coininfo.market_data.ath_change_percentage.usd)} %
            </Typography>
            </Box>
            
        </Grid>
        <Divider/>

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>All-Time High date </Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{getdate(props.coininfo.market_data.ath_date.usd)}</Typography>
            </Box>
            
        </Grid>
        <Divider/>

        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>All-Time Low</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{currencyFormatter.format(props.coininfo.market_data.atl.usd)}</Typography>
            <Typography color={'green'} fontSize={'14px'}>
            {roundperc(props.coininfo.market_data.atl_change_percentage.usd)} %
            </Typography>
            </Box>
            
        </Grid>
        <Divider/>
        <Grid sx={{display:'flex',width:'100%' ,padding:'0.8rem 0.2rem'}}>
            <Typography sx={{marginRight:'auto'}}>All-Time Low date</Typography>
            <Box sx={{display:{xs:'flex',md:'block'}}}>
            <Typography >{getdate(props.coininfo.market_data.atl_date.usd)}</Typography>
            
            </Box>
            
        </Grid>
        <Divider/>
        
    </Box> );
}
 
export default PriceStatics;

//props.coininfo.symbol.charAt(0).toUpperCase() + props.coininfo.symbol.slice(1)

//props.coininfo.market_data.ath_change_percentage.usd>0?'green':red