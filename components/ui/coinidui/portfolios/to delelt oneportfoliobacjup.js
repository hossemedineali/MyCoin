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



const OnePortfolio = ({data}) => {

    console.log('data',data)
            
        const [coinsdata,setcoinsdata]=useState([])
        
        const [portfolioStatics,setportfolioStatics]=useState({})
        
        
      

        const somemath=()=>{
           
        }
        somemath()


       

    useEffect(() => {
        setcoinsdata([])
        
        const fetchdata=async()=>{
       
            let totalportfolioinvested=0
            let totalportfolioholding=0
            for (let key in data) {  

              
                let totalcoinholding=0
                let totalInvestedonecoin=0
                if(data[key].length>0){
                        
                    data[key].map(item=>{
                        if(item.type=="buy"){
                            totalcoinholding+=item.quantity
                            totalInvestedonecoin+= item.quantity*item.pricePerCoin
                        }if(item.type=='sell'){
                            totalcoinholding-=item.quantity
                            totalInvestedonecoin-=item.quantity*item.pricePerCoin
                        }
                         
                    })  
                    
                    }
                    totalportfolioinvested+=totalInvestedonecoin;
             
              axios.get('https://api.coingecko.com/api/v3/coins/'+key+'?sparkline=false')
              .then(response=>{
                  totalportfolioholding+=totalcoinholding*response.data.market_data.current_price.usd
                    let currentPrice=response.data.market_data.current_price.usd
                    let totalcoinholdingvaluation=totalcoinholding*currentPrice
                    let coinpercentageofportfolio=totalcoinholdingvaluation/totalportfolioholding

                   somemath(totalcoinholding,totalcoinholdingvaluation,totalInvestedonecoin,currentPrice,totalportfolioholding,totalportfolioinvested)

                
                const coinobject= {

                    totalonecoinholding:totalcoinholding,
                    totalcoinholdingvaluation,
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
                    
                  
                      setcoinsdata((prev)=>
                        [...prev,coinobject]
                    )  

              }).catch(err=>{
                
              })
            }
        }
        fetchdata()
        
        portfoliosUpdated
    }, [/* portfoliosUpdated,data */])

    
   
        
    return ( 

        <Box sx={{margin:{md:'4rem 3rem',xs:'2rem 1rem' }}}>
        <Box sx={{display:'flex' }}>
        <h1>test</h1>
            <Typography sx={{marginRight:'auto'}}>{portfolioid}</Typography>
            <Actions type={''} updated={updated} portfolioid={portfolioid}/>
        </Box>
        
        <PortfolioOverview/>
       {/*  {Object.keys(data).length>0&&<CoinsTable updated={updated} currentdata={coinsdata} portfolioid={portfolioid} />} */}
          
       <CoinsTable updated={updated} currentdata={coinsdata} portfolioid={portfolioid} />
        </Box>
    
     );
}
 
export default OnePortfolio;

