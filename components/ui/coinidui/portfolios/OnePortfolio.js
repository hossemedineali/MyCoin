import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { set } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import Coins from "../../../coins/coin";
import Actions from "../portfolios/Actions";
import CoinsTable from "./coinstable";
import PortfolioOverview from "./overview";



const OnePortfolio = ({portfolioid,data,updated}) => {

        const [coinsdata,setcoinsdata]=useState([])
        console.log('state :',coinsdata)
    
   
        const newState=[]
    useEffect(() => {
       
        
        const fetchdata=async()=>{

            for (let key in data) {
    
             
              axios.get('https://api.coingecko.com/api/v3/coins/'+key+'?sparkline=true')
              .then(response=>{
                  
                 // console.log('===============')
                 //console.log(response.data.market_data.market_cap.usd)
                
                const coinobject= {
                    id:response.data.id,
                    symbol:response.data.symbol,
                    market_cap_rank:response.data.market_cap_rank_cap_rank,
                    image:response.data.image.small,
                    price:response.data.market_data.current_price.usd,
                    h1:response.data.market_data.price_change_percentage_1h_in_currency.usd,
                    h24:response.data.market_data.price_change_percentage_24h,
                    d7:response.data.market_data.price_change_percentage_7d,
                    market_cap:response.data.market_data.market_cap.usd
                }
                    newState.push(coinobject)
                   // console.log(coinobject)
                      setcoinsdata((prev)=>
                        [...prev,coinobject]
                    )  

              }).catch(err=>{
                
              })
            }
        }
        fetchdata()
        //setcoinsdata(newState)
      
    }, [])
    
        
    return ( 

        <Box sx={{margin:{md:'4rem 3rem',xs:'2rem 1rem' }}}>
        <Box sx={{display:'flex' }}>
            <Typography sx={{marginRight:'auto'}}>{portfolioid}</Typography>
            <Actions type={''} updated={updated} portfolioid={portfolioid}/>
        </Box>
        
        <PortfolioOverview/>
        <CoinsTable />
         <Coins currentdata={coinsdata}/> 
            
        </Box>
    
     );
}
 
export default OnePortfolio;

