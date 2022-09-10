import axios from "axios"


export default async function handler(req,res){

    axios.get('https://api.coingecko.com/api/v3/coins/bitcoin').then(response=>{
   
    res.status(200).json({message:'test from test api',data:response.data})
    })
}