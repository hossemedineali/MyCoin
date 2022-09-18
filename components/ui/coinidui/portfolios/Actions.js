import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState } from "react";
import SearchCoin from "./searchcoin";
import AddNewPortfolio from "./AddNewPortfolio";
import { Modal, Typography,Snackbar } from "@mui/material";

import { pink ,brown} from '@mui/material/colors';

import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios'


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


    const Actions = ({type='all',updated,portfolioid,data,toggleShowDoughnut,iconcolor}) => {
      //  console.log('===========    Actions     ==========')
      //  console.log('data',data)
      //  console.log('portfolioid',portfolioid)
        const [anchorEl, setAnchorEl] = useState(null);
        const [openDelete, setopenDelete] = useState(false)
        const [openReset, setopenReset] = useState(false)
        const [snackopen, setsnackopen] = useState(false)
        const open = Boolean(anchorEl);

        
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleopenDelete=()=>{
                setopenDelete(true)
        }

        const handleCloseDelete=()=>{
            setopenDelete(false)
        }

        const handleopenReset=()=>{
            setopenReset(true)
        }

        const handleCloseReset=()=>{
            setopenReset(false)
        }

        const deletPortfolio=async()=>{
            // I define id twice because i don't why i get an error (local storeage undifined)
            //when declaring it global /////// to do verify this 
            const id=localStorage.getItem('MYcoinuid')
            console.log('delet')
            setopenDelete(false)

            await axios({
                method:'POST',
                url:'/api/deleteportfolio',
                data:{
                    id,
                    portfolioid
                }
            })
            .then(response=>{
                console.log('response from delete portfolio api ',response)
                updated()

            })
            .catch(error=>{
                console.log('error from delete portfolio api ',error)
            })


        }

        const resetPortfolio=async()=>{
           // I define id twice because i don't why i get an error (local storeage undifined)
            //when declaring it global /////// to do verify this 
            const id=localStorage.getItem('MYcoinuid')
            setopenReset(false)

            let newdata={}
           
            Object.keys(data).forEach(key=>{
                newdata[key]=[]
            })
            console.log(newdata)
            await axios({
                method:'POST',
                url:'/api/resetportfolio',
                data:{
                    id,
                    portfolioid,
                    coindata:newdata
                }
            })
            .then(response=>{
                //console.log(response)
                updated()

            })
            .catch(error=>{
              //
            })  

            
        }

        const handleSnackClose=()=>{
            setsnackopen(false)
        }
        
            return ( <Box id='actions' sx={{display:'flex',gap:'0.2rem',}}>

                 <VisibilityOffIcon sx={{ fontSize: 30 }}/>
                <DonutLargeIcon  sx={{ fontSize: 30, color:iconcolor?'brown':'disabled'}} onClick={toggleShowDoughnut}/>
                
                {type!='all'&&<Box>
               
                        <MoreVertIcon
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
                        <MenuItem onClick={()=>{handleopenDelete();handleClose()}}>Delete Portfolio</MenuItem>
                        <MenuItem onClick={()=>{handleopenReset();handleClose()}}>Reset Portfolio</MenuItem>
                        
                    </Menu>
                    {/* Confirm delete Modal */}
                    <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={{...style}}>
                        <CloseIcon 
                                onClick={handleCloseDelete}
                                sx={{display:{xs:'flex',md:'none'},position:'relative',right:15,top:-15,cursor:'pointer',background:'lightgrey'}}/>
                            <Typography>Are you sure want to delete this portfolio?</Typography>
                            <Box sx={{display:'flex',justifyContent:'space-between',width:'80%'}}>
                                <Button onClick={handleCloseDelete}>Cancel</Button>
                                <Button variant="filled" onClick={deletPortfolio}>Confirm</Button>
                            </Box>
                            <Snackbar
                                open={snackopen}
                                autoHideDuration={6000}
                                onClose={handleSnackClose}
                                message="Portfolio deleted"
                            
                            />
                        </Box>

                        </Modal>
                        {/* Confirm Reset Modal */}
                        <Modal
                        open={openReset}
                        onClose={handleCloseReset}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <Box sx={{...style}}>
                        <CloseIcon 
                                onClick={handleCloseReset}
                                sx={{display:{xs:'flex',md:'none'},position:'relative',right:15,top:-15,cursor:'pointer',background:'lightgrey'}}/>
                            <Typography>All the transactions will be cleared. Are you sure want to reset this portfolio?</Typography>
                            <Box sx={{display:'flex',justifyContent:'space-between',width:'80%'}}>
                                <Button onClick={handleCloseReset}>Cancel</Button>
                                <Button variant="filled" onClick={resetPortfolio}>Confirm</Button>
                            </Box>
                            <Snackbar
                                open={snackopen}
                                autoHideDuration={6000}
                                onClose={handleSnackClose}
                                message="Reset done succesfully"
                            
                            />
                        </Box>
                        </Modal>
                </Box>
                
                }
                {type!='all'&&<SearchCoin updated={updated} portfolioid={portfolioid}/>
                
                }
                {type=='all'&& <>
                

                
                
                <AddNewPortfolio updated={updated}/></>}

               
            </Box> );
        }
        
        export default Actions;

        color: brown[600]