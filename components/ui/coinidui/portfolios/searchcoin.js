import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from "react";
import SearchInput from "../../../input/SearchInput";
import axios from "axios";

import {  useSelector } from "react-redux";
import { update } from "firebase/database";

const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {md:'50%',xs:'95%'},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


    const SearchCoin = ({portfolioid,updated}) => {

        const uid=useSelector(state=>state.auth.uid)
        
        const [open, setOpen] = useState(false);
        const handleClose = () => {
          setOpen(false);
        };
        const handleToggle = () => {
          setOpen(!open);
        };

        const handleClickAway=()=>{
            setOpen(false)
            
        }

            const AddToPortfolio=async(e)=>{
              updated()
              setOpen(false)
              handleClose()
                    console.log(e.target.id)
                    const uid =localStorage.getItem('MYcoinuid')
                    const coin=e.target.id
                    const param={
                      uid,
                      coin,
                      portfolioid
                    }
                    console.log(param)
                    await axios({
                      method:'POST',
                      url:'/api/AddCoinToPortfolio',
                      data:{
                        portfolioid,
                        coin,
                        uid
                      }
                    })
                    
            }

        return ( 
            <Box>
                <Button variant="contained" onClick={handleToggle}>Add New Coin</Button>
                 
                
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  
                  >
                    <Box sx={Modalstyle}>
                        <Typography>Search your favorite Coin</Typography>
                        <SearchInput type={'portfolio'} AddToPortfolio={AddToPortfolio} />
                    </Box>
                 </Modal>
                  
        </Box> 
        );
    }
    
    export default SearchCoin;