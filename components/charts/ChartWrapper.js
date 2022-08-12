import { Box } from "@mui/system";
import Chartjs from "./Chart";
import Button from '@mui/material/Button';

import MyBottonGroup from "./UI/MyBottonGroup";
import { useState } from "react";
import ChangeTab from "./UI/changetab";

const periodpicker=[
    { id:1 , value:'24h'},
    {id:7, value:'7d'},
    {id:14, value:'14d'},
    {id:30, value:'30d'},
    {id:90, value:'90d'},
    {id:180, value:'180d'},
    {id:364, value:'1y'},
    {id:'max', value:'max'}
];

const modepicker=[
    {
    id:'prices' ,
    value:'price'
},
    {
        id:'market_caps',
        value:'market cap'
    }

]

const ChartWrapper = (props) => {
        const [PickedPeriod,setPickedPeriod]=useState('1');
        const[PickedMode,setPickedmode]=useState('prices')
        
      

     const hundelclickPickedPeriod=(event)=>{
        setPickedPeriod(event.target.id)
     }

     const hundelclickPickedMode=(event)=>{
        
        setPickedmode(event.target.id)
     }

     

    return ( <Box sx={{display:'flex',flexDirection:'column',width:'100%' ,}}>
               <Box sx={{display:'flex', flexWrap:'wrap',justifyContent:'space-between',padding:'0 1rem' ,gap:'1rem'}} >
               <MyBottonGroup btn={modepicker} onclick={hundelclickPickedMode} mode={PickedMode}/>
               <MyBottonGroup btn={periodpicker} onclick={hundelclickPickedPeriod} Period={PickedPeriod}/>
               </Box>
            <Box sx={{width:'100%',height:'90vh',}}>

            <Chartjs coin={props.coin} Period={PickedPeriod} mode={PickedMode}/>
            <ChangeTab marketdata={props.coininfo.market_data}/>
            </Box>
            
    </Box> );
}
 
export default ChartWrapper;

//'24h','7d','14d','30d','90d','180d','1y','max'

