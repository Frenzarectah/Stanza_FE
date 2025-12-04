import { useState } from "react"
import './booking.css'
import Table from '../Table/Table'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BasicModal from "../Modal/Modal";


const Bookings = () =>{
    const keys = ['Nome e Cognome','Data Arrivo', 'Data Partenza','N.Notti', 'N.Persone']

    const [stringToFind, setStringToFind] = useState("")

    return(
        <>
        <div className="header">
            <h3>Bookings</h3>
            <div className="box">
            <SearchIcon/>
             <InputBase placeholder="Search..." onChange={(e) => setStringToFind(e.target.value)} sx={{'border': '1px solid #1976d2','borderRadius': '5px'}}/>
             <BasicModal endpoint='bookings'/> 
             </div>
        </div>
        <Table endpoint="bookings" searchString={stringToFind} keys={keys}/>)
        </>  
    )
}
export default Bookings