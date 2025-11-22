import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [isOK, setIsOK] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState({})

  const handleData = (e) =>{
    const {name, value } = e.target;
    setFormData({...formData, [name]: value, dailyPrice : 20})
  }
  const sendData = async() =>{
    const response = await fetch('https://ohanahome.altervista.org/public/bookings', {
        method: 'POST',
       headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(formData)
    })
    if(response.status === 201){
       setIsOK(true)
       setTimeout(()=>{
        handleClose()
       },1000)  
       setIsOK(false)
    }
  }
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
             {isOK &&         
                <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success">Booking Added!</Alert>
            }
            <Typography>Create a New Booking</Typography>
            <Box sx={{display: 'flex', margin: '10px'}}>
                <Input placeholder='Name' name="Nome" value={formData.name} sx={{margin:'10px'}} onChange={handleData}></Input>
                <Input placeholder='Surname' name="Cognome" value={formData.surname} sx={{margin:'10px'}} onChange={handleData}></Input> 
            </Box> 
            <Box sx={{display: 'flex', margin: '10px', justifyContent: 'space-between'}}>      
                <Input placeholder='eMail' type="email" name="Email" value={formData.email} sx={{margin:'10px'}} onChange={handleData}></Input>
                <Input placeholder='Phone'  name="tel" sx={{margin:'10px'}} value={formData.phone} onChange={handleData}></Input>  
            </Box>   
            <Box sx={{display: 'flex', margin: '10px', alignItems: 'center'}}> 
                    <label for="arrive">Data Arrivo</label>     
                    <input type="date" name="Arrive" sx={{margin:'10px'}} value={formData.Arrive} onChange={handleData}/>
                    <label for="arrive">Data Partenza</label>     
                    <input type="date" name="Partenza" sx={{margin:'10px'}}value={formData.Partenza} onChange={handleData}/>
            </Box> 
            <Box sx={{textAlign: 'center'}}>
                <Input placeholder='N. of Persons' name="person" type="number" sx={{margin:'10px'}} value={formData.person} onChange={handleData}></Input>
            </Box> 
            <Box sx={{textAlign: 'center'}}>
                <Button variant="contained" onClick={()=>sendData()}>Create!</Button>
                </Box>  
        </Box>
      </Modal>
    </div>
  );
}
