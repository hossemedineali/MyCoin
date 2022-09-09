import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Tab, Tabs,Grid } from "@mui/material";
import { useState } from 'react';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:"90%", md:'50%',l:'35%'},
  bgcolor: 'background.paper',
  border: '0.5px solid #000',
  boxShadow: 24,
  p: 2,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function AddTransactionForm({TransactionForm,handleClose,id,symbol,price,portfolioid,updated}) {

    
  const [open, setOpen] = useState(false);
  const [value, setValue] =useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

  return (
    <div>
      
      <Modal
        open={TransactionForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Buy" {...a11yProps(0)} />
                <Tab label="Sell" {...a11yProps(1)} />
                
              </Tabs>
           </Box>

           <TabPanel value={value} index={0}>

                <BuyForm id={id} symbol={symbol} price={price} portfolioid={portfolioid} handleClose={handleClose} updated={updated}/>
           </TabPanel>
           
           <TabPanel value={value} index={1}>
                <SellForm id={id} symbol={symbol} price={price} portfolioid={portfolioid} handleClose={handleClose} updated={updated}/>
           </TabPanel>
          
        </Box>
      </Modal>
    </div>
  );
}
