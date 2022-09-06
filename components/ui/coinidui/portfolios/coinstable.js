import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Tooltip from '@mui/material/Tooltip';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from "react";
import AddTransactionForm from "./addTransactionForm";

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






        const perm={
            d7: -5.93958,
            h1: -0.21082,
            h24: -1.54084,
            id: "ripple",
            image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
            market_cap: 16239538028,
            market_cap_rank: 7,
            price: 0.326195,
            symbol: "xrp",
        }


        const CoinsTable = ({currentdata,portfolioid}) => {
          console.log(currentdata)

          const [TransactionForm,setTransactionForm]=useState(false)
          const [coinForm,setcoinForm]=useState({})

          const columns = [
            {field:'', headerName:'', width:50,sortable:false,renderCell:(params)=>(<Box><StarBorderIcon style={{fill: "green"}} color='primary'/></Box>)},
            { field: 'market_cap_rank', headerName: '#',headerAlign: 'left',align: 'left', width: 40},
            { field: 'image', headerName: 'name',headerAlign: 'left',align: 'left', width: 170 , renderCell: (params) => (<Link href={'/coin/'+params.id}><Box sx={{display:'flex '}}>
              <Image
              src={params.value}
              alt="Picture of the author"
              width={25}
              height={25}
              marginleft={30}
            />
            <Typography sx={{marginLeft:'13px'}}>{params.id}</Typography>
            {/* {params.map(x=>{
              return <Typography>{x}</Typography>
            })} */}
            </Box>
            </Link>
          )   },

            


        
          { field: 'price', headerName: 'price',headerAlign: 'left',align: 'left', width: 150,...usdPrice },
          {field:'h1',headerName:'1h',headerAlign: 'left',align: 'left',width:150,valueFormatter: (params) => {
            if (params.value == null) {
              return '?';
            }
            const valueFormatted = Number(params.value ).toFixed(1).toLocaleString();
            return `${valueFormatted} %`;
          }, },
        
          {field:'h24',headerName:'24h',headerAlign: 'left',align: 'left',width:150,valueFormatter: (params) => {if (params.value == null) { return '?';}
            const valueFormatted = Number(params.value).toFixed(1).toLocaleString();
            return `${valueFormatted} %`;
          },},
        
          {field:'d7',headerName:'7d',headerAlign: 'left',
          align: 'left',width:150,valueFormatter: (params) => {if (params.value == null) {  return '?';}
        
            const valueFormatted = Number(params.value).toFixed(1).toLocaleString();
            return `${valueFormatted} %`;
          },},
        
          /* {field:'total_volume',headerName:'24h Volume' ,headerAlign: 'left',
          align: 'left',width:210,...usdPrice}, */
        
          {field:'market_cap', headerName:'Mkt Cap',headerAlign: 'left',
          align: 'left', width:210, ...usdPrice},

          {field:'holdings', headerName:'holdings',headerAlign:'left',align: 'left', width:210 },
          {field:'id_symbol', headerName:'PNL',headerAlign:'left',align: 'left', width:110 ,
              renderCell:(params)=>(<Box sx={{width:'100%'}}>
                                        <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                         <Typography>+100$</Typography>
                                         <Tooltip  title="Add transaction" placement="left" arrow>
                                          <AddIcon  onClick={()=>addTransactionFormhandler(params.value.id,params.value.symbol,params.value.price)} sx={{cursor:'pointer',color:'blue'}}/>
                                          </Tooltip>
                                        </Box>
                                        <Box  sx={{display:'flex',justifyContent:'space-between'}}>
                                        <Typography>+10%</Typography>
                                        <Tooltip  title="View transactions" placement="left" arrow>
                                        <ArrowForwardIosIcon  sx={{cursor:'pointer',color:'blue'}}/>
                                        </Tooltip>
                                        </Box>
                                    </Box>)}
                                    
        ];
            
          const addTransactionFormhandler=(id,symbol,price)=>{
            
           setcoinForm({id,symbol,price})
           setTransactionForm(!TransactionForm)
          }
            
            return ( 
                <Box
                sx={{marginTop:'3rem',
                height: '100%',
                width: '100%',
                '& .positive': {
                  
                  color: 'green',
                },
                '& .negative': {
                  
                  color: 'red',
                },
              }}>
              {TransactionForm&&<AddTransactionForm TransactionForm handleClose={addTransactionFormhandler} id={coinForm.id} symbol={coinForm.symbol} price={coinForm.price} portfolioid={portfolioid}/>}
              <DataGrid
              autoHeight={true}
        
              hideFooterPagination
              hideFooter
              hideFooterSelectedRowCount
                rows={currentdata}
                columns={columns}
                initialState={{ pinnedColumns: { left: ['id'] } }}
                getCellClassName={(params) => {
                  if (params.field === 'price_change_percentage_1h_in_currency' ||
                   params.field === 'price_change_percentage_24h'||
                   params.field === 'price_change_percentage_7d_in_currency'
                    ) {
                        return params.value >= 0?  'positive' : 'negative' ;
                  }
                  
                }}
                
              />
                </Box>
             );
        }
        
        export default CoinsTable;