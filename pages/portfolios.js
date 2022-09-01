import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Actions from "../components/ui/coinidui/portfolios/Actions";

const Portfolios = () => {
    return ( 
    <Box sx={{margin:{md:'4rem 3rem',xs:'2rem 1rem' }}}>
        <Box sx={{display:'flex' }}>
            <Typography sx={{marginRight:'auto'}}>Portfolio name</Typography>
            <Actions type={''}/>
        </Box>
        
        <Box>
            <Box sx={{display:'flex',width:{md:'50%' ,xs:'80%'},margin:{md:'0',xs:'2rem auto'},gap:'1rem', flexDirection:{sm:'row',xs:'column'}}} >
                <Paper sx={{padding:'0.5rem' ,textAlign:'center'}}>
                    <Typography>§0.00</Typography>
                    <Typography>Total Balance</Typography>
                </Paper>
                <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                    <Typography>§0.00</Typography>
                    <Typography>24h Portfolio Change (+0%)</Typography>
                </Paper>
                <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                    <Typography>§0.00</Typography>
                    <Typography>Total Profit Loss (-)</Typography>
                </Paper>
            </Box>

            
        </Box>
    </Box> );
}
 
export default Portfolios;