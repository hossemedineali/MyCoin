    import { Box, Paper, Typography } from "@mui/material";

    export const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

    

    const PortfolioOverview = ({totalBalance,h24change,pnl}) => {
        
       
        return ( 
        <Box>
             <Box sx={{display:'flex',width:{md:'50%' ,xs:'80%'},margin:{md:'0',xs:'2rem auto'},gap:'1rem', flexDirection:{sm:'row',xs:'column'}}} >
                <Paper sx={{padding:'0.5rem' ,textAlign:'center'}}>
                    <Typography>{totalBalance?currencyFormatter.format(totalBalance):''}</Typography>
                    <Typography>Total Balance</Typography>
                </Paper>
                <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                    <Typography>{h24change?currencyFormatter.format(h24change):''}</Typography>
                    <Typography>24h Portfolio Change {((pnl/totalBalance)*100)? (currencyFormatter.format((pnl/totalBalance)*100)):''}</Typography>
                </Paper>
                <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                    <Typography color={pnl>0?'green':'red'}>{pnl?currencyFormatter.format(pnl):''}</Typography>
                    <Typography>Total Profit Loss (-)</Typography>
                </Paper>
            </Box>
        </Box> );
    }
    
    export default PortfolioOverview;