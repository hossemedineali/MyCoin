import {  Menu, MenuItem, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";

import Actions from "../../components/ui/coinidui/portfolios/Actions"
import PortfolioOverview from "../../components/ui/coinidui/portfolios/overview";

import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import OnePortfolio from "../../components/ui/coinidui/portfolios/OnePortfolio";
import axios from "axios";



const Portfolios_preview = (props) => {
          const router=useRouter();
          
    
          const uid=useSelector(state=>state.auth.uid)
         
         
        const [portfoliosdata,setportfoliosdata]=useState([])
        const [AllportfoliosStatistics,setAllportfoliosStatistics]=useState([])
        const [portfoliosUpdated,setportfoliosUpdated]=useState(false)
        const [coingekolimit,setcoingekolimit]=useState(false)
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        
        
        //console.log(portfoliosdata)
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        let data=[]
      
        
        useEffect(() => {
        
          setportfoliosUpdated(false)
          setcoingekolimit(false)
            
          
            
          let id=(localStorage.getItem('MYcoinuid'))
          if(id==null){
              router.replace('/login')
            return
          }
          const dataforapi={
            id:id,
          }
           axios({
            method:'POST',
            url:'/api/getallportfolios',
            data:dataforapi
            
          }).then(response=>{
          
            setAllportfoliosStatistics(response.data.AllportfoliosStatistics)
            setportfoliosdata(response.data.object)
          }).catch(err=>{

            console.log('portfolio preview error message',err.message)
            if(err.message=='Request failed with status code 500'){
                setcoingekolimit(true)
            }
          })
        
         
    
        }, [portfoliosUpdated])
     
      


        function updated(){
          console.log('updated function run')
          setportfoliosUpdated(true)
          
        }

       

       
        return ( 
          <>

         
        {!coingekolimit&& <Box>
            <Box sx={{margin:{xs:'1rem',md:'2rem'},display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
                
                <Typography>All Portfolios</Typography>
              
              
                <Actions type={'all'} updated={updated}/>
            </Box>


           {AllportfoliosStatistics&& <PortfolioOverview totalBalance={AllportfoliosStatistics.totalBalance} h24change={AllportfoliosStatistics.allPortfoliosChange24h}  pnl={AllportfoliosStatistics.totalPnl}   />}
                
           {portfoliosdata&& Object.entries(portfoliosdata).map((item)=>{
            return <OnePortfolio updated={updated} key={item[0]} data={item}/>
           })}

           
        </Box> }


           {coingekolimit&&<Box sx={{width:{xs:'80%',md:'65%'},margin:'auto 50px'}}>
            <h3>this is an experimental project i am using free Coingecko api that has a limit for requests. </h3>
            <h3>You reached the limit please try to reload the page after 1 minute</h3>
            <h2>Thank You</h2>
           </Box>}
        </>
        );
    }
     
    export default Portfolios_preview;


    


    