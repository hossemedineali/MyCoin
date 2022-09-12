import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import {  Paper, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useState } from 'react';

import ConfirmDelet from '../transactions/confirmDelet'


import axios from 'axios';

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    
    const usdPrice = {
        type: 'number',
        
        valueFormatter: ({ value }) => currencyFormatter.format(value),
        cellClassName: 'font-tabular-nums',
    };


    const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs:'95%',
        s:'90%',
        lg:'80%'

    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:'auto',
    display:'flex',
    flexDirection:'column',
    gap:1.5,
    height:'90vh'
    };

   
    export default function ShowTransactions({open,handleClose,data,portfolioid,updated}) {
       // console.log('data from show transactions',data)
       console.log('portfolioid',portfolioid)
        const [ConfirmdeletModal, setConfirmdeletModal] = useState(false)
        const [transactionToDelete, settransactionToDelete] = useState({})

        const [snackopen, setsnackopen] = useState(false)
        //console.log('showTransaction data ',data)
        let array=[]

        const formatdate=(data)=>{
            return (new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour:'2-digit',
                minute:'2-digit'
              }).format(data))
        }
        

        Object.values(data.db).map((item,idx)=>{
            array.push({
               ...item,
            })
        })

        
        const columns=[
            {field:'type',headerName:'type',headerAlign: 'left',align: 'left', width: 100,},
            {field:'id',headerName:'date',headerAlign: 'left',align: 'left', width:170,
            renderCell:(params)=>(<Typography wrap sx={{display:'flex',}}>{formatdate(params.value)}</Typography>)},
            {field:'quantity',headerName:'quantity',headerAlign: 'left',align: 'left', width: 100,},
            
            {field:'pricePerCoin',headerName:'price',headerAlign: 'left',align: 'left', width: 100,},
            {field:'',headerName:'actions',headerAlign: 'left',align: 'left', width: 100,
            renderCell:(params)=>(<DeleteForeverOutlinedIcon
             onClick={()=>{setConfirmdeletModal(true) ;settransactionToDelete({transactioId:params.id,coinId:data.coindata.id});}} />)
            },
            
        ]


     


    const handleConfirmConfirmDelet=async()=>{
        setConfirmdeletModal(false)

        let formateddata=[]
        console.log('from handleConfirmConfirmDelet ,this is transactio to delet ',transactionToDelete)

        console.log('portfolioid',portfolioid)
        console.log('data for the coin ',data.db)


        Object.values(data.db).forEach(item=>{
             if(item.id!=transactionToDelete.transactioId){
                    formateddata.push(item)
            } 
            console.log(item)
        })
        console.log('formateddata',formateddata)
        const id =localStorage.getItem('MYcoinuid')
        
        //await updateDoc(doc(db,"users",id,"portfolios",portfolioid,transactionToDelete.coinId),{})
       
        //const docToUpdateref=doc(db,"users",id,"portfolios",portfolioid)
       // await updateDoc(docToUpdateref,transactionToDelete.coinId,formateddata)
       await axios({
        method:'POST',
        url:'/api/daleteTransaction',
        data:{
            coindata:formateddata,
            id,
            portfolioid,
            coin:transactionToDelete.coinId
            

        }
       })
        .then(response=>{
            
            updated()
            settransactionToDelete({})
            setsnackopen({isOpen:true,message:'Transaction deleted successfully'})
        })
        .catch(error=>{
            updated()
            setsnackopen({isOpen:true,message:'somthing went wrong please try again after a minute'})
        })
    }


    const handleCloseConfirmDeletModal=()=>{
        setConfirmdeletModal(false)
    }
    const handleSnackClose = () => {
   
        setsnackopen({isopen:true,message:''});
      };
    return (
        <div>
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        
            <Box sx={style}>
            <CloseIcon 
        onClick={handleClose}
        sx={{display:{xs:'flex',md:'none'},position:'relative',right:15,top:-25,cursor:'pointer',background:'lightgrey'}}/>

                <Box sx={{display:'flex' ,gap:1}}>
                <Image  
                    src={data.coindata.image}
                    alt="Picture of the author"
                    width={20}
                    height={20}
                    marginleft={10}/>
                    <Typography>{data.coindata.id}</Typography>
                </Box>

                <Box sx={{display:'flex',gap:2}}>
                    <Typography>{(data.coindata.price)}</Typography>
                    <Typography>{(data.coindata.h24).toFixed(1)}%</Typography>
                </Box>

                <Box>
                    <Box sx={{display:'flex',width:{md:'90' ,xs:'95%'},margin:{md:'0',xs:'2rem auto'},gap:'1rem', flexDirection:{sm:'row',xs:'column'}}} >
                        <Paper sx={{padding:'0.5rem' ,textAlign:'center'}}>
                            <Typography>{currencyFormatter.format(data.coincurrentvaluation)}</Typography>
                            <Typography>Holding Value</Typography>
                        </Paper>
                        <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                            <Typography>{currencyFormatter.format(data.totalcoinholding)}</Typography>
                            <Typography>Holdings</Typography>
                        </Paper>
                        <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                            <Typography >{currencyFormatter.format(data.totalCost)}</Typography>
                            <Typography>Total cost</Typography>
                        </Paper>

                        <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                            <Typography >To do</Typography>
                            <Typography>Average Net Cost</Typography>
                        </Paper>

                        <Paper sx={{padding:'0.5rem',textAlign:'center'}}>
                            <Typography >To do</Typography>
                            <Typography>Profit /Loss</Typography>
                        </Paper>
                    </Box>
                </Box>
                <Typography variant='h5'>Transactions</Typography>

                <DataGrid
                    autoHeight={true}
                    
                    hideFooterPagination
                    hideFooter
                    
                        rows={array}
                        columns={columns}
                        initialState={{ pinnedColumns: { left: ['id'] } }}
                        getCellClassName={(params) => {
                        if (params.field === 'h1' ||
                        params.field === 'h24'||
                        params.field === 'd7'
                            ) {
                                return params.value >= 0?  'positive' : 'negative' ;
                        }
                        
                        }}/>
            <ConfirmDelet open={ConfirmdeletModal} handleClose={handleCloseConfirmDeletModal} handleConfirm={handleConfirmConfirmDelet}/>
            </Box>
        </Modal>
        <Snackbar
                        open={snackopen}
                        autoHideDuration={3000}
                        onClose={handleSnackClose}
                        message={snackopen.message}
            
                    />
        </div>
    );
    }
