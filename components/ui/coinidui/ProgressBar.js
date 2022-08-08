import { Box,LinearProgress ,Typography} from "@mui/material";

const ProgressBar = (props) => {
    return ( 
        
            <Box sx={{
                 marginTop:'1rem',
                    
                    width:{xs:'100%',md:'400px'}
               
                
            }}>
                <LinearProgress variant="determinate" value={props.progresspercentagehelper}/>
                <Box sx={{
                    display:'flex',
                    justifyContent:'space-between'
                    

                }}>
                    <Typography variant='p'>{props.low_24h}</Typography>
                    <Typography variant='p'>24h range</Typography>
                    <Typography variant='p'>{props.high_24h}</Typography>
                </Box>
            </Box>
        
     );
}
 
export default ProgressBar;


/*
<Box sx={{
                width:'300px',
                marginTop:'1rem'
            }}>
                <LinearProgress variant="determinate" value={progresspercentagehelper}/>
                <Box sx={{
                    display:'flex',
                    justifyContent:'space-between'
                    

                }}>
                    <Typography variant='p'>{coininfo.market_data.low_24h.usd}</Typography>
                    <Typography variant='p'>24h range</Typography>
                    <Typography variant='p'>{coininfo.market_data.high_24h.usd}</Typography>
                </Box>
            </Box>
*/