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



const OnePortfolio = ({portfolioid,data}) => {
            
        const [coinsdata,setcoinsdata]=useState([])
        const [portfolioUpdated,satportfolioUpdated]=useState(false)
        
    
   
        const newState=[]
    useEffect(() => {
       
        
        const fetchdata=async()=>{
                setcoinsdata([])
            for (let key in data) {  
    
             
              axios.get('https://api.coingecko.com/api/v3/coins/'+key+'?sparkline=true')
              .then(response=>{
                  
                 
                
                const coinobject= {
                    //dbdata:{key:data[key]},
                    id:response.data.id,
                    symbol:response.data.symbol,
                    market_cap_rank:response.data.market_cap_rank,
                    image:response.data.image.small,
                    price:response.data.market_data.current_price.usd,
                    h1:response.data.market_data.price_change_percentage_1h_in_currency.usd,
                    h24:response.data.market_data.price_change_percentage_24h,
                    d7:response.data.market_data.price_change_percentage_7d,
                    market_cap:response.data.market_data.market_cap.usd,
                    id_symbol:{
                        id:response.data.id,
                        symbol:response.data.symbol,
                        price:response.data.market_data.current_price.usd,
                        db:data[key]
                    }
                }
                    newState.push(coinobject)
                  
                      setcoinsdata((prev)=>
                        [...prev,coinobject]
                    )  

              }).catch(err=>{
                
              })
            }
        }
        fetchdata()
        
        satportfolioUpdated(false)
    }, [])
    const updated=()=>{
        satportfolioUpdated(true)
    }
        
    return ( 

        <Box sx={{margin:{md:'4rem 3rem',xs:'2rem 1rem' }}}>
        <Box sx={{display:'flex' }}>
            <Typography sx={{marginRight:'auto'}}>{portfolioid}</Typography>
            <Actions type={''} updated={updated} portfolioid={portfolioid}/>
        </Box>
        
        <PortfolioOverview/>
        <CoinsTable currentdata={coinsdata} portfolioid={portfolioid} />
          
            
        </Box>
    
     );
}
 
export default OnePortfolio;

