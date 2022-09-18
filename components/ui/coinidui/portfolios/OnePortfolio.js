import {Typography } from "@mui/material";
import { Box } from "@mui/system";


import { useState } from "react";
import { legacy_createStore } from "redux";


import DoughnutChart from "../../../Doughnut";
import Actions from "../portfolios/Actions";
import CoinsTable from "./coinstable";
import PortfolioOverview from "./overview";



/*
0
: 
{coin: 'lossless', quantity: 50000, price: 0.164508}
1
: 
{coin: 'ethereum', quantity: 5, price: 1451.05}
2
: 
{coin: 'uno-re', quantity: 100000, price: 0.03977659}
3
: 
{coin: 'ripple', quantity: 0, price: 0.374241}
4
: 
{coin: 'bitcoin', quantity: 1, price: 19988.12}
5
: 
{coin: 'msol', quantity: 100, price: 35.72}
*/
const OnePortfolio = ({data,updated}) => {

 
console.log(data[1].statistics.portfoliototalbalance)
   let coinsdata=[]

   Object.keys(data[1].coins).forEach(key=>{
      coinsdata.push({
         coin:key,
         quantity:data[1].coins[key].totalcoinholding,
         price:data[1].coins[key].coindata.price
      })
   })

   

    const [showDoughnut, setshowDoughnut] = useState(false)
   

    const toggleShowDoughnut=()=>{
        setshowDoughnut(!showDoughnut)
       }

    return ( 

        <Box sx={{margin:{md:'4rem 3rem',xs:'2rem 1rem' }}}>
        <Box sx={{display:'flex' }}>
        
            <Typography sx={{marginRight:'auto'}}>{data[0]}</Typography>
            <Actions type={''} updated={updated} portfolioid={data[0]} data={data[1].coins} toggleShowDoughnut={toggleShowDoughnut} iconcolor={showDoughnut} />
        </Box>
        
        <PortfolioOverview totalBalance={data[1].statistics.portfoliototalbalance} h24change={data[1].statistics.portfolio24hchange} pnl={data[1].statistics.portfolioPnl}/>
        <Box sx={{width:'80%' ,height:'50%',margin:'2rem auto',}}>
     
     {/*render the chart here */}
     {showDoughnut&&<DoughnutChart totalBalance={data[1].statistics.portfoliototalbalance} coinsdata={coinsdata}/>}
        </Box>

          
       <CoinsTable updated={updated} currentdata={data[1].coins} portfolioid={data[0]} />
        </Box>
    
     );
}
 
export default OnePortfolio;



/*
   {showDoughnut&&<DoughnutChart/>}
*/

