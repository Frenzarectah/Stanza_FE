import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Input, Alert, InputLabel, Select, MenuItem,FormControl} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function BasicModal(props) {
  const {endpoint} = props
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isOK, setIsOK] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState({
    'name' : '',
    'surname' : '',
    'gender': 'male',
    'dailyPrice' : 20,
    'email': '',
    'nation': 'ENG',
    'phone' : '',
    'birthday': '',
    'document_type': 'id_doc'
  })

  const handleData = (e) =>{
    const {name, value } = e.target;
    setFormData({...formData, [name]: value})
    console.log(formData)
  }
  const handleDataFile = (e) =>{
    const {target} = e;
    const file = target.files[0]
    console.log(target.files)
    setFormData({...formData, document: file})
    console.log(formData)
  }

  const buildFormData = () =>{
    const fd = new FormData();
    Object.entries(formData).forEach(([key,value]) => {
      fd.append(key,value)  
    });
    return fd;
  }
  const sendData = async() =>{
    const fd = buildFormData()
    const response = await fetch(`https://ohanahome.altervista.org/public/${endpoint}`, {
        method: 'POST',
        body: fd
    })
    if(response.status === 201){
       setIsOK(true)
       setTimeout(()=>{
        handleClose()
       },2000)  
       setIsOK(false)
    }
    else{
      const err = await response.json()
      setIsOK(false)
      setError(err)
    }
    console.log(formData)
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
            <Typography>Create a New {endpoint} </Typography>
            { endpoint === 'bookings' ? 
            (
            <>
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
            </>
            ) :
            (
              <>
              <Box sx={{display: 'flex', margin: '10px'}}>
                  <Input placeholder='Name' name="name" value={formData.name} sx={{margin:'10px'}} onChange={handleData}></Input>
                  <Input placeholder='Surname' name="surname" value={formData.surname} sx={{margin:'10px'}} onChange={handleData}></Input> 
              </Box> 
              <Box sx={{margin: '10px', display:'flex', justifyContent: 'space-between'}}>
              <FormControl sx={{width: '47%'}}>     
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" name="gender" value={formData.gender} label="Age" onChange={handleData}>
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </Select>
              </FormControl>
              <FormControl sx={{width: '47%'}}>     
              <InputLabel id="demo-simple-select-label">Nation</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" name="nation" value={formData.nation} label="Nationality" onChange={handleData}>
                <MenuItem value="ITA">Italy</MenuItem>
                <MenuItem value="ENG">England</MenuItem>
              </Select>
              </FormControl>
              </Box>   
              <Box sx={{display: 'flex', margin: '10px', alignItems: 'center', justifyContent: 'center'}}> 
                      <label for="birthday">Data Di Nascita</label>     
                      <input type="date" name="birthday" sx={{margin:'10px'}} value={formData.birthday} onChange={handleData}/>
              </Box> 
              <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Input placeholder='Email' name="email" type="email" sx={{margin:'10px'}} value={formData.email} onChange={handleData}></Input>
                  <Input placeholder='Phone' name="phone" type="phone" sx={{margin:'10px'}} value={formData.phone} onChange={handleData}></Input>
              </Box>
              <Box sx={{display: 'flex', margin: '10px', alignItems: 'center', justifyContent: 'center'}}> 
                <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  Upload Document
                  <VisuallyHiddenInput type="file" onChange={handleDataFile} />
                </Button>
              </Box>
              </>
            )
            } 
            <Box sx={{textAlign: 'center'}}>
                <Button variant="contained" onClick={()=>sendData()}>Create!</Button>
            </Box>  
        </Box>
      </Modal>
    </div>
  );
}
