import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DoanhThuData } from './Data';
import LineChart from '../../LineChart/Index';
import flightApi from './../../Api/flightApi';

Statistics.propTypes = {

};

function Statistics() {
    const [listData, setListData] = useState([]);
    let chartData = Array.of();
    useEffect(() => {
        const flightChart = async () => {
            const flightList = await flightApi.getAllStatisticYear("AL978AWBCDVJ");
            setListData(flightList.data);
            console.log(flightList.data);
        }

        flightChart();
    }, []);
    const tMoney = (List) => {
        let total = 0;
        for (var i = 0; i < 4; i++) {
            total += (List[i]?.price * (List[i]?.quantity - List[i]?.remainingQuantity));
        };
        return total;
    };
    for (var i in listData) {
        let t = 0
        listData[i].map((year) => t += tMoney(year.classTypeList))
        chartData.push({
            year: i,
            totalPrice: t,
        })

    }
    console.log(chartData);

    const [doanhThuData, setDoanhThuData] = useState({
        labels: chartData.map((data) => data.year),
        datasets: [
            {
                label: "test",
                data: chartData.map((data) => data.totalPrice),
                backgroundColor: ["#FF6F00"],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    })

    return (
        <div>
            <h2 style={{ color: '#1BA0E2' }}>Biểu đồ doanh thu chuyến bay</h2>
            <div style={{ width: 1000, marginLeft: 250, }}>
                <LineChart chartData={doanhThuData} />
            </div>
        </div>
    );
}

export default Statistics;