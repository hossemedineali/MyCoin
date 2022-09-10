import {  Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import Actions from "../components/ui/coinidui/portfolios/Actions";
import PortfolioOverview from "../components/ui/coinidui/portfolios/overview";

   import {useSelector} from 'react-redux'

import {getDocs,  collection} from "firebase/firestore";
import {db} from "../firebaseConfig"
import OnePortfolio from "../components/ui/coinidui/portfolios/OnePortfolio";
import axios from "axios";
import { onValue } from "firebase/database";


const Portfolios_preview = (props) => {

    
          const uid=useSelector(state=>state.auth.uid)
         
         
        const [portfoliosdata,setportfoliosdata]=useState([])
        const [portfoliosUpdated,setportfoliosUpdated]=useState(false)

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        

      //console.log(portfoliosdata)
      //console.log((Object.entries(portfoliosdata)))
    /*   Object.entries(portfoliosdata).map((item)=>{
        console.log(item)
      }) */
      

      
       
       
     
     

     
         
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        let data=[]
      
        
        useEffect(() => {
          setportfoliosUpdated(false)
            
          
            
          let id=(localStorage.getItem('MYcoinuid'))
          console.log(id)
          const dataforapi={
            id:id,
          }
           axios({
            method:'POST',
            url:'/api/getallportfolios',
            data:dataforapi
            
          }).then(response=>{
            //console.log('portfolios preview response ',response.data)
            setportfoliosdata(response.data.object)
          })
        
         
    
        }, [])
     
        
        const updated=()=>{
          setportfoliosUpdated(true)
          
        }

       

       
        return ( 
        <>
            <Box sx={{margin:{xs:'1rem',md:'2rem'},display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
                <Box sx={{display:'flex'}}>
                <Typography>All Portfolios</Typography>
                <KeyboardArrowDownIcon
                    sx={{ fontSize: 30 }}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                />


                <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>My Portfolio</MenuItem>
                            <MenuItem onClick={handleClose}>Test</MenuItem>   
                        </Menu>
                </Box>

                <Actions type={'all'} updated={updated}/>
            </Box>


            <PortfolioOverview />
                
           { Object.entries(portfoliosdata).map((item)=>{
            return <OnePortfolio updated key={item[0]} data={item}/>
           })}

           
        </> 
        );
    }
     
    export default Portfolios_preview;


    


    