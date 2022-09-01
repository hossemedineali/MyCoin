import { Divider, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import Actions from "../components/ui/coinidui/portfolios/Actions";
import PortfolioOverview from "../components/ui/coinidui/portfolios/overview";

import axios from 'axios'


   import {useSelector} from 'react-redux'



import {getDocs,  collection} from "firebase/firestore";
import {app,db} from "../firebaseConfig"
import OnePortfolio from "../components/ui/coinidui/portfolios/OnePortfolio";


const Portfolios_preview = (props) => {

  
          const uid=useSelector(state=>state.auth.uid)
        const [portfoliosid,setportfoliosid]=useState([]) 
        const [portfoliosdata,setportfoliosdata]=useState([])
        const [portfoliosUpdated,setportfoliosUpdated]=useState(false)
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const [uploaded,setuploaded]=useState(false)
       

        
       
         
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        let data=[]
      
        useEffect(() => {
         // setportfoliosid([])
         // setportfoliosdata([])
         
         let newArrayid=[]
          let newArraydata=[]
             
          let id=(localStorage.getItem('MYcoinuid'))
          getDocs(collection(db,"users",id,"portfolios")).then(response=>{
            
            response.forEach((doc)=>{
              
              
              const elm={id:doc.id,data:doc.data()}
                
              
               newArrayid.push(elm.id)
               newArraydata.push(elm.data)

              /* setportfoliosid(prev=>[...prev,doc.id])
              setportfoliosdata(prev=>[...prev,elm]) */

              setportfoliosid(newArrayid)
              setportfoliosdata(newArraydata)
            })
            
          })
         
          setportfoliosUpdated(false)
          setuploaded(true)
        }, [portfoliosUpdated])
        
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


            <PortfolioOverview/>
                

                            
           {<ul> {portfoliosid.map((item,idx)=>{
              return <OnePortfolio updated={updated} key={idx} portfolioid={portfoliosid[idx]} data={portfoliosdata[idx]} /> 
              })
            }</ul>}
        </> 
        );
    }
     
    export default Portfolios_preview;


    


    /* export async function getStaticProps(context) {
      let data=[]
        axios.get('')
      return {
        props: {data}, // will be passed to the page component as props
      }
    }  */