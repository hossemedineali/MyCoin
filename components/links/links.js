import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/system';

import LinkItem from '../links/linkitem'

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

const testdata ={
    contract_address : '0x474021845c4643113458ea4414bdb7fb74a01a77',
    homepage: ["http://www.bitcoin.org"],
    blockchain_site:["https://etherscan.io/token/0x474021845c4643113458ea4414bdb7fb74a01a77",
    "https://ethplorer.io/address/0x474021845c4643113458ea4414bdb7fb74a01a77",
    "https://bscscan.com/token/0x474021845C4643113458ea4414bdb7fB74A01A77",]
}


  
  
//http://www.bitcoin.org
const Links = ({coininfo}) => {
    const links=coininfo.links
    
    
    const cumm ={
        reddit:links.subreddit_url , //a link string
        twitter: links.twitter_screen_name, //a string , twiiter name , https://twitter.com/{twitter}
        facebook: links.facebook_username, // a string , facebook username ,https://www.facebook.com/{facebook}
        forum :links.official_forum_url ,// array of strings leads to forums pages
        chat: links.chat_url , // array of strings lead to page ex(discord , linkedin) possible mui icons
    }
    
    return ( 
    
    <Box sx={{ display:'flex' ,flexDirection:'column', justifyContent:'center'}}>
       
        <LinkItem name={'Contract'} data={links.contract_address} url={false}/>
        <LinkItem name ={'Website'} data={[...links.homepage,...links.announcement_url]} url={true}/>
        <LinkItem name ={'Explorers'} data={links.blockchain_site} url={true}/>
        <LinkItem name ={'Community'} data={cumm} url={true}/>
        <LinkItem name={'Search on'} data={links.twitter_screen_name} />
        <LinkItem name={'Source Code'} data ={links.repos_url.github}/>

        

         


    </Box> );
}
 
export default Links;


/*
 {testdata.contract_address &&
         <ContainnerBox >
            <Typography>Contract</Typography>
            <Chip sx={{width:'120px'}} label={testdata.contract_address} />
           
        </ContainnerBox>}

        {testdata.homepage &&
         <ContainnerBox >
            <Typography>Website</Typography>
          <LinkBox >
          {testdata.homepage.map(link=>{
                return <a href={link} target='blank' style={{cursor:'pointer'}}><Chip sx={{width:'auto',cursor:'pointer'}} label={getdomainname(link)} > </Chip></a>
            })}
          </LinkBox>
           
        </ContainnerBox>}

        {
            testdata.blockchain_site && <h6></h6>
            

        }
*/