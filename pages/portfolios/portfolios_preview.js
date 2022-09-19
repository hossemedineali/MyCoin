import {   Backdrop, CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";

import Actions from "../../components/ui/coinidui/portfolios/Actions"
import PortfolioOverview from "../../components/ui/coinidui/portfolios/overview";

import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import OnePortfolio from "../../components/ui/coinidui/portfolios/OnePortfolio";
import axios from "axios";
import DoughnutChart from "../../components/Doughnut";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'lightBlue',
  border: '2px solid #000',
  boxShadow: '24 75 55 100',
  pt: 2,
  px: 4,
  pb: 3,
};


const Portfolios_preview = (props) => {


          const router=useRouter();
          
    
          const uid=useSelector(state=>state.auth.uid)
         
         
        const [portfoliosdata,setportfoliosdata]=useState([])
        const [AllportfoliosStatistics,setAllportfoliosStatistics]=useState([])
        const [portfoliosUpdated,setportfoliosUpdated]=useState(false)
        const [coingekolimit,setcoingekolimit]=useState(false)
        const [showDoughnut, setshowDoughnut] = useState(false)
        const [anchorEl, setAnchorEl] = useState(null);
        const [arrayforallPortfolioschart, setarrayforallPortfolioschart] = useState({})
        const [isLoading, setisLoading] = useState(false)

        const open = Boolean(anchorEl);
        
        
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        let data=[]
      
        
        useEffect(() => {
        setisLoading(true)
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
            setisLoading(false)
          
            setAllportfoliosStatistics(response.data.AllportfoliosStatistics)
            setportfoliosdata(response.data.object)
            setarrayforallPortfolioschart(response.data.arrayforallPortfolioschart)
          
          }).catch(err=>{

          setisLoading(false)
                setcoingekolimit(true)

                console.log(err)
            
          })
        
         
    
        }, [portfoliosUpdated])
     
      


        function updated(){
          console.log('updated function run')
          setportfoliosUpdated(true)
          
        }

       const handleCloseModal=()=>{
        setcoingekolimit(false)
       }

       
       const toggleShowDoughnut=()=>{
        setshowDoughnut(!showDoughnut)
       }
        return ( 
          <>
        <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>
         
         <Box>
            <Box sx={{margin:{xs:'1rem',md:'2rem'},display:'block',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
                <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>

                <Typography>All Portfolios</Typography>
              
              
                <Actions type={'all'} updated={updated} toggleShowDoughnut={toggleShowDoughnut} iconcolor={showDoughnut}/>
                </Box>
              
            </Box>


           {AllportfoliosStatistics&& <PortfolioOverview totalBalance={AllportfoliosStatistics.totalBalance} h24change={AllportfoliosStatistics.allPortfoliosChange24h}  pnl={AllportfoliosStatistics.totalPnl}   />}
                      
                        {showDoughnut&&< DoughnutChart totalBalance={AllportfoliosStatistics.totalBalance} coinsdata={arrayforallPortfolioschart}/>}
                      
           {portfoliosdata&& Object.entries(portfoliosdata).map((item)=>{
            return <OnePortfolio updated={updated} key={item[0]} data={item}/>
           })}

           
        </Box> 

        <Modal
                        open={coingekolimit}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                          <Box sx={{width:{xs:'90%',md:'65%'},...style}}>
            <h3>this is an experimental project i am using free Coingecko api that has a limit for requests. </h3>
            <h3>You reached the limit please try to reload the page after 1 minute</h3>
            <h2>Thank You</h2>
           </Box>
                        </Modal>
           
        </>
        );
    }
     
    export default Portfolios_preview;


    


    