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


