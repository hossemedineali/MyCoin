
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from "react";

import axios from 'axios';



function Paginate(props) {

   
   

    const [count, setcount] = useState(0)
    
    
    useEffect(() => {
      
        const fetchdata=async()=>{
            axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(response=>{
           
             setcount(Math.ceil((response.data).length/100))
            })
             .catch(err=>{
                 //
             })
            
        }
       
        fetchdata()
       
      },[]);
    
    
    return (<>
        <Stack spacing={2}>
      <Typography>Page: </Typography>
      <Pagination count={count} page={props.page} onChange={props.handleChange} />
    </Stack>
    </>  );
}



/* export async function getServerSideProps(){
    //fetch data
    const res = await fetch('https://api.coingecko.com/api/v3/coins/list')
    const posts = await res.json()

    return {
        props: {
           posts:posts
        }
    };
}
 */
  export default  Paginate;


  /*
 
  */




  //this code is after enhasment 

      /*
        const fetchdata=async()=>{
            axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(response=>{
             console.log((response.data).length)
             setcount(Math.ceil((response.data).length/100))
            })
             .catch(err=>{
                 console.log(err)
             })
            
        }
       
        fetchdata()
      */



        // code before enhancement 


        /*

         async function fetchdata(){
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list')
        const counts = await res.json()
        
        setcount(Math.ceil(counts.length/100))
       }
       
       fetchdata()

        */