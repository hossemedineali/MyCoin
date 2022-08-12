import styled from "@emotion/styled";
import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Myitem = styled(Paper)(() => ({
    
    display:'flex',
    justifyContent:'space-between',
    margin:'0.5rem',
    padding:'0 0.5rem',
    color: 'black',
  }));
  const Typo = styled (Typography)(()=>({
    fontSize:'15px'
  }));
  
 

const NumbersInfo = (props) => {

    const  NumberFormatter = (number, isCuurency=true ,cureency='usd')=>{
        if (isCuurency) return Intl.NumberFormat('en-US', { style: 'currency',
         currency: cureency,minimumFractionDigits: 0 }, ).format(number)
         else return Intl.NumberFormat('en-US', {minimumFractionDigits: 0 }, ).format(number)
    }
    
    return ( 
      
            <Grid container sx={{justifyContent:'space-evenly',}} >

             <Grid item xs={12} md={6} >
                <Myitem >
                    <Typo>Market Cap</Typo>
                    <Typo>{props.market_cap?  NumberFormatter(props.market_cap) :'?'}</Typo>
                    
                </Myitem>
             </Grid>  

             <Grid item xs={12} md={6} >
                <Myitem >
                    <Typo>24 Hour Trading Vol </Typo>
                    <Typo>{props.volume_24h? NumberFormatter(props.volume_24h) : '?'}</Typo>
                </Myitem>
             </Grid>  

             <Grid item xs={12} md={6}>
                <Myitem >
                    <Typo fontSize={15}>Fully Diluted Valuation</Typo>
                    <Typo>{props.fully_diluted_valuation ? NumberFormatter(props.fully_diluted_valuation): '?'}</Typo>
                </Myitem>
             </Grid>  

             <Grid item xs={12} md={6}>
                <Myitem >
                    <Typo>Circulating Supply</Typo>
                    <Typo>{props.circulating_supply ? NumberFormatter(props.circulating_supply,0) :'?'}</Typo>
                </Myitem>
             </Grid>  

             <Grid item xs={12} md={6}>
                <Myitem >
                    <Typo>Total Supply </Typo>
                    <Typo>{props.total_supply ? NumberFormatter(props.total_supply,0): '?'}</Typo>
                </Myitem>
             </Grid>  

             <Grid item xs={12} md={6}>
                <Myitem >
                    <Typo>Max Supply</Typo>
                    <Typo>{props.max_supply? NumberFormatter(props.max_supply,0):'?'}</Typo>
                </Myitem>
             </Grid>  

            

                


                

               

                

                

            </Grid>
    
        
     );
}
 
export default NumbersInfo;


/*
circulating_supply: 19115418
fully_diluted_valuation: 489941099378
market_cap: 445972805238
max_supply: 21000000
total_supply: 21000000
volume_24h: 13930434966
*/


/*
<Grid md={5} xs={12}>
                <Box sx={{display:'flex',width:'150px',flexWrap:'wrap',width:'100%',
                justifyContent:'space-between',borderBottom:'1px solid black',padding:'2px'}}>
                    <Typography variant="h5">abc</Typography>
                    <Typography variant="h5">123</Typography>
                </Box>
                </Grid>
                <Grid md={5} xs={12}>
                <Box sx={{display:'flex',width:'150px',flexWrap:'wrap',width:'100%',
                justifyContent:'space-between',borderBottom:'1px solid black',padding:'2px'}}>
                    <Typography variant="h5">abc</Typography>
                    <Typography variant="h5">123</Typography>
                </Box>
                </Grid>

*/