import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

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

const columns = [
    {field:'', headerName:'', width:50,sortable:false},
  { field: 'market_cap_rank', headerName: '#',headerAlign: 'left',
  align: 'left', width: 90 },
  { field: 'image', headerName: 'name',headerAlign: 'left',
  align: 'left', width: 170 , renderCell: (params) => (
          
    <Link href={'/coin/'+params.id}>
    <Box sx={{display:'flex '}}>
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
  { field: 'current_price', headerName: 'price',headerAlign: 'left',
  align: 'left', width: 150,...usdPrice },
  {field:'price_change_percentage_1h_in_currency',headerName:'1h',headerAlign: 'left',
  align: 'left',width:150,valueFormatter: (params) => {
    if (params.value == null) {
      return '?';
    }

    const valueFormatted = Number(params.value ).toFixed(1).toLocaleString();
    return `${valueFormatted} %`;
  }, },
  {field:'price_change_percentage_24h',headerName:'24h',headerAlign: 'left',
  align: 'left',width:150,valueFormatter: (params) => {
    if (params.value == null) {
      return '?';
    }

    const valueFormatted = Number(params.value).toFixed(1).toLocaleString();
    return `${valueFormatted} %`;
  },},
  {field:'price_change_percentage_7d_in_currency',headerName:'7d',headerAlign: 'left',
  align: 'left',width:150,valueFormatter: (params) => {
    if (params.value == null) {
      return '?';
    }

    const valueFormatted = Number(params.value).toFixed(1).toLocaleString();
    return `${valueFormatted} %`;
  },},


  {field:'total_volume',headerName:'24h Volume' ,headerAlign: 'left',
  align: 'left',width:210,...usdPrice},


  
  {field:'market_cap', headerName:'Mkt Cap',headerAlign: 'left',
  align: 'left', width:210, ...usdPrice},

  

];


const rows =[{
    _id:1,
    ath: 69045,
ath_change_percentage: -66.44135,
ath_date: "2021-11-10T14:24:11.849Z",
atl: 67.81,
atl_change_percentage: 34070.22764,
atl_date: "2013-07-06T00:00:00.000Z",
circulating_supply: 19114393,
current_price: 23044,
fully_diluted_valuation: 483537402596,
high_24h: 23322,
id: "bitcoin",
image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
last_updated: "2022-08-06T23:39:35.975Z",
low_24h: 23026,
market_cap: 440120187782,
market_cap_change_24h: -3842376086.2078857,
market_cap_change_percentage_24h: -0.86547,
market_cap_rank: 1,
max_supply: 21000000,
name: "Bitcoin",
price_change_24h: -214.09320105543884,
price_change_percentage_1h_in_currency: -0.5911393016532845,
price_change_percentage_7d_in_currency: -3.3686196430795095,
price_change_percentage_24h: -0.9205,
price_change_percentage_24h_in_currency: -0.9205006949012187,
roi: null,
symbol: "btc",
total_supply: 21000000,
total_volume: 14311802708,
}]


  

export default function Coins(props) {
    
  return (
        <Box
        sx={{
        height: '100%',
        width: '100%',
        '& .positive': {
          
          color: 'green',
        },
        '& .negative': {
          
          color: 'red',
        },
      }}>

      <DataGrid
      autoHeight={true}

      hideFooterPagination
      hideFooter
      hideFooterSelectedRowCount
        rows={props.currentdata}
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