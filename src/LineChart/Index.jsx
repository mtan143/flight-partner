import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

LineChart.propTypes = {

};

function LineChart({ chartData }) {
    return <Line data={chartData} />;
}

export default LineChart;