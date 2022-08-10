import { Chip,  Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/system';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';

const ContainnerBox = styled(Box)({
  display:'flex',
   alignItems:'flex-start',
   gap:'1rem', 
   marginBottom:'1rem'
});

const LinkBox = styled(Box)({
    display:'flex',
     gap:'0.2rem',
     flexWrap:'wrap'
  });



const LinkItem = (props) => {

    const getdomainname =(url)=>{
       return  (new URL(url)).hostname.replace('www.','');
    }
    
   
   

    return ( 
    
    <Box sx={{margin:'0 0 0 15px'}}>
        
        {/* =============comunity lniks==================== */}
        {props.name=='Community' && props.name!='Search on'&&
         <ContainnerBox >
            <Typography>{props.name}</Typography>
            <LinkBox>
                {props.data.reddit && <a href={props.data.reddit} target='blank' style={{cursor:'pointer'}}><Chip icon={<RedditIcon/>} sx={{width:'auto',cursor:'pointer' ,maxWidth:'120px'}} label={' Reddit' } /></a>}
                {props.data.twitter && <a href={'https://twitter.com/'+props.data.twitter} target='blank' style={{cursor:'pointer'}}><Chip icon={<TwitterIcon/>} sx={{width:'auto',cursor:'pointer' ,maxWidth:'120px'}} label={' Twitter' }/></a>}
                {props.data.faceboook && <a href={'https://www.facebook.com/'+props.data.faceboook} target='blank' style={{cursor:'pointer'}}><Chip icon={<FacebookRoundedIcon/>} sx={{width:'auto',cursor:'pointer' ,maxWidth:'120px'}} label={' Twitter' }/></a>}
            </LinkBox>
        </ContainnerBox>}

        {/* ==================search on lniks ================*/}
        {props.name =='Search on' && props.data && 
          <ContainnerBox>  
            <Typography>{props.name}</Typography>
            {props.data&& <a href={'https://twitter.com/search?q=$'+props.data} target='blank' style={{cursor:'pointer'}}><Chip icon={<SearchIcon color="primary"/>} sx={{width:'auto',cursor:'pointer' ,maxWidth:'120px'}} label={' Twitter' } /></a>}
          </ContainnerBox>
        }
        {/* ===============Source code link ==================*/}
        {props.name == 'Source Code'&& props.data&&
        <ContainnerBox>  
            <Typography>{props.name}</Typography>
            {
            props.data.map(link=>{
               return <a href={link} key={link} target='blank' style={{cursor:'pointer'}}><Chip icon={<GitHubIcon/>} sx={{width:'auto',cursor:'pointer' ,maxWidth:'120px'}} label={'Github' }/></a>
            })
           }
          </ContainnerBox>
        }

        {/* =============other links ==========================*/}
        { (props.data && props.name!='Community' && props.name!='Search on' &&props.name!='Source Code') &&
         <ContainnerBox >
            <Typography>{props.name}</Typography>
          <LinkBox >
          {props.url ? props.data.map(link=>{
                if(link) return <a  href={link} key={link} target='blank' style={{cursor:'pointer'}}><Chip sx={{width:'auto',cursor:'pointer' ,maxWidth:'120px'}} label={ props.url? getdomainname(link) : link } /> </a>
            }) : 
            <Chip sx={{width:'auto',maxWidth:'120px'}} label={ props.data } />
            }
          </LinkBox>
           
        </ContainnerBox>}

            

    </Box> );
}
 
export default LinkItem;