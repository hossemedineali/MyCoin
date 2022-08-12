import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


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






  

export default function Coins(props) {



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

  { field: 'current_price', headerName: 'price',headerAlign: 'left',align: 'left', width: 150,...usdPrice },
  {field:'price_change_percentage_1h_in_currency',headerName:'1h',headerAlign: 'left',align: 'left',width:150,valueFormatter: (params) => {
    if (params.value == null) {
      return '?';
    }
    const valueFormatted = Number(params.value ).toFixed(1).toLocaleString();
    return `${valueFormatted} %`;
  }, },

  {field:'price_change_percentage_24h',headerName:'24h',headerAlign: 'left',align: 'left',width:150,valueFormatter: (params) => {if (params.value == null) { return '?';}
    const valueFormatted = Number(params.value).toFixed(1).toLocaleString();
    return `${valueFormatted} %`;
  },},

  {field:'price_change_percentage_7d_in_currency',headerName:'7d',headerAlign: 'left',
  align: 'left',width:150,valueFormatter: (params) => {if (params.value == null) {  return '?';}

    const valueFormatted = Number(params.value).toFixed(1).toLocaleString();
    return `${valueFormatted} %`;
  },},

  {field:'total_volume',headerName:'24h Volume' ,headerAlign: 'left',
  align: 'left',width:210,...usdPrice},

  {field:'market_cap', headerName:'Mkt Cap',headerAlign: 'left',
  align: 'left', width:210, ...usdPrice},
];
    
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