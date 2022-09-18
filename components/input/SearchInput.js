
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import { useState ,useEffect} from 'react';
import axios from 'axios'
import { Avatar, ClickAwayListener, Divider, Popper, Typography } from '@mui/material';
import Link from 'next/link';
import { configureStore } from '@reduxjs/toolkit';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100px',
    },
  },
  width:'100%',
 
}));







export default function SearchInput({type,AddToPortfolio}) {
      const [anchorEl, setAnchorEl] = useState(null);
      
      const [Inputchanged, setInputchanged] = useState(false);
      const [Inputvalue,setInputvalue]=useState('');

      const [Trending,setTrending] =useState([]);
      const [SearchResult,setSearchResult]= useState([]);

    
      
      

      





      const focushundler=(event)=>{
        setAnchorEl(anchorEl ? null : event.currentTarget)
        async function fetchcoins(){

          console.log("fetching trending  data from search input")

          await axios.get('https://api.coingecko.com/api/v3/search/trending').
          then(function(response){
            if (response.status==200)
            setTrending(response.data.coins)
          }
          )

        }
        fetchcoins()
      }

      
      const blurHundler=()=>{
        setInputchanged(false)
        //setSearchResult([])
      }

      const clickAway=(event)=>{
        setAnchorEl(null)
        
      }

      const onclick=()=>{
        
        setAnchorEl(null)
      }

      const hundelchange=(event)=>{
        if(event.target.value===''){
          setInputvalue('')
          setInputchanged(false)
          setSearchResult([])
        }

        
        setInputchanged(true)
        setInputvalue(event.target.value)
         async function fetch(){
          await axios.get('https://api.coingecko.com/api/v3/search?query='+event.target.value).
          then(function(response){
          
           let perm =[]
          for(let i=0;i<6;i++){
            perm.push(response.data.coins[i])
          }
           
           setSearchResult(perm)
          })

        }
         fetch()
         
          
      }


     

  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
 
      const Renderdtrending=(
        
        Trending.map(coin=>{
        return  <Box key={coin.item.id} sx={{height:'50px',padding:'5px 15px '}} >
        
        <Link href={'/coin/'+coin.item.id} >
        <a onClick={onclick}>
        <Box display={'flex'}>

        
          <Box sx={{marginRight:'auto',display:'flex' ,gap:'10px'}}>
        <Avatar src={coin.item.large} sx={{width:'20px',height:'20px'}}/>
        <Typography>{coin.item.id}</Typography>
          </Box>
          <Typography>#{coin.item.market_cap_rank}</Typography>
          </Box>
        </a>
        </Link>
        
       </Box>
       
      }))


      const RenderdtrendingForPortfolio=(
        
            
        Trending.map(coin=>{
        return  <Box key={coin.item.id} sx={{height:'50px',padding:'5px 15px '}} >
        
        
        
        <Box display={'flex'}>

        
          <Box sx={{marginRight:'auto',display:'flex' ,gap:'10px'}}>
        <Avatar src={coin.item.large} sx={{width:'20px',height:'20px'}}/>
        <Typography id={coin.item.id} sx={{cursor:'pointer'}} onClick={AddToPortfolio}>{coin.item.id}</Typography>
          </Box>
          
          </Box>
        
        
        
       </Box>
       
      }
      
      
      )
      
      )
      

      
       let renderedsearch=(SearchResult&& SearchResult.map(elm=>{
        if(elm){
          return  <Box key={elm.id} sx={{height:'50px',padding:'5px 15px '}} >
        
        <Link href={'/coin/'+elm.id} >
        <a onClick={onclick}>
        <Box display={'flex'}>

        
          <Box sx={{marginRight:'auto',display:'flex' ,gap:'10px'}}>
        <Avatar src={elm.thumb} sx={{width:'20px',height:'20px'}}/>
        <Typography>{elm.id}</Typography>
          </Box>
          <Typography>#{elm.market_cap_rank}</Typography>
          </Box>
        </a>
        </Link>
        
       </Box>
        }
        
      }) )

      let renderedsearchForPortfolio=(SearchResult&& SearchResult.map(elm=>{
        if(elm){
          return  <Box   key={elm.id} sx={{height:'50px',padding:'5px 15px ',marginRight:'auto',display:'flex' ,gap:'10px'}} >

                   <Avatar src={elm.thumb} sx={{width:'20px',height:'20px'}}/>
                   <Typography id={elm.id} sx={{cursor:'pointer'}} onClick={AddToPortfolio}>{elm.id}</Typography>
        
       </Box>
        }
        
      }) )
    
  
  return (
    
    <ClickAwayListener onClickAway={clickAway}>
      <Search sx={{backgroung:'black',width:'auto'}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            id={id}
            value={Inputvalue}
            onFocus={focushundler}
            
            onChange={hundelchange}
          />
        
         {type=='AppSearchBar'&& <Popper  open={open} anchorEl={anchorEl}  id={id} 
            placement="bottom-end" 
          sx={{width:{lg:'200px',xs:'90%',md:'91%'}} }
          >
           <Box sx={{ border: 0,mr:{lg:-20}, bgcolor: 'background.paper' }}>
          
            <Box sx={{display:'flex', padding:'0 15px'}}>
            
            
            </Box>
            
            <Divider/>
                 {!Inputvalue&&Renderdtrending}
                 {Inputvalue  &&renderedsearch }
                
           </Box>
          </Popper>}

          {type=='portfolio'&&Inputchanged&&
          <Box  open={open} anchorEl={anchorEl}  id={id} 
            placement="bottom-end" 
          sx={{width:{lg:'200px',xs:'90%',md:'91%'}} }
          >
           <Box sx={{ border: 0,mr:{lg:-20}, bgcolor: 'background.paper' }}>
          
            <Box sx={{display:'flex', padding:'0 15px'}}>
            
            
            </Box>
            
            <Divider/>
               
                 {!Inputvalue&&<>
                  <Typography>TrendingSearch</Typography>
                  <Divider/>
                 {RenderdtrendingForPortfolio}
                  </>
                 }
                 {Inputvalue  &&renderedsearchForPortfolio }

           </Box>
          </Box>
          
          
          }
          
        
        
        </Search>
        </ClickAwayListener>

  );
}








