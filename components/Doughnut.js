import { Box } from "@mui/material";

import Chart from 'chart.js/auto';

import { Doughnut } from "react-chartjs-2";


const options={
    aspectRatio:2/1,
    //maintainAspectRatio: false,
  responsive:true,
    layout:{
        padding:20
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom"
     },
    },

    
  
             
  }

  




    const DoughnutChart = ({coinsdata,totalBalance}) => {

        console.log(coinsdata)
        
     const   doughnutLabelsline={
       
       
        } 
        const plugins = [
            {
                afterDraw(chart,args,options){
                    const {ctx,chartArea:{top,bottom,left,right,width,height}}=chart;
                   
                    chart.data.datasets.forEach((dataset,i)=>{
                       
                        chart.getDatasetMeta(i).data.forEach((datapoint,index)=>{
                            const {x,y}=datapoint.tooltipPosition();
                           
                            // ctx.fillStyle=dataset.borderColor[index]
                            //ctx.fill();
                            //ctx.fillRect(x,y,2,2)

                            //draw line

                            const halfheight=height/2
                            const halfwidth=width/2

                            const xLine=x>=halfwidth?x+10:x-10
                            const yLine=y>=halfheight?y+10:y-10
                            const extraline=x>=halfwidth?10:-10
                            //Line
                            ctx.beginPath()
                            ctx.moveTo(x,y)
                            ctx.lineTo(xLine,yLine)
                            ctx.lineTo(xLine+extraline,yLine)
                            ctx.strokeStyle=dataset.borderColor[index]
                            ctx.stroke()
                            
                            //text  
                            const textWidth=ctx.measureText(chart.data.labels[index]).width

                            ctx.font='15px Arial'

                            const textXPosition=x>=halfwidth?'left':'right'
                            const plusFive=x>=halfwidth? 2 :-2
                            ctx.textAlign=textXPosition
                            ctx.textBaseLine='middle'
                            ctx.fillStyle=dataset.borderColor[index]
                            ctx.fillText(chart.data.labels[index],xLine+extraline+plusFive,yLine )
                        })
                    })
                }
            }
           
          ];
        


        const datax = {
            labels: [
             
            ],
            datasets: [
                {
              
              data: [],
              backgroundColor: [
                'rgba(255,0,0,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(0,0,255,0.5)',
                'rgba(255,255,0,0.5)',
                'rgba(0,255,255,0.5)',
                'rgba(255,0,255,0.5)',
                'rgba(192,192,192,0.5)',
                'rgba(128,128,128,0.5)',
                'rgba(128,0,0,0.5)',
                'rgba(128,128,0,0.5)',
                'rgba(0,128,0,0.5)',
                'rgba(128,0,128,0.5)',
                'rgba(0,128,128,0.5)',
                'rgba(0,0,128,0.5)'
              ],
              borderColor: [
                'rgb(255,0,0)',
                'rgb(0,255,0)',
                'rgb(0,0,255)',
                'rgb(255,255,0)',
                'rgb(0,255,255)',
                'rgb(255,0,255)',
                'rgb(192,192,192)',
                'rgb(128,128,128)',
                'rgb(128,0,0)',
                'rgb(128,128,0)',
                'rgb(0,128,0)',
                'rgb(128,0,128)',
                'rgb(0,128,128)',
                '(0,0,128)'
              ],
              hoverOffset: 4,
              cutout:'90%',
              borderRadius:10
            }
        ], 

          };

          if(coinsdata.length>0){

              coinsdata.forEach(element => {
                if(element.quantity>0){
    
                    datax.labels.push(element.coin)
                    datax.datasets[0].data.push((((element.quantity*element.price)/totalBalance)*100).toString()+'')
                }
            });
          }

     
        

       
       
      
        return ( 
        <Box sx={{width:{xs:'100%',md:'50%'},height:'auto',margin:'0',}}>

           {coinsdata&& <Doughnut data={datax} options={options} plugins={plugins}/>}
        </Box> );
    }
     
    export default DoughnutChart;