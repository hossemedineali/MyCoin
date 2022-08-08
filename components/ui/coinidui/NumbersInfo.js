import styled from "@emotion/styled";
import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Item = styled(Paper)(() => ({
    
    display:'flex',
    justifyContent:'space-between',
    margin:'0.2rem',
    padding:'0 1rem',
    color: 'black',
  }));
  const Typo = styled (Typography)(()=>({
    fontSize:'15px'
  }));
  
  /*
sx={{width:'100%',display:'flex',justifyContent:'space-between',margin:'1rem'}}
  */

const NumbersInfo = (props) => {

    console.log(props.total_supply)



    const  NumberFormatter = (number, isCuurency=true ,cureency='usd')=>{
        if (isCuurency) return Intl.NumberFormat('en-US', { style: 'currency',
         currency: cureency,minimumFractionDigits: 0 }, ).format(number)
         else return Intl.NumberFormat('en-US', {minimumFractionDigits: 0 }, ).format(number)
    }
    console.log(props)
    return ( 
      
            <Grid container sx={{justifyContent:'space-evenly',}} >

             <Grid xs={12} md={6} >
                <Item >
                    <Typo>Market Cap</Typo>
                    <Typo>{NumberFormatter(props.market_cap)}</Typo>
                    
                </Item>
             </Grid>  

             <Grid xs={12} md={6} >
                <Item >
                    <Typo>24 Hour Trading Vol </Typo>
                    <Typo>{NumberFormatter(props.volume_24h)}</Typo>
                </Item>
             </Grid>  

             <Grid xs={12} md={6}>
                <Item >
                    <Typo fontSize={15}>Fully Diluted Valuation</Typo>
                    <Typo>{NumberFormatter(props.fully_diluted_valuation)}</Typo>
                </Item>
             </Grid>  

             <Grid xs={12} md={6}>
                <Item >
                    <Typo>Circulating Supply</Typo>
                    <Typo>{NumberFormatter(props.circulating_supply,0)}</Typo>
                </Item>
             </Grid>  

             <Grid xs={12} md={6}>
                <Item >
                    <Typo>Total Supply </Typo>
                    <Typo>{NumberFormatter(props.total_supply,0)}</Typo>
                </Item>
             </Grid>  

             <Grid xs={12} md={6}>
                <Item >
                    <Typo>Max Supply</Typo>
                    <Typo>{NumberFormatter(props.max_supply,0)}</Typo>
                </Item>
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