import { Avatar, Box,Chip, LinearProgress, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


const HeadCoinInfo = (props) => {

    console.log('############# price % 24h',props.price_change_percentage_24h)

    return ( 
    <Box >
            <Chip color="primary" label={"Rank "+props.market_cap_rank} icon={<TagIcon/>}/>

            <Box sx={{display:'flex',gap:'0.2rem',alignItems:'center',marginTop:'1rem'}}>
            <Avatar src={props.image}/>
            <Typography variant='h6'>{props.id}</Typography>
            <Typography variant='h6'>({props.symbol})</Typography>
             </Box>

             <Box sx={{display:'flex',alignItems:'center',marginTop:'1rem'}}>
             {props.current_price&&<Typography variant='h6'>${props.current_price}</Typography> } 
             {props.price_change_percentage_24h!=null&&<> { props.price_change_percentage_24h <0  ? <ArrowDropDownIcon color={'warning'}/> : <ArrowDropUpIcon color={'success'}/>}</>}
             <Typography variant='h6' color={props.price_change_percentage_24h< 0? 'red':'green'}>
             {props.price_change_percentage_24h!=null&& props.price_change_percentage_24h.toFixed(1).toLocaleString()}
             </Typography>
            </Box>
    </Box> );
}
 
export default HeadCoinInfo;
