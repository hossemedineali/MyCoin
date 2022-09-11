import { Box, Button, ClickAwayListener, Snackbar, TextField, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';

import axios from 'axios'
import { useSelector } from "react-redux";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from "react";
import SearchInput from "../../../input/SearchInput";
import { update } from "firebase/database";


const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {sm:'400px',xs:'65%'},
    bgcolor: 'background.paper',
    
    boxShadow: 24,
    p: 4,
  };


    const AddNewPortfolio = ({updated}) => {
        const uid=useSelector((state)=>state.auth.uid)
        
        const [open, setOpen] = useState(false);
        const [InputValue, setInputValue] = useState('')
        const [snackopen, setsnackopen] = useState(false)
        const [isError, setisError] = useState(false)
        
        const handleClose = () => {
          setOpen(false);
          setInputValue('')
        };
        const handleToggle = () => {
          setOpen(!open);
        };

        

            const handelchange=(e)=>{
                setInputValue(e.target.value)
            }

            const oncancel=()=>{
                setOpen(false)
                setInputValue('')
            }

            async function onconfirm(){
                if(InputValue==''){
                    setisError(true)
                }else {

                   
                    setisError(false)
                   // setOpen(false)
                   await axios({
                    method:'POST',
                    url:'/api/addnewportfolio',
                    data:{
                        name:InputValue,
                        uid:uid
                    }
                   }).then((response)=>{
                    setOpen(false)
                    setInputValue('')
                    setsnackopen(true)
                    updated()
                   })
                   .catch((error)=>{
                  
                    if(error.response.data.isError){
                        setisError(true)
                    }
                   })
                }
            }


        
            const handleSnackClose = () => {
   
                setsnackopen(false);
              };
        return ( 
            <Box>
                <Button variant="contained" onClick={handleToggle} sx={{ textTransform: "none",p:'5px'}}>Create Portfolio</Button>
                 
                
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  
                  >
                    <Box sx={Modalstyle}>
                        <Typography>Add New Portfolio</Typography>
                        <TextField placeholder="Portfolio Name" value={InputValue} sx={{width:'100%'}} onChange={handelchange}></TextField>
                        {isError&&<Typography color={'red'}>Can't be empty</Typography>}
                        <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},gap:'0.3rem',justifyContent:'space-between',margin:'0.5rem'}}>
                            <Button onClick={oncancel} variant="outlined">Cancel</Button>
                            <Button onClick={onconfirm}  variant="contained">Confirm</Button>
                        </Box>
                    </Box>
                 </Modal>
                    <Snackbar
                        open={snackopen}
                        autoHideDuration={3000}
                        onClose={handleSnackClose}
                        message="Portfolio added "
            
                    />
        </Box> 
        );
    }
    
   
export default AddNewPortfolio;