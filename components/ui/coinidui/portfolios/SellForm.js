import { Button, Fade, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import { useState } from "react";
import axios from "axios";


        
        
        
        
        const SellForm = ({id,symbol,price,portfolioid,handleClose}) => {

           

            const[mode,setmode]=useState('Price per coin')
            
            
            const [pricePerCoin, setpricePerCoin] = useState(price)
            const [pricePerCoinerror,setpricePerCoinerror]=useState({iserror:false,message:''})
            
            const [quantity, setquantity] = useState(1)
            const [quantityerror,setquantityerror]=useState({iserror:false,message:''})

            
            const [totalReceived, settotalReceived] = useState(pricePerCoin*quantity)
            const [totalReceivederror,settotalReceivederror]=useState({iserror:false,message:''})

            const changemodeHandler=()=>{
                return mode=='Price per coin'?setmode('Total Received'):setmode('Price per coin')
                
            }

            const onChangeHanler=(e)=>{
                        console.log(e.target.id)
                       
                        switch(e.target.id){
                            case 'Price per coin': 
                            break;
                            case 'Total Received':settotalReceivederror({iserror:false,message:''})
                            break;
                            case 'quantity':setquantityerror({iserror:false,message:''})
                            break;
                        }
                if(mode=='Price per coin'){
                    
                    if(e.target.id==mode){
                        setpricePerCoin(e.target.value)
                        settotalReceived(e.target.value*quantity)
                    }else{
                        setquantity(e.target.value)
                        settotalReceived(e.target.value*pricePerCoin)
                    }
                    
                }else{
                    
                    if(e.target.id==mode){
                       
                        settotalReceived(e.target.value)
                        setpricePerCoin(e.target.value/quantity)
                    }else{
                        setquantity(e.target.value)
                        setpricePerCoin(totalReceived/e.target.value)
                    }
                }
                
            }

            const  handelSubmit= async()=>{
                console.log(totalReceived=='',totalReceived<0,isNaN(totalReceived))
                if(totalReceived==''){
                   
                    settotalReceivederror({iserror:true,message:'please enter a positive number'})
                }else if(pricePerCoin<=0||isNaN(pricePerCoin)){
                        setpricePerCoinerror({iserror:true,message:'please enter a positive number'})
                    }else if(quantity<=0||isNaN(quantity)){
                         setquantityerror({iserror:true,message:'please enter a positif number'}) }
                else{
                    handleClose()
                    const values={
                        type:'sell',
                        quantity:quantity,
                        pricePerCoin:pricePerCoin,
                        total:totalReceived,
                        uid:localStorage.getItem('MYcoinuid'),
                        portfolioid:portfolioid,
                        coinid:id

                    }
                    
                   await axios({
                        method:'POST',
                        url:'/api/addTransaction',
                        data:values
                    }).then(response=>{
                        console.log(response.data)
                    })
                }
                   

            }
            
            return ( 
                <Fade in={true}>
            <Box>
                <Box  sx={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                    <Typography sx={{marginRight:'auto'}}>{mode}</Typography>
                    <Box onClick={changemodeHandler} sx={{display:'flex',color:'blue',cursor:"pointer"}}><CompareArrowsIcon/> <Typography>{mode=='Price per coin'?'Total Received':'Price per coin'}</Typography> </Box>
                </Box>
                <Box >
               { mode=='Price per coin'&&<TextField
                        value={pricePerCoin}
                        error={pricePerCoinerror.iserror}
                        helperText={pricePerCoinerror.message}
                        onChange={onChangeHanler}
                        type="number"
                        id={mode}
                        sx={{ m: 1, width: '90%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">usd</InputAdornment>,
                        }}
                        />}
                        { mode=='Total Received'&&<TextField
                        value={totalReceived}
                        error={totalReceivederror.iserror}
                        helperText={totalReceivederror.message}
                        onChange={onChangeHanler}
                        type="number"
                        id='Total Received'
                        sx={{ m: 1, width: '90%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">usd</InputAdornment>,
                        }}
                        />}
                </Box>

                <Box sx={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                    <Typography sx={{marginRight:'auto'}}>Quantity</Typography>
                    <TextField
                        value={quantity}
                        error={quantityerror.iserror}
                        helperText={quantityerror.message}
                        onChange={onChangeHanler}
                        required
                        type="number"
                        id="quantity"
                        sx={{ m: 1, width: '90%' }}
                        InputProps={{
                            endAdornment: <InputAdornment position='end' sx={{margin:'0 1rem'}}>{symbol}</InputAdornment>,
                        }}
                        />

                </Box>
                <Box sx={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                    <Typography sx={{marginRight:'auto'}}>{mode=='Price per coin'?'Total Received':'Price per coin'}</Typography>
                    {mode=='Price per coin'&&<TextField
                        disabled
                        variant="filled"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '90%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position='start' sx={{margin:'0 1rem'}}>usd    {totalReceived?totalReceived:''}</InputAdornment>
                             
                        }}
                        />}
                        {mode=='Total Received'&&<TextField
                        disabled
                        variant="filled"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '90%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position='start' sx={{margin:'0 1rem'}}>usd    {pricePerCoin!=Infinity?pricePerCoin:''}</InputAdornment>
                             
                        }}
                        />}
                        
                </Box>

                <Box sx={{width:'80%',display:'flex',margin:'auto'}}>
                    <Button variant="outlined" sx={{marginRight:'auto'}}>Cancel</Button>
                    <Button variant="contained" onClick={handelSubmit}>Confirm</Button>
                </Box>
               

            </Box>
            </Fade>
             );
        }
        
        export default SellForm;
