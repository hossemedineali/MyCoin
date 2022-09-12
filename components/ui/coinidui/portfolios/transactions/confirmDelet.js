import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'lightBlue',
    border: '2px solid #000',
    boxShadow: '24 75 55 100',
    pt: 2,
    px: 4,
    pb: 3,
  };


export default function ConfirmDelet({open,handleClose,handleConfirm}) {
   
   

    return (
      
       
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{  width: 200,...style}}>
            <Typography variant='h5'>Remove Transaction</Typography>
            <Typography variant='p'>Are you sure want to remove this transaction?</Typography>
           <Box sx={{display:'flex',justifyContent:'space-between',width:'80%'}}>

            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
           </Box>

          </Box>
        </Modal>
      
    );
  }


  