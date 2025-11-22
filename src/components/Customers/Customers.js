import { useEffect, useState } from "react"
import Table from '../Table/Table'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BasicModal from "../Modal/Modal";

const Customers = () =>{

    const [data, setData] = useState({})
    const [error, setError] = useState("")

useEffect(()=>{
const fetching = async() =>{
    try{
        const _result = await fetch('https://ohanahome.altervista.org/public/customers')
        if(!_result.ok){
            console.log("errore") 
            setError(_result.status)
            throw new Error(_result.status)
        }else{
        const result = await _result.json()
        setData(result.data)
        }
    }catch(_error){
        console.error(_error)
        setError(_error)
    }
}
fetching() 
},[])

    return(
        <>
        <div className="header">
            <h3>Bookings</h3>
            <div className="box">
            <SearchIcon/>
             <InputBase placeholder="Search..." sx={{'border': '1px solid #1976d2','borderRadius': '5px'}}/>
             <BasicModal/> 
             </div>
        </div>
        {data.length > 0  ?
            <Table data={data}/>
        : <h1>Error {error.message}</h1>
        }
        </>
)}

export default Customers