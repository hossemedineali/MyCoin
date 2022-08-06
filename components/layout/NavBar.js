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


const pages = ['Cryptocurrencies', 'NFTs', 'News'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  

  const handleOpenNavMenu = (event) => {
   
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyCoin
          </Typography>

         
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              paddingInline:"40%"
            }}
          >
            Mycoin
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
                <Box sx={{flexGrow:1,display:{xs:'none',md:'block'}}}>
                <SearchInput/>
                </Box>
          <Box sx={{display: { xs: 'flex', md: 'none' } }}>
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={handleCloseNavMenu}
                >
                 <Link href="/"><Typography textAlign="center" width="100vw">Cryptocurrencies</Typography></Link>
                 <Link href="/nfts"><Typography textAlign="center" width="100vw">NFTs</Typography></Link>
                 <Link href="/news"><Typography textAlign="center" width="100vw">News</Typography></Link>
                </MenuItem>
              
            </Menu>
          </Box>
          
        </Toolbar>
        <Box sx={{flexGrow:1,display:{md:'none',xs:'block'}}}>
                <SearchInput/>
                </Box>
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