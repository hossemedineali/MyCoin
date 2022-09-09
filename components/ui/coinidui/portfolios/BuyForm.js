import { Button, Fade, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import { useState } from "react";
import axios from "axios";


        
        
        
        
        const BuyForm = ({id,symbol,price,portfolioid,handleClose,updated}) => {

           

            const[mode,setmode]=useState('Price per coin')
            
            
            const [pricePerCoin, setpricePerCoin] = useState(price)
            const [pricePerCoinerror,setpricePerCoinerror]=useState({iserror:false,message:''})
            
            const [quantity, setquantity] = useState(1)
            const [quantityerror,setquantityerror]=useState({iserror:false,message:''})

            
            const [totalSpent, settotalSpent] = useState(pricePerCoin*quantity)
            const [totalSpenterror,settotalSpenterror]=useState({iserror:false,message:''})

            const changemodeHandler=()=>{
                return mode=='Price per coin'?setmode('Total spent'):setmode('Price per coin')
                
            }

            const onChangeHanler=(e)=>{
                       
                        switch(e.target.id){
                            case 'Price per coin': 
                            break;
                            case 'Total spent':settotalSpenterror({iserror:false,message:''})
                            break;
                            case 'quantity':setquantityerror({iserror:false,message:''})
                            break;
                        }
                if(mode=='Price per coin'){
                    
                    if(e.target.id==mode){
                        setpricePerCoin(+e.target.value)
                        settotalSpent(+e.target.value*quantity)
                    }else{
                        setquantity(+e.target.value)
                        settotalSpent(+e.target.value*pricePerCoin)
                    }
                    
                }else{
                    
                    if(e.target.id==mode){
                       
                        settotalSpent(+e.target.value)
                        setpricePerCoin(+e.target.value/quantity)
                    }else{
                        setquantity(+e.target.value)
                        setpricePerCoin(+totalSpent/e.target.value)
                    }
                }
                
            }

            const  handelSubmit= async()=>{
                
                if(totalSpent==''){
                   
                    settotalSpenterror({iserror:true,message:'please enter a positive number'})
                }else if(pricePerCoin<=0||isNaN(pricePerCoin)){
                        setpricePerCoinerror({iserror:true,message:'please enter a positive number'})
                    }else if(quantity<=0||isNaN(quantity)){
                         setquantityerror({iserror:true,message:'please enter a positif number'}) }
                else{
                    updated()
                    handleClose()
                    const values={
                        type:'buy',
                        quantity:quantity,
                        pricePerCoin:pricePerCoin,
                        total:totalSpent,
                        uid:localStorage.getItem('MYcoinuid'),
                        portfolioid,
                        coinid:id

                    }
                    
                   await axios({
                        method:'POST',
                        url:'/api/addTransaction',
                        data:values
                    }).then(response=>{

                    })
                }
                   

            }
            return ( 
                <Fade in={true}>
            <Box>
                <Box  sx={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                    <Typography sx={{marginRight:'auto'}}>{mode}</Typography>
                    <Box onClick={changemodeHandler} sx={{display:'flex',color:'blue',cursor:"pointer"}}><CompareArrowsIcon/> <Typography>{mode=='Price per coin'?'Total spent':'Price per coin'}</Typography> </Box>
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
                        { mode=='Total spent'&&<TextField
                        value={totalSpent}
                        error={totalSpenterror.iserror}
                        helperText={totalSpenterror.message}
                        onChange={onChangeHanler}
                        type="number"
                        id='Total spent'
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
                    <Typography sx={{marginRight:'auto'}}>{mode=='Price per coin'?'Total spent':'Price per coin'}</Typography>
                    {mode=='Price per coin'&&<TextField
                        disabled
                        variant="filled"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '90%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position='start' sx={{margin:'0 1rem'}}>usd    {totalSpent?totalSpent:''}</InputAdornment>
                             
                        }}
                        />}
                        {mode=='Total spent'&&<TextField
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
        
        export default BuyForm;