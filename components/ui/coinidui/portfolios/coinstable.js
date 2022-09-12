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
import ShowTransactions from "./transactions/showTransactions";

import axios from 'axios'

//((((((((((((((((()))))))))))))))))
import { doc, setDoc,addDoc,collection, updateDoc} from "firebase/firestore";
import {app,db} from "../../../../firebaseConfig"
//(((((((((((((((((((((())))))))))))))))))))))

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

        const CoinsTable = ({currentdata,portfolioid,updated}) => {

         

          
          const [ShowTransactionsModal, setShowTransactionsModal] = useState(false)
          const [idtoshowstransaction, setidtoshowstransaction] = useState({})

          const OpenShowTransactionsModal=(coinid)=>{
              setShowTransactionsModal(true)
              setidtoshowstransaction(prev=>coinid)
              }

          const CloseShowTransactions=()=>{
            setShowTransactionsModal(false)
          }

          let array=[]
          Object.entries(currentdata).map((item)=>{
            
            let percentagepnl=item[1].coincurrentvaluation>item[1].totalspentoncoin?+(item[1].coincurrentvaluation/item[1].totalspentoncoin):-(item[1].totalspentoncoin/item[1].coincurrentvaluation)

            array.push({
              ...item[1].coindata,
              holding:{
               // pnl:item[1].pnl,
              coinPercentageOfPortfolio:item[1].coinPercentageOfPortfolio,
              totalcoinholding:item[1].totalcoinholding,
              coincurrentvaluation:item[1].coincurrentvaluation,
              symbol:item[1].coindata.symbol
              },
              pnl:{
                pnl:item[1].pnl.toFixed(2),
                percentagepnl:percentagepnl.toFixed(2),
                id:item[1].coindata.id,
                symbol:item[1].coindata.symbol,
                price:item[1].coindata.price,
              }
            })

          })
          
       
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
        
        
          {field:'market_cap', headerName:'Mkt Cap',headerAlign: 'left',
          align: 'left', width:210, ...usdPrice},

          {field:'holding', headerName:'holdings',headerAlign:'left',align: 'left', width:210 ,
          renderCell:(params)=>(<Box sx={{width:'100%'}}>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography>${params.value.coincurrentvaluation.toFixed(2)} ({(params.value.coinPercentageOfPortfolio*100).toFixed(2)}%)</Typography>
          </Box>
          <Box  sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography>{params.value.totalcoinholding} {params.value.symbol}</Typography>
          </Box>
      </Box>),...usdPrice
      },
          {field:'pnl', headerName:'PNL',headerAlign:'left',align: 'left', width:110 ,
              renderCell:(params)=>(<Box sx={{width:'100%'}}>
                                        <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                         {params.value.pnl>0?<Typography color={'green'}>+{params.value.pnl}$</Typography>:<Typography color={'red'}>-{params.value.pnl}$</Typography>}
                                         <Tooltip  title="Add transaction" placement="left" arrow>
                                          <AddIcon  onClick={()=>addTransactionFormhandler(params.value.id,params.value.symbol,params.value.price)} sx={{cursor:'pointer',color:'blue'}}/>
                                          </Tooltip>
                                        </Box>
                                        <Box  sx={{display:'flex',justifyContent:'space-between'}}>
                                        {params.value.percentagepnl>0?<Typography color={'green'}>+{!isNaN(params.value.percentagepnl)?params.value.percentagepnl:0}%</Typography>:<Typography color={'red'}>-{!isNaN(params.value.percentagepnl)?params.value.percentagepnl:0}%</Typography>}
                                        

                                        <Tooltip  title="View transactions" placement="left" arrow>
                                        <ArrowForwardIosIcon onClick={()=>OpenShowTransactionsModal(params.value.id)}  sx={{cursor:'pointer',color:'blue'}}/>
                                        </Tooltip>
                                       
                                        
                                        </Box>
                                    </Box>)}
                                    
        ];
            
          const addTransactionFormhandler=(id,symbol,price)=>{
            
           setcoinForm({id,symbol,price})
           setTransactionForm(!TransactionForm)
          }



         /*  const deleteTransaction=async({coinId,transactioId})=>{
            let formateddata={}
            let newdata={}
            let id=localStorage.getItem('MYcoinuid')
            

            Object.keys(currentdata).forEach(key=>{
              formateddata[key]=currentdata[key]['db']
            })
            

             Object.keys(formateddata).forEach(key=>{
              
              newdata[key]=[]
              if(key!=coinId){
                Object.values(formateddata[key]).forEach(elm=>{
                  newdata[key].push(elm)
                  
                })
                
              }else{
                Object.values(formateddata[key]).forEach(elm=>{
                  if(elm.id!=transactioId){
                    newdata[key].push(elm)
                  }
                })
                //console.log(formateddata[key])
              }
            }) 



            const docToUpdateref=doc(db,"users",uid,"portfolios",portfolioid)
             
            updateDoc(docToUpdateref,coin,{})
    

            await setDoc(collection(db,id,'portfolios',portfolioid),newdata)
            .then(response=>{
              console.log(response)
            }).catch(error=>{
        
              console.log(error)
            })

           console.log(newdata)
           await axios({
              method:'post',
              url:'/api/daleteTransaction',
              data:{newdata,
              portfolioid,
              id

              }
           }).then(response=>{
            console.log(response)
           })
 
          
          }
           */
            
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

               {ShowTransactionsModal&& <ShowTransactions  open={ShowTransactionsModal} handleClose={CloseShowTransactions} data={currentdata[idtoshowstransaction]} portfolioid={portfolioid} updated={updated}/>}
              {TransactionForm&&<AddTransactionForm TransactionForm handleClose={addTransactionFormhandler} id={coinForm.id} symbol={coinForm.symbol} price={coinForm.price} portfolioid={portfolioid} updated={updated}/>}
              {array.length>0&&
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
                  
                }}
                
              />}
                </Box>
             );
        }
        
        export default CoinsTable;