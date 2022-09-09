import { Divider, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import Actions from "../components/ui/coinidui/portfolios/Actions";
import PortfolioOverview from "../components/ui/coinidui/portfolios/overview";

import axios from 'axios'


   import {useSelector} from 'react-redux'



import {getDocs,  collection} from "firebase/firestore";
import {db} from "../firebaseConfig"
import OnePortfolio from "../components/ui/coinidui/portfolios/OnePortfolio";
import { FormText } from "react-bootstrap";


const Portfolios_preview = (props) => {

    
          const uid=useSelector(state=>state.auth.uid)
          
        const [portfoliosid,setportfoliosid]=useState([]) 
        const [portfoliosdata,setportfoliosdata]=useState([])
        const [portfoliosUpdated,setportfoliosUpdated]=useState(false)
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const [uploaded,setuploaded]=useState(false)
       
        console.log('portfolio data from portfolio preview',portfoliosdata)
        console.log('portfolio id from portfolio preview',portfoliosid)
      const totalhelper=(params)=>{
      
      }
      totalhelper()

    
       
         
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        let data=[]
      
        useEffect(() => {
         let newArrayid=[]
          let newArraydata=[]
             
          let id=(localStorage.getItem('MYcoinuid'))
          getDocs(collection(db,"users",id,"portfolios")).then(response=>{
            
            response.forEach((doc)=>{
             
              let elm={}
            for(const key in doc.data()) {
              let totalholdingincoin=0
              let totalinvested=0
                for(const coin in doc.data()[key]){
                  let currentcoin=doc.data()[key][coin];
                  if(currentcoin.type=='buy'){
                      totalholdingincoin+=currentcoin.quantity
                      totalinvested+=currentcoin.total
                  }
                  else{
                    totalholdingincoin-=currentcoin.quantity
                    totalinvested-=currentcoin.total 
                  }
                }

           

                elm={id:doc.id,data:{...doc.data(),totalholdingincoin,totalinvested}}
              
                newArrayid.push(elm.id) 
                newArraydata.push(elm.data)
              }
              
              

              

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


            <PortfolioOverview />
                

                            
           {<ul> {portfoliosid.map((item,idx)=>{
              return <OnePortfolio portfoliosUpdated updated={updated} key={idx} portfolioid={portfoliosid[idx]} data={portfoliosdata[idx]} totalhelper={totalhelper} /> 
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