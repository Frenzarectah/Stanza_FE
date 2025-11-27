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
        <TableCell align="right">{row.Arrive}</TableCell>
        <TableCell align="right">{row.Partenza}</TableCell>
        <TableCell align="right">{calculateDays(row.Partenza,row.Arrive)}</TableCell>
        <TableCell align="right">{row.person}</TableCell>
        </>
        ) : (
        <> 
        <TableCell component="th" scope="row">
          {row.name + " " + row.surname}
        </TableCell>
        <TableCell align="right">{row.gender}</TableCell>  
        <TableCell align="right">{row.nation}</TableCell>  
        <TableCell align="right">{row.birthday}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>   
        <TableCell align="right"><a href={row.document_url} target="_blank" rel="noopener noreferrer"><CloudDownloadRoundedIcon/></a></TableCell> 
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

  const {endpoint, searchString } = props;
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
        item['Nome'].toLowerCase().includes(searchString.toLowerCase()) 
      // || item['Cognome'].toLowerCase().includes(searchString.toLowerCase())
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
            { endpoint === 'bookings' ? (
            <>
            <TableCell>Nome e Cognome</TableCell>
            <TableCell align="right">Data Arrivo</TableCell>
            <TableCell align="right">Data Partenza</TableCell>
            <TableCell align="right">N. Notti</TableCell>
            <TableCell align="right">N. Persone</TableCell>
            </>) :
            (
              <>
            <TableCell>Nome e Cognome</TableCell>
            <TableCell align="right">Sesso</TableCell>
            <TableCell align="right">Nazionalità</TableCell>
            <TableCell align="right">Data di Nascita</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Telefono</TableCell>
            <TableCell align="right">Documento</TableCell>
            </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
           {!error ? (
            data.map((row) => (
              <Row key={row.id} row={row} endpoint={endpoint} />
            ))) : 
          (<div>{error}</div>)}
        </TableBody>
      </Table>
    </TableContainer>: <LinearProgress/>
  );
}