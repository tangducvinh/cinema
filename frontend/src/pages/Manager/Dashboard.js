import { useState, useEffect } from 'react'
import { LineChart } from '../../component/chart'
import { SiCashapp } from "react-icons/si"
import clsx from 'clsx'

import * as apis from '../../apis'

const Dashboard = () => {
    const [ dataChart, setDataChart ] = useState()
    const [ totalToday, setTotalToday ] = useState(0)
    const [ typeChart, setTypeChart ] = useState(0)

    const fetchDataChart = async(type) => {
        const response = await apis.getDataChart(type)

        if (response?.success) {
            const newData = {
                labels: response.data.map(item => (item.day)),
                datasets: [
                  {
                    label: "Doanh thu",
                    backgroundColor: "#F5811F",
                    borderColor: "#F5811F",
                    data: response.data.map(item => (item.value)),
                    tension: 0.2,
                    pointStyle: false,
                  },
                ],
            }

            setDataChart(newData)
            setTotalToday(response.totalToday)
        }
    }

    useEffect(() => {
        if (typeChart === 0) {
            fetchDataChart('day')
        } else if (typeChart === 1) {
            fetchDataChart('month')
        } else {
            fetchDataChart('year')
        }
    }, [typeChart])

    return (
        <div className='flex'>
            <div className='flex-7 flex flex-col'>
                <div className='flex justify-start items-center gap-3'>
                    <SiCashapp color='#F5811F' size='40px' />

                    <div className='text-center'>
                        <p className='font-medium'>{`Doanh thu ${typeChart === 0 ? 'hôm nay' : typeChart === 1 ? 'tháng này' : 'năm này'}`}</p>
                        <p className='text-xl font-bold text-main'>{totalToday?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                </div>

                <div className='justify-end flex mt-4'>
                    <div className='flex items-center gap-4'>
                        <button className={clsx('text-sm', {'font-semibold': typeChart === 0}, {'text-gray-500': typeChart !== 0})} onClick={() => setTypeChart(0)} >Day</button>
                        <button className={clsx('text-sm', {'font-semibold': typeChart === 1}, {'text-gray-500': typeChart !== 1})} onClick={() => setTypeChart(1)} >Month</button>
                        <button className={clsx('text-sm', {'font-semibold': typeChart === 2}, {'text-gray-500': typeChart !== 2})} onClick={() => setTypeChart(2)} >Year</button>
                    </div>
                </div>

                <div>
                    <LineChart data={dataChart}/>
                </div>
            </div>

            <div className='flex-3'></div>
        </div>
    )
}

export default Dashboard