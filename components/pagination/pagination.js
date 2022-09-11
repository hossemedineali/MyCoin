
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from "react";



function Paginate(props) {

   

    const [count, setcount] = useState(0)
    
    useEffect(() => {
       async function fetchdata(){
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list')
        const count = await res.json()
        setcount(Math.ceil(count.length/100))
       }
       
       fetchdata()

       
      },[]);
    
    
    return (<>
        <Stack spacing={2}>
      <Typography>Page: {props.posts}</Typography>
      <Pagination count={count} page={props.page} onChange={()=>props.handleChange(count)} />
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




