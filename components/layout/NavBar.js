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



const pages = ['Cryptocurrencies', 'NFTs', 'News'];
const paths =['/','/nfts','/news']

const ResponsiveAppBar = () => {

  const dispatch=useDispatch();

   const isAuth=useSelector(state=>state.auth.isAuth)
   const mode=useSelector((state)=>state.auth.mode)



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  
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
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{mr: 2,display: { xs: 'none', lg: 'flex' },fontFamily: 'monospace',
            fontWeight: 700,letterSpacing: '.3rem',color: 'inherit',
            textDecoration: 'none',}}
              >
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
                <MenuItem onClick={handleloginclick}><Typography  >Log In</Typography></MenuItem>
                <MenuItem onClick={handlesignupclick}><Typography >Sign Up</Typography></MenuItem>

                {isAuth&&<MenuItem onClick={handleclick}><Typography >logout</Typography></MenuItem>}
              </Box>
          </Box>
             
                
          <Box sx={{display: { xs: 'flex', lg: 'none',width:'100%' } }}>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', lg: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              paddingInline:"40%",}}>
            Mycoin
          </Typography>

              <Box >
              <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
                      

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}
            >
              
                <Box  onClick={handleCloseNavMenu} sx={{display:'block'}}>
                <MenuItem sx={{height:'3rem',display:'flex',alignItems:'center'}}>
                 <Link href="/"><Typography textAlign="center" width="100vw">Cryptocurrencies</Typography></Link>
                </MenuItem>
                 <Divider/>
                 
                 <MenuItem sx={{height:'3rem',display:'flex',alignItems:'center'}}>
                 <Link href="/nfts"><Typography textAlign="center" width="100vw">NFTs</Typography></Link>
                 </MenuItem>
                 <Divider/>
                  <MenuItem>

                 <Link href="/news" to="/news"><Typography textAlign="center" width="100vw">News</Typography></Link>
                  </MenuItem>
                  <Box sx={{display:'flex',justifyContent:'space-around',padding:'0 20%'}}>
                  {!isAuth&&<MenuItem onClick={handleloginclick}><Typography  >Log In</Typography></MenuItem>}
                  {!isAuth&&<MenuItem onClick={handlesignupclick}><Typography >Sign Up</Typography></MenuItem>}

                  {isAuth&&<MenuItem onClick={handleclick}><Typography >logout</Typography></MenuItem>}
                  </Box>
                </Box>
              
            </Menu>
              </Box>
           
          </Box>
          <Box sx={{flexGrow:1}}>
                <SearchInput/>
                </Box>
                
        </Toolbar>
        
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;



/*
 <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" width="100vw">{page}</Typography>
                </MenuItem>
*/


/*
{pages.map((page) => (
                <MenuItem key={{page}} onClick={handleCloseNavMenu}>
                 <Link href="/{page}"><Typography textAlign="center" width="100vw">{page}</Typography></Link>
                </MenuItem>
              ))}
*/