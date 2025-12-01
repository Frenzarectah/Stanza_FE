import { useState } from "react"
import Table from '../Table/Table'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BasicModal from "../Modal/Modal";

const Customers = () =>{
    const keys = ['Nome e Cognome', 'Sesso', 'Nazionalità','Data di nascita', 'Email', 'Telefono', 'Documento']

    const [stringToFind, setStringToFind] = useState("")

    return(
        <>
        <div className="header">
            <h3>Bookings</h3>
            <div className="box">
            <SearchIcon/>
             <InputBase placeholder="Search..." onChange={(e) => setStringToFind(e.target.value)} sx={{'border': '1px solid #1976d2','borderRadius': '5px'}}/>
             <BasicModal/> 
             </div>
        </div>
        <Table endpoint="customers" searchString={stringToFind} keys={keys}/>)
        </>  
    )
}
export default Customers