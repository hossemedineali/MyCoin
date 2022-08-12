import { useState,useEffect } from "react";
import { Icon, IconButton, makeStyles } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box } from "@mui/system";




const Scroll = ({showBelow}) => {

    const [show,setShow]=useState(showBelow? false:true);

    useEffect(()=>{
        if(showBelow){
            window.addEventListener(`scroll`,handleScroll)
            return ()=>window.removeEventListener(`scroll`,handleScroll)
        }
    })

    const handleScroll=()=>{
        if(window.pageYOffset>showBelow){
            if(!show) setShow(true)
        }else{
            if (show) setShow(false)
        }
    }

    const handleClick=()=>{
        window[`scrollTo`]({top:0, behavior : `smooth`})
    }

    return ( <Box>
        {show&& <IconButton onClick={handleClick} sx={{
            zIndex:'2',
            position:'fixed',
            bottom:'2vh',
            right:'2vw',
            background:'#DCDCDC',
            color:'black',
            "&:hover ,&.Mui-focusVisible":{
                transition:'0.3s',
                color:'#397BA6',
                background:'#DCDCDC'
            }
        }}>
            <ExpandLessIcon/>
        </IconButton>}
        
        
    </Box> );
}
 
export default Scroll;