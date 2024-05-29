import { useState, useEffect, Fragment, useRef } from 'react'
import { LineChart } from '../../component/chart'
import { SiCashapp } from "react-icons/si"
import clsx from 'clsx'
import moment from 'moment'
import Calendar from 'react-calendar'

import * as apis from '../../apis'
import { ItemMovieOrderInfor } from '../../component/itemInfor'

const Dashboard = () => {
    const calendarElement = useRef()
    const containerElement = useRef()

    const [ dataChart, setDataChart ] = useState()
    const [ totalToday, setTotalToday ] = useState(0)
    const [ typeChart, setTypeChart ] = useState(0)
    const [ dataMovie, setDataMovie ] = useState([])

    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ valueCalendar, setValueCalendar ] = useState(new Date)

    const fetchDataChart = async(type, data) => {
        const response = await apis.getDataChart(type, data)

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
            setDataMovie(response.dataMovie)
        }
    }

    useEffect(() => {
        const day = moment(valueCalendar).format('YYYY-MM-DD')
        if (typeChart === 0) {
            fetchDataChart('day', {day: day})
        } else if (typeChart === 1) {
            fetchDataChart('month', {day: day})
        } else {
            fetchDataChart('year', {day: day})
        }
    }, [typeChart, valueCalendar])

    // handle hidden calendar
    useEffect(() => {
        const handleHiddenCalendar = (e) => {
            if (!calendarElement.current?.contains(e.target) && !containerElement.current?.contains(e.target)) {
                setShowCalendar(false)
            }
        }

        window.addEventListener('click', (e) => handleHiddenCalendar(e))

        return window.removeEventListener('click', handleHiddenCalendar)
    }, [])

    return (
        <div className='flex'>
            <div className='flex-7 flex flex-col'>
                <div className='flex justify-start items-center gap-3'>
                    <SiCashapp color='#F5811F' size='40px' />

                    <div className='text-center'>
                        <p className='font-medium'>{`Doanh thu ${typeChart === 0 ? 'ngày ' + moment(valueCalendar).format('DD/MM/YYYY') : typeChart === 1 ? 'tháng ' + moment(valueCalendar).format('MM/YYYY') : 'năm '+ moment(valueCalendar).format('YYYY')}`}</p>
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

                <div className='mt-4'>
                    <h3 className='font-medium'>Top Movie</h3>

                    <ul className="flex items-center px-4 py-1 w-full mt-1 rounded-sm text-gray-400 text-sm">
                        <li className="w-[50px] font-semibold">Top</li>
                        <li className="w-[42px]"></li>
                        <li className="flex-2 font-semibold">Tên phim</li>
                        <li className="flex-1 font-semibold">Ngày phát hành</li>
                        <li className="flex-1 font-semibold">Trạng thái</li>
                        <li className="flex-1 font-semibold">Tổng</li>
                    </ul>

                    {dataMovie.map((item, index) => (
                        <Fragment key={item.inforMovie.id}>
                            <ItemMovieOrderInfor
                                index={index}
                                name={item.inforMovie.original_title}
                                poster={item.inforMovie.poster_path}
                                release={item.inforMovie.release_date}
                                status={item.inforMovie.status}
                                total={item.total}
                            />
                        </Fragment>
                    ))}

                    <div className='h-[50px]'></div>
                </div>
            </div>

            <div className='flex-3 ml-10'>
                <div className='relative'>
                    <label className='font-medium'>Chọn ngày</label>
                    <input 
                        ref={containerElement}
                        onClick={() => setShowCalendar(!showCalendar)}
                        className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                        placeholder='Nhập ngày' 
                        value={moment(valueCalendar).format('DD/MM/YYYY')}
                    ></input>

                    {showCalendar &&
                        <div 
                            className='absolute left-[20%] top-[100%] bg-white p-4 shadow-lg' 
                            ref={calendarElement}
                        >
                            <Calendar onChange={setValueCalendar} value={valueCalendar} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard