import { CircularProgress } from '@mui/material';
import { Box, margin } from '@mui/system';
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/a.module.css'






export default function News() {

  const [data, setdata] = useState()

  const urlbitcoin='https://cbsnews3.cbsistatic.com/hub/i/r/2020/12/17/3acaf358-8875-4c91-95e8-1f0a5bb7f9d9/thumbnail/1200x630/9508023a6fda6d0ec05890d53d6ec3f4/gettyimages-1291796401.jpg'
  console.log('data',data)
        const options = {
          method: 'GET',
          url: 'https://bing-news-search1.p.rapidapi.com/news/search',
          params: {q: 'crypto', count: '100',freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
          headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': 'bb997c3de6msh8d54561a3d8d129p1913a6jsnd7762e38bc5c',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
          }
        };
          useEffect(() => {
            
            axios.request(options).then(function (response) {
           
             
              setdata(response.data.value)

              //console.log('data',data[0].image.thumbnail.contentUrl)
            }).catch(function (error) {
              console.error(error);
            });
          
          }, [])
          

  
   if(!data){
    return ( <Box sx={{ height:'80vh',display: 'flex',justifyContent:'center',alignItems:'center'}}>
    <CircularProgress />
  </Box>)
  } 
        return (
          <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Latest News</title>
      </Head>
         
          {data&&<Box sx={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center',marginTop:'2rem',padding:'1rem'}} >
          
            {data.map((item,idx)=>{


             return  <Card key={idx} sx={{display:'grid',  maxWidth: 345 }}>
                <Link href={item.url} >
                <a target="_blank"  className={styles.link}>


                <CardActionArea>
                <Image
                    
                    src={item.image?item.image.thumbnail.contentUrl: urlbitcoin}
                    alt="Picture of the news"
                    width={item.image?item.image.thumbnail.width:500}
                    height={item.image?item.image.thumbnail.height:500}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                </a>
                </Link>
             </Card>
            

            })}
          </Box>}
          </>
  )
}


/*
{item.image.thumbnail.contentUrl}
*/