import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { ClickAwayListener } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../Store/auth'
import Loginform from './loginform';
import { Box, Typography } from '@mui/material';
import SignUpForm from './signupfom';

export default function MyBackdrop() {


    const dispatch=useDispatch();
   const show= useSelector(state=>state.auth.show)
   const mode =useSelector(state=>state.auth.mode)

  const handleClose = () => {
    dispatch(authActions.toggleshow())
 
    console.log('clicked')
  };
  const handleToggle = () => {
    dispatch(authActions.toggleshow())
    setOpen(!open);
  };

  const onclickawayhandler=()=>{
    dispatch(authActions.toggleshow())
    console.log('click away')
}

  return (
    <Box  sx={{background:'red',width:'250px'}}>
        
      
      {show&&<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
        
      >
      <ClickAwayListener onClickAway={onclickawayhandler}>
        <Box sx={{background:'red'}}>
        
        {mode=='signin'&&<Loginform/>}
        {mode=='signup'&&<SignUpForm/>}

        </Box>
        </ClickAwayListener>
      </Backdrop>}
    </Box>
  );
}
