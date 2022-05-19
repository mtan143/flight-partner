import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Container from '@material-ui/core/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import flightApi from '../../../Api/flightApi';
import { Archive } from '@material-ui/icons';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = useState(row.flightStatus);
    const classes = useRowStyles();
    const t = (List) => {
        let total = 0;
        for (var i = 0; i < 4; i++) {
            total += (List[i]?.quantity - List[i]?.remainingQuantity);
        };
        return total;
    };
    function formatVnd(n, currency) {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
    };
    const tMoney = (List) => {
        let total = 0;
        for (var i = 0; i < 4; i++) {
            total += (List[i]?.price * (List[i]?.quantity - List[i]?.remainingQuantity));
        };
        return total;
    }
    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{ textAlign: "center" }}>
                    {row.flightCode}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.name}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.departure}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.timeDeparture}-{row.timeArrival}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{t(row.classTypeList)}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.quantityTicket}</TableCell>
<<<<<<< Updated upstream
                <TableCell style={{ textAlign: "center" }}>{formatVnd(tMoney(row.classTypeList)," VNĐ")}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          value={status}
          onChange={ async (event) =>{
            setStatus(event.target.value);
            const data = JSON.stringify( {
                flightCode: row.flightCode,
                flightStatus: event.target.value,
            })
            {
                try{
                    await flightApi.updateStatus(data);
                }
                catch{
                    console.log("lỗi rồi bạn ơi!!!");
                }
            }
        }}
        >
          <MenuItem value="Khoi_Tao">Khởi tạo</MenuItem>
          <MenuItem value="Ha_Canh">Hạ cánh</MenuItem>
          <MenuItem value="Cat_Canh">Cất cánh</MenuItem>
          <MenuItem value="Huy">Hủy</MenuItem>
          <MenuItem value="Delay">Delay</MenuItem>
          <MenuItem value="Archive">Archive</MenuItem>
        </Select>
      </FormControl>
      </Box>
                                            </TableCell>
=======
                <TableCell style={{ textAlign: "center" }}>{formatVnd(tMoney(row.classTypeList), " VNĐ")}</TableCell>
>>>>>>> Stashed changes
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, color: '#FF6F00', backgroundColor: '#E8EAF6' }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi tiết chuyến bay
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'left', color: '#01579B' }}>
                                            Hạng ghế
                                        </TableCell>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'center', color: '#01579B' }}>
                                            Số lượng vé
                                        </TableCell>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'center', color: '#01579B' }}>
                                            Số lượng vé bán được
                                        </TableCell>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'center', color: '#01579B' }}>
                                            Giá vé
                                        </TableCell>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'center', color: '#01579B' }}>
                                            Tổng tiền
                                        </TableCell>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'center', color: '#01579B' }}>
                                            Tổng tiền bán được
                                        </TableCell>
                                        <TableCell style={{ fontSize: '17px', textAlign: 'center', color: '#01579B' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.classTypeList.map((flightDetailRow) => (

                                        <TableRow key={flightDetailRow.classTypes} >
                                            <TableCell component="th" scope="row" style={{ textAlign: 'left' }}>
                                                {flightDetailRow.classType}
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{flightDetailRow.quantity}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{(flightDetailRow.quantity - flightDetailRow.remainingQuantity)}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{formatVnd(flightDetailRow.price, " VNĐ")}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{formatVnd((flightDetailRow.price * flightDetailRow.quantity), " VNĐ")}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>
                                                {/* {Math.round(flightDetailRow.amount * row.price * 100) / 100} */}
                                                {formatVnd(flightDetailRow.price * (flightDetailRow.quantity - flightDetailRow.remainingQuantity), " VNĐ")}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
Row.propTypes = {
    // row: PropTypes.shape({
    //     flightCode: PropTypes.string.isRequired,
    //     name: PropTypes.string.isRequired,
    //     departure: PropTypes.string.isRequired,
    //     classTypeList: PropTypes.arrayOf(
    //         PropTypes.shape({

    //             price: PropTypes.number.isRequired,
    //             customerId: PropTypes.string.isRequired,
    //             date: PropTypes.string.isRequired,
    //         }),
    //     ).isRequired,
    //     time: PropTypes.string.isRequired,
    //     capital: PropTypes.number.isRequired,
    //     totalPrice: PropTypes.string.isRequired,
    //     totalTicket: PropTypes.number.isRequired,
    //     totalPriceTicket: PropTypes.string.isRequired,
    // }).isRequired,
};
export default function CollapsibleTable() {

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightList = await flightApi.getAll("AL978AWBCDVJ");
                setList(flightList.data);
            }
            catch (error) {
                console.log('Fail to fetch flight list', error);
            }
        }
        fetchFlights();
    }, []);
    const [list, setList] = useState([]);

    return (

        <TableContainer component={Paper} style={{ marginTop: '40px', }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Mã chuyến bay</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Tên chuyến bay</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Ngày khởi hành</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Thời gian</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Tổng vé bán được</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Tổng vé</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Tổng tiền bán được</TableCell>
                        <TableCell style={{ textAlign: "center", color: '#1BA0E2', fontSize: '20px' }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {list.map((row) => (
                        <Row key={row.flightCode} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

// export default DoanhThuList;