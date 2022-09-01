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
   

    const Actions = ({type='all',updated,portfolioid}) => {

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        
            return ( <Box id='actions' sx={{display:'flex',gap:'0.2rem',}}>
                <VisibilityOffIcon sx={{ fontSize: 30 }}/>
                <DonutLargeIcon sx={{ fontSize: 30 }}/>
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
                        <MenuItem onClick={handleClose}>Rename Portfolio</MenuItem>
                        <MenuItem onClick={handleClose}>Reset Portfolio</MenuItem>
                        
                    </Menu>
                </Box>}
                {type!='all'&&<SearchCoin updated={updated} portfolioid={portfolioid}/>}
                        {type=='all'&&<AddNewPortfolio updated={updated}/>}
            </Box> );
        }
        
        export default Actions;