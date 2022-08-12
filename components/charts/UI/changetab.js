import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

const MyBox = styled('div')(({ theme }) => ({
    color: 'black',
    border: "1px solid",
    textAlign:'center',
    height:'4rem'
    
    
  })); 

  function roundperc(value, precision) {
    var multiplier = Math.pow(10, precision || 1);
    return Math.round(value * multiplier) / multiplier;
}

const ChangeTab = ({marketdata}) => {

    console.log(marketdata.price_change_percentage_1h_in_currency)

    let h1=marketdata.price_change_percentage_1h_in_currency.usd;
    let h24=marketdata.price_change_percentage_24h;
    let d7=marketdata.price_change_percentage_7d;
    let d14=marketdata.price_change_percentage_14d;
    let d30 =marketdata.price_change_percentage_30d;
    let y1 =marketdata.price_change_percentage_1y;

    function percentage(perc){
      const per =roundperc(perc)
      if(per)
      return <Typography color={perc<0?'red':'green'}>
      {per}
      </Typography>
      else 
      return <Typography>?</Typography>
      
          }


    return ( 
    
        <Box  >
            <Grid container spacing={0} >
        <Grid item xs={2} >
          <MyBox >1h</MyBox>
          <MyBox > {percentage(h1)} </MyBox>
        </Grid>
        <Grid item xs={2}>
          <MyBox>24h</MyBox>
          <MyBox>{percentage(h24)} </MyBox>
        </Grid>
        <Grid item xs={2}>
          <MyBox>7d</MyBox>
          <MyBox>{percentage(d7)} </MyBox>
        </Grid>
        <Grid item xs={2}>
          <MyBox>14d</MyBox>
          <MyBox>{percentage(d14)} </MyBox>
        </Grid>
        <Grid item xs={2}>
          <MyBox>30d</MyBox>
          <MyBox>{percentage(d30)} </MyBox>
        </Grid>
        <Grid item xs={2}>
          <MyBox>1y</MyBox>
          <MyBox>{percentage(y1)}</MyBox>
        </Grid>
      </Grid>

        </Box>
      );
}
 
export default ChangeTab;