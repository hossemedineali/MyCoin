import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import auth, { authActions } from '../Store/auth';
import { useState } from 'react';

import { useRouter } from 'next/router';

export default function Accountcircle() {
const dispatch=useDispatch()
 const router=useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handellogout=()=>{
    setAnchorEl(null);
    dispatch(authActions.logout())
    dispatch(authActions.setToeken({
      token:''
    }))
    dispatch(authActions.setuid({
      uid:''
    }))
    localStorage.removeItem('MycoinToken')
    localStorage.removeItem('MYcoinuid')

    router.replace('/')
  }


  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
     <AccountCircleIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={handleClose}><Link href={'/portfolios/portfolios_preview'}><Typography>Portfolios</Typography></Link></MenuItem>
        <MenuItem onClick={handellogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}