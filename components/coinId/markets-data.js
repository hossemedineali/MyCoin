import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';




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

const columns =[
    {field : 'id' ,headerName:'#', sortable :true ,flex: 1,border: 0, },
    {field : 'exchange' ,headerName:'exchange', sortable :true , flex: 1,border: 0,},
    {field : 'pair' ,headerName:'pair', sortable :true ,flex: 1  },
    {field : 'price' ,headerName:'price',...usdPrice,  sortable :true ,flex: 1 ,},
    {field : 'volume_24h' ,headerName:'24h volume',...usdPrice, sortable :true ,flex: 1},
    {field : 'volume_percentage' ,headerName:'volume %', sortable :true , flex: 1,headerAlign:'left', },
    {field : 'last_traded' ,headerName:'last traded', sortable :true ,flex: 1  },
    {field : 'trust_score' ,headerName:'trust score', sortable :true ,flex: 1,renderCell:(params)=>(
    <Box>{params.value=='green'? 
    <Box sx={{width:'15px' , aspectRatio:'1/1',background:'green',borderRadius:'50%'}}></Box> : 
    <Box sx={{width:'15px' , aspectRatio:'1/1',background:'red',borderRadius:'50%'}}></Box>}</Box>) },
    ]

    const MarketsData = (props) => {


        console.log('props.symbol', props)
    let  formateddata =[]

    function istradedrecently(date){
        const current_date= new Date().getTime()
        if ((current_date - new Date (date).getTime()) > 86400000 )
            return 0
        else  
        return 1
    }

    function dataformat (){
        formateddata= props.coininfo.tickers.map((item, idx)=>{
            {
                return {
                    id :idx,
                    exchange:item.market.name,
                    pair: props.coininfo.symbol+'/'+item.target,
                    price:item.last,
                    volume_24h:item.converted_volume.usd, //Ticker volume provided en usd btc and eth need change to get all data when implimenting the cuurancy change feature
                    volume_percentage:((item.converted_volume.usd/props.totalvolume)*100).toLocaleString(),
                    last_traded: istradedrecently(item.last_traded_at)==1 ? 'recently' : 'more then one day ago',
                    trust_score:item.trust_score
                }
            }
        })
    } 
    dataformat ()

    
    return ( 
    <Box>
        <Typography variant='h5'>{props.coin} Markets</Typography>
        <DataGrid sx={{border: 0,}}
            autoHeight={true}
            autoWidth={true}
            hideFooterPagination
            hideFooter
            hideFooterSelectedRowCount
            columns={columns}
            rows={formateddata}
        />

    </Box> );
}
 
export default MarketsData;