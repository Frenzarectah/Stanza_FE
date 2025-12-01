import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import { LinearProgress } from "@mui/material"
import { useState, useEffect } from 'react';
function Row(props) {
  const { row, endpoint } = props;
  const [open, setOpen] = React.useState(false);

  const calculateDays = (date1,date2)=>{
    const _date1 = new Date(date1);
    const _date2 = new Date(date2);
    const diffTime = Math.abs(_date2 - _date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays; 
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        { endpoint === 'bookings' ? ( 
          <>
        <TableCell component="th" scope="row">
          {row.Nome + " " +row.Cognome}
        </TableCell>
        <TableCell>{row.Arrive}</TableCell>
        <TableCell>{row.Partenza}</TableCell>
        <TableCell>{calculateDays(row.Partenza,row.Arrive)}</TableCell>
        <TableCell>{row.person}</TableCell>
        </>
        ) : (
        <> 
        <TableCell component="th" scope="row">
          {row.name + " " + row.surname}
        </TableCell>
        <TableCell>{row.gender}</TableCell>  
        <TableCell>{row.nation}</TableCell>  
        <TableCell>{row.birthday}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>   
        <TableCell><a href={row.document_url} target="_blank" rel="noopener noreferrer"><CloudDownloadRoundedIcon/></a></TableCell> 
        </> 
      )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={ endpoint === 'bookings' ? 6 : 8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
               { /* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  data: PropTypes.object.isRequired
}

export default function CollapsibleTable(props) {

  const {endpoint, searchString, keys } = props;
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [originalData, setOriginalData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async() =>{
            try{
            const apidati = await fetch(`https://ohanahome.altervista.org/public/${endpoint}`)
            if(!apidati.ok){
                throw new Error(`Response status: ${apidati.status}`)
            }
            const result = await apidati.json()
            setData(result.data)
            setOriginalData(result.data)
            setIsLoading(false)
            }catch(error){
                console.log(error)
                setError(error)
            }
        }
        fetchData()
    },[endpoint])

    useEffect(() => {
    if (!searchString) {
        setData(originalData);
        setError("")
        return;
    }

    const filteredData = originalData.filter((item) =>
        item['name'].toLowerCase().includes(searchString.toLowerCase()) 
       || item['surname'].toLowerCase().includes(searchString.toLowerCase())
      );
      if(filteredData.length > 0) {
        setData(filteredData)
      }else{ 
        setError("0 rows affected")
        return;
      }
    },
    [searchString, originalData]);

  return (
    !isLoading ?
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <>
            {keys.map((key)=><TableCell>{key}</TableCell>) }
            </>
          </TableRow>
        </TableHead>
        <TableBody>
           {!error ? (
            data.map((row) => (
              <Row key={row.id} row={row} endpoint={endpoint} keys={keys} />
            ))) : 
          (<TableCell>{error}</TableCell>)}
        </TableBody>
      </Table>
    </TableContainer>: <LinearProgress/>
  );
}