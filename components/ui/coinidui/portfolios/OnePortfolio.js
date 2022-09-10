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



const OnePortfolio = ({data,updated}) => {

    //console.log(data)
           // console.log((data[1]))
    return ( 

        <Box sx={{margin:{md:'4rem 3rem',xs:'2rem 1rem' }}}>
        <Box sx={{display:'flex' }}>
        
            <Typography sx={{marginRight:'auto'}}>{data[0]}</Typography>
            <Actions type={''} updated={updated} portfolioid={data[0]}/>
        </Box>
        
        <PortfolioOverview />
       {/*  {Object.keys(data).length>0&&<CoinsTable updated={updated} currentdata={coinsdata} portfolioid={portfolioid} />} */}
          
       <CoinsTable updated={updated} currentdata={data[1].coins} portfolioid={data[0]} />
        </Box>
    
     );
}
 
export default OnePortfolio;

