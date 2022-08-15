import Search from "@mui/icons-material/Search";
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/system";

import InputBase from '@mui/material/InputBase';


const Test = () => {
    return ( <Box >
    
       <InputBase
            sx={{background:'black',width:'100%'}}
           placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
       />

      

    </Box> );
}
 
export default Test;