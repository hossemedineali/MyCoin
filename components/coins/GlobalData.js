import styled from "@emotion/styled";
import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { roundperc,currencyFormatter } from "../coinId/PriceStatics";


const Mypaper=styled('div')(()=>({
    margin:'1rem',
    border:'1px solid black',
    borderLeft:'0.5rem solid green',
    width:'500px',
    padding:'2rem 2rem 2rem 1rem',
    borderRadius:'10px',
    background:'lightblue',
    
    
}))



const GlobalData = () => {
    const[global,setglobal]=useState();

    useEffect(()=>{
        async function getdata(){
            axios.get('https://api.coingecko.com/api/v3/global')
            .then(function(response){
                setglobal(response.data.data)
            })
        }
       getdata()
    },[])


    return ( <Grid container  >
        {global && 
        <><Grid item lg={3} md={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
       <Mypaper>
        <Typography fontWeight={700}>Market Capitalization</Typography>
        <Typography>{currencyFormatter.format(global.total_market_cap.usd)}</Typography>
       </Mypaper>
       </Grid>

       <Grid item lg={3} md={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
       <Mypaper>
        <Typography fontWeight={700}>24h Trading Volume</Typography>
        <Typography>{currencyFormatter.format(global.total_volume.usd)}</Typography>
       </Mypaper>
       </Grid>

       <Grid item lg={3} md={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
       <Mypaper>
        <Typography fontWeight={700}>Bitcoin Market Cap Dominance</Typography>
        <Typography>{roundperc(global.market_cap_percentage.btc)} %</Typography>
       </Mypaper>
       </Grid>

       <Grid item lg={3} md={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
       <Mypaper>
        <Typography fontWeight={700}>Number  of Coins</Typography>
        <Typography>{global.active_cryptocurrencies}</Typography>
       </Mypaper>
       </Grid></>}
       
    </Grid> );
}
 
export default GlobalData;