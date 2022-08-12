import { useState } from "react";

import { Box, Tab, Tabs,Grid } from "@mui/material";
import ChartWrapper from "../ChartWrapper";
import MarketsData from "../../coinId/markets-data";
import PriceStatics from "../../coinId/PriceStatics";
import ChangeTab from "../UI/changetab";



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

  //Overview    Markets  Converter      Historical Data
const MyInfoTab = (props) => {
    const [value, setValue] =useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    

    return (
         <Box>
           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Markets" {...a11yProps(1)} />
                
              </Tabs>
           </Box>

           <TabPanel value={value} index={0}>

              <Grid container >
                 <Grid item xs={12} md={8}>
                  <ChartWrapper coin={props.coininfo.id} coininfo={props.coininfo}/>
                  
                 </Grid>

                 <Grid item xs={12} md={4}>
                   <PriceStatics coininfo={props.coininfo}/>
                 </Grid>
            </Grid>
           </TabPanel>
           
           <TabPanel value={value} index={1}>
                <MarketsData coininfo={props.coininfo} coin={props.coininfo.id} totalvolume={props.coininfo.market_data.total_volume.usd}/>
           </TabPanel>
          
      

        </Box> );
}
 
export default MyInfoTab;


/*
<Grid container >
            <Grid item xs={12} md={8}>
                <MyInfoTab coin={coininfo.id}/>
            </Grid>

            <Grid item xs={12} md={4}>
                <h1>second grid element</h1>
            </Grid>
            </Grid>
*/