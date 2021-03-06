import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import BasicSelect from '../../BasicSelect/Index';
import BasicDatePicker from '../../BasicDatePicker/Index';
import BasicButton from '../../BasicButton/Index';
import SimplePaper from '../../SimplePaper/Index';
import { Grid } from '@mui/material';
import './add.css'
import { useForm } from 'react-hook-form';
import InputField from '../../FormControl/InputField/Index';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SelectField from '../../FormControl/SelectField/Index';
import dateFormat from 'dateformat';
import moment from 'moment';
import { format } from 'date-fns';
import BasicTimePicker from './../../BasicTimePicker/index';
import flightApi from '../../Api/flightApi';
import { alpha } from '@material-ui/core/styles'

function Add(props) {
    const [date, setDate] = useState(new Date());

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            // FlightName: "",
            airlineId: 2,
            hnPrice:300000,
            tgPrice:300000,
            ptPrice:300000,
            pt_dbPrice:300000,
            // AirlineID: "",
            // GateID: "",
            // FlightStatus: "",
            // EstimatedTime: "",
            // SeatCodePT: "",
            // QuantityPT: "",
            // TicketPricePT: "",
            // SeatCodePTDB: "",
            // QuantityPTDB: "",
            // TicketPricePTDB: "",
            // SeatCodeTG: "",
            // QuantityTG: "",
            // TicketPriceTG: "",
            // SeatCodeHN: "",
            // QuantityHN: "",
            // // TicketPriceHN: "",
            // DeparturePlace: "TP HCM, Vi???t Nam",
            // Destination: "H?? N???i, Vi???t Nam",
            // Departure: new Date(),
            // TimeDeparture: new Date(),
            // TimeArrival: new Date(),
        },
    });
    console.log(errors);

    // const sendLocation = (departurePlace, destination) => {
    //     console.log(departurePlace, destination);
    // }

    const onSubmit = async (values) => {
        const newValues = JSON.stringify( {
            ...values,
            timeArrival: moment(values.timeArrival).format("HH:MM"),
            timeDeparture:  moment(values.timeDeparture).format("HH:MM"),
            departure:  moment(values.timeArrival).format("YYYY-MM-DD")
        })
        console.log(newValues);
        try{
            await flightApi.add(newValues);
        }
        catch{
            console.log("l???i r???i ", errors);
        }
    }
    const depaturePlace = {
        "TP HCM, Vi???t Nam": "TP HCM, Vi???t Nam",
        "H?? N???i, Vi???t Nam": "H?? N???i, Vi???t Nam",
        "Vinh, Vi???t Nam": "Vinh, Vi???t Nam",
        "Ph?? Qu???c, Vi???t Nam": "Ph?? Qu???c, Vi???t Nam",
        "???? L???t, Vi???t Nam": "???? L???t, Vi???t Nam",
        "???? N???ng, Vi???t Nam": "???? N???ng, Vi???t Nam",
        "Hu???, Vi???t Nam": "Hu???, Vi???t Nam",
        "Nha Trang, Vi???t Nam": "Nha Trang, Vi???t Nam",
    }

    const destination = {
        "TP HCM, Vi???t Nam": "TP HCM, Vi???t Nam",
        "H?? N???i, Vi???t Nam": "H?? N???i, Vi???t Nam",
        "Vinh, Vi???t Nam": "Vinh, Vi???t Nam",
        "Ph?? Qu???c, Vi???t Nam": "Ph?? Qu???c, Vi???t Nam",
        "???? L???t, Vi???t Nam": "???? L???t, Vi???t Nam",
        "???? N???ng, Vi???t Nam": "???? N???ng, Vi???t Nam",
        "Hu???, Vi???t Nam": "Hu???, Vi???t Nam",
        "Nha Trang, Vi???t Nam": "Nha Trang, Vi???t Nam",
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ color: '#1BA0E2' }}>Add Flight</h2>
            <Stack className='Button' spacing={2} direction="row">
                <Button type="submit" variant="contained" style={{ backgroundColor: '#FF6F00' }}>Add</Button>
                <Link to='/doanhthu' className='link' style={{ textDecoration: 'none' }} >
                    <Button variant="contained" style={{ backgroundColor: '#1BA0E2' }}>
                        Back
                    </Button>
                </Link>
            </Stack>
            {/* <BasicButton /> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch', marginTop: '50px' },
                }}
                noValidate
                autoComplete="off"
            >
                <InputField name="name" label="T??n chuy???n bay" control={control} rules={{ required: "Ch??a nh???p t??n chuy???n bay b?? ??i" }} />
            
                <BasicDatePicker name='departure' label='Ng??y kh???i h??nh' control={control} />
                <FormControl fullWidth >
                    <SelectField name='departurePlace' data={depaturePlace} label='??i???m ??i' control={control} />
                </FormControl>

                <FormControl fullWidth>
                    <SelectField name='destination' data={destination} label='??i???m ?????n' control={control} />
                </FormControl>
                <InputField name="time" label="Th???i gian ?????c t??nh" control={control} rules={{ required: "Ch??a nh???p th???i gian", pattern: { value: /^[0-9]+$/i, message: "nh???p s??? th??i b?? ??i" } }} />
                <InputField name="gateId" label="ID C???ng v??o" control={control} rules={{ required: "Ch??a nh???p c???ng v??o" }} />
                <BasicTimePicker name='timeDeparture' label="Th???i gian c???t c??nh" control={control} />
                <BasicTimePicker name='timeArrival' label="Th???i gian h??? c??nh" control={control} />
            </Box>
            <h2 style={{ color: '#1BA0E2', marginTop: '50px' }}>H???ng gh???</h2>
            <div className='text' style={{ display: 'flex', justifyContent: 'space-evenly' , marginBottom: 20}}>
                <div>
                    <Grid container direction={"column"} spacing={3}>
                        <p style={{ fontSize: '20px' }}>Ph??? th??ng</p>
                        {/* <InputField name='SeatCodePT' label='M?? h???ng gh???' control={control} /><br /> */}
                        <InputField name='ptQuantity' label='S??? l?????ng' control={control} rules={{ required: "Ch??a nh???p s??? l?????ng" }} /><br />
                        <InputField name='ptPrice' label='Gi?? v??' control={control} rules={{ required: "Ch??a nh???p gi?? v??", min: { value: 300000, message: "gi?? kh??ng ???????c th???p h??n 300000k" }, max: { value: 3000000, message: "gi?? kh??ng ???????c cao h??n 3000000k" } }} />
                    </Grid>

                </div>
                <div>
                    <Grid container direction={"column"} spacing={3}>
                        <p style={{ fontSize: '20px' }}>Ph??? th??ng ?????c bi???t</p>
                        {/* <InputField name='SeatCodePTDB' label='M?? h???ng gh???' control={control} /><br /> */}
                        <InputField name='pt_dbQuantity' label='S??? l?????ng' control={control} rules={{ required: "Ch??a nh???p s??? l?????ng" }} /><br />
                        <InputField name='pt_dbPrice' label='Gi?? v??' control={control} rules={{ required: "Ch??a nh???p gi?? v??", min: { value: 300000, message: "gi?? kh??ng ???????c th???p h??n 300000k" }, max: { value: 3000000, message: "gi?? kh??ng ???????c cao h??n 3000000k" } }} />
                    </Grid>
                </div>
                <div>
                    <Grid container direction={"column"} spacing={3}>
                        <p style={{ fontSize: '20px' }}>Th????ng gia</p>
                        {/* <InputField name='SeatCodeTG' label='M?? h???ng gh???' control={control} /><br /> */}
                        <InputField name='tgQuantity' label='S??? l?????ng' control={control} rules={{ required: "Ch??a nh???p s??? l?????ng" }} /><br />
                        <InputField name='tgPrice' label='Gi?? v??' control={control} rules={{ required: "Ch??a nh???p gi?? v??", min: { value: 300000, message: "gi?? kh??ng ???????c th???p h??n 300000k" }, max: { value: 3000000, message: "gi?? kh??ng ???????c cao h??n 3000000k" } }} />
                    </Grid>
                </div>
                <div>
                    <Grid container direction={"column"} spacing={3}>
                        <p style={{ fontSize: '20px' }}>H???ng nh???t</p>
                        {/* <InputField name='SeatCodeHN' label='M?? h???ng gh???' control={control} /><br /> */}
                        <InputField name='hnQuantity' label='S??? l?????ng' control={control} rules={{ required: "Ch??a nh???p s??? l?????ng" }} /><br />
                        <InputField name='hnPrice' label='Gi?? v??' control={control} rules={{ required: "Ch??a nh???p gi?? v??", min: { value: 300000, message: "gi?? kh??ng ???????c th???p h??n 300000k" }, max: { value: 3000000, message: "gi?? kh??ng ???????c cao h??n 3000000k" } }} />
                    </Grid>
                </div>
            </div>
            {/* <SimplePaper /> */}
        </form >
    );
}

export default Add;