import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


import SearchInput from '../input/SearchInput';
import Link from 'next/link';
import { Divider } from '@mui/material';


import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../Store/auth';
import { currencyActio } from '../Store/currency';
import MyBackdrop from '../ui/coinidui/logform/backdrop';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Accountcircle from './accountcircle';
import Portfolio from './portfolio';



const pages = ['Cryptocurrencies',  'News'];
const paths =['/','/news']

const ResponsiveAppBar = () => {
 const router=useRouter();

  const dispatch=useDispatch();

   const isAuth=useSelector(state=>state.auth.isAuth)
   const mode=useSelector((state)=>state.auth.mode)

   const token=useSelector((state)=>state.auth.token)
   const uid=useSelector((state)=>state.auth.uid)

   


  useEffect(() => {
    if (typeof window !== "undefined") {
      if(localStorage.MycoinToken||localStorage.Mycoinuid){
       
       dispatch(authActions.setToeken({
         token:localStorage.MycoinToken,
       }))

       dispatch(authActions.setuid({
        uid:localStorage.MYcoinuid
       }))
       dispatch(authActions.login())
       
      }}
  }, [])
  

  const [anchorElNav, setAnchorElNav] =useState(null);

  
  const handleloginclick=()=>{
    if(mode=='signup'){
      dispatch(authActions.togglemode())
    }
    dispatch(authActions.toggleshow())
  }

  const handlesignupclick=()=>{
    if(mode=='signin'){
      dispatch(authActions.togglemode())
    }
    dispatch(authActions.toggleshow())
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);

   
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


 

  return (
    <AppBar position="static">
      <MyBackdrop/>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display:{xs:'block',lg:'flex'}}}>
          
          {/**  lg logo */}
          <Typography variant="h6" noWrap component="a" sx={{mr: 2,display: { xs: 'none', lg: 'flex' },fontFamily: 'monospace', fontWeight: 700,letterSpacing: '.3rem',color: 'inherit', textDecoration: 'none',}}    >
            MyCoin
          </Typography>
          {/*xs  and md logo*/}
      



          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } ,justifyContent:'space-between',}}>
          <Box sx={{display:'flex'}}>
                     {pages.map((page,idx) => (
              <MenuItem key={page} ><Link href={paths[idx]} key={page}><Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button></Link></MenuItem>  
            ))}
            </Box>

            <Box sx={{  display: { xs: 'none', lg: 'flex' } }}>
                {!isAuth&&<MenuItem onClick={handleloginclick}><Typography  >Log In</Typography></MenuItem>}
                {!isAuth&&<MenuItem onClick={handlesignupclick}><Typography >Sign Up</Typography></MenuItem>}
                
              
            
              </Box>
          </Box>
             
                
          <Box sx={{display: { xs: 'flex', lg: 'none',width:'100%' } }}>
          
           <Box sx={{display: { xs: 'flex', lg: 'none' }}}>
          {isAuth&&<Accountcircle  />}
          </Box>

          <Typography variant="h5" noWrap  component="a"  sx={{  display: { xs: 'flex', lg: 'none' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',width:'100%',paddingInline:"35%",}}>
            Mycoin
          </Typography>

              <Box >
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
              <MenuIcon />
            </IconButton>
                      
              <Menu id="menu">
                <Typography>1</Typography>
              </Menu>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}keepMountedtransformOrigin={{  vertical: 'top',  horizontal: 'left',}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{   display: { xs: 'block', lg: 'none' }, }}
            >
              
                <Box  onClick={handleCloseNavMenu} sx={{display:'block'}}>
                <MenuItem sx={{height:'3rem',display:'flex',alignItems:'center'}}>
                 <Link href="/"><Typography textAlign="center" width="100vw">Cryptocurrencies</Typography></Link>
                </MenuItem>
                 <Divider/>
                 
                 <MenuItem sx={{height:'3rem',display:'flex',alignItems:'center'}}>
                
                 </MenuItem>
                 <Divider/>
                  <MenuItem>

                 <Link href="/news" to="/news"><Typography textAlign="center" width="100vw">News</Typography></Link>
                  </MenuItem>
                  <Box sx={{display:'flex',justifyContent:'space-around',padding:'0 20%'}}>
                  {!isAuth&&<MenuItem onClick={handleloginclick}><Typography  >Log In</Typography></MenuItem>}
                  {!isAuth&&<MenuItem onClick={handlesignupclick}><Typography >Sign Up</Typography></MenuItem>}

                  
                  </Box>
                </Box>
              
            </Menu>
              </Box>
           
          </Box>
         <Box sx={{display: { xs: 'none', lg: 'flex' }}}>
         {isAuth&&<Accountcircle  />}
         <Box sx={{margin:'auto',cursor:'pointer'}}>{isAuth&& <Link href={'/portfolios/portfolios_preview'}><Typography>Portfolios</Typography></Link>}</Box>
          </Box>
          <Box sx={{flexGrow:1}}>
               
                <SearchInput type={'AppSearchBar'}/>
                </Box>
                
        </Toolbar>
        
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;



