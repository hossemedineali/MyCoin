import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


  const options={
    maintainAspectRatio: false,
    xAxes: {
      type: 'time',
      ticks: {
          autoSkip: true,
          maxTicksLimit: 2
      },
      
  },


    plugins: {
      title: {
        display: false,
        text: "Cryptocurrency prices"
      },
      legend: {
        display: false,
        position: "bottom"
     },
     

    },
    scales: {
     
         x: {
      grid: {
      display: false
            },
            ticks: {
              maxTicksLimit: 10
          }
             },
        y: { type: 'linear',
           grid: {
                 display: true
               },
               ticks: {
                maxTicksLimit: 10
            }
              }
             },

             
  }

const Chartjs = (props) => {


  const [chartdata,setchartdata]=useState(null)
  

    

    function dateFormat(date){
      if (props.Period=='1'){
        return date.getHours() +':'+date.getMinutes()
      } 
      return date.getDate() +''+date.toLocaleString('default', { month: 'short' });
      
    }

    

    
    


    useEffect(() => {



        async function fetchdata  (url) {
            const res=await fetch('https://api.coingecko.com/api/v3/coins/'+props.coin+'/market_chart?vs_currency=usd&days='+props.Period)
            const data = await res.json()
            
            const prices=data.prices

            const market_caps=data.market_caps
            //const volume=data.total_volumes

            let label;
            let dat;
            if(props.mode==='prices'){
              
               label = prices.map(elm=>{
              const date = new Date(elm[0])
              const expdate =dateFormat(date);
                return expdate})
                dat=prices.map(elm=>{
                  return elm[1]
              })
                
            }else{
              
               label = market_caps.map(elm=>{
                const date = new Date(elm[0])
                const expdate =dateFormat(date);
                  return expdate})
                  dat=market_caps.map(elm=>{
                  return elm[1]
              })
            }

           
           

            const tempdata= {
                labels: label,
                datasets: [{
                      type: 'line',
                      label:'price $',
                      data: dat,
                      pointRadius: 0,
                      fill: true,
                      borderColor: 'rgb(0, 140, 255, 0.7)',
                      backgroundColor: 'rgb(0, 140, 255, 0.05)',
                      borderWidth: 2
                    },
                   
                  ],

            
            }
            setchartdata(tempdata)
            
        }
        fetchdata()
    },[props.Period,props.mode]);

    
    
    return ( <Box sx={{width:'90%' ,height:'75%',margin:'2rem auto',}}>
        
        {chartdata &&<Line data={chartdata} options={options}/>}
    </Box> );
}
 
export default Chartjs;


