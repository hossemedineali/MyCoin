    import { Box, Paper, Typography } from "@mui/material";

    const PortfolioOverview = (props) => {
        return ( 
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
        </Box> );
    }
    
    export default PortfolioOverview;