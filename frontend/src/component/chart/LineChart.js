import Chart from 'chart.js/auto'

import { Line } from 'react-chartjs-2'


const options = {
    scales: {
        y: {
            grid: { color: 'transparent'},
        },
        x: {
            grid: { color: 'transparent'}
        }
    }, 
}

const LineChart = ({data}) => {
    return (
        <div>
            {data && <Line options={options} data={data} />}
        </div>
    )
}

export default LineChart