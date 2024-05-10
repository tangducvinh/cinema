import { MdClear } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { Calendar } from 'react-calendar'
import { TimePicker } from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import swal from 'sweetalert'
import clsx from 'clsx'

import { setChidlren, setRenderManagerShow } from '../../redux/slides/appSlice'
import * as apis from '../../apis'

const FormAddShow = ({data}) => {
    const dispatch = useDispatch()
    const calendarElement = useRef()
    const containerElement = useRef()
    const [ listMovie, setListMovie ] = useState([])
    const [ valueSelectMovie, setValueSelectMovie ] = useState()
    const [ listRoom, setListRoom ] = useState([])
    const [ valueSelectRoom, setValueSelectRoom ] = useState()
    const [ valuePrice, setValuePrice ] = useState()

    
    const [ valueCalendar, setValueCalendar ] = useState(new Date())
    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ beginTime, setBeginTime ] = useState('10:00')
    const [ endTime, setEndTime ] = useState('11:00')

    const [ showSubmit, setShowSubmit ] = useState(false)

    const fecthData = async() => {
        // const response = await apis.getListMovie('showing')

        const [ resMovie, resRoom ] = await Promise.all([
            apis.getListMovie('showing'),
            apis.getListRoom()
        ])

        if (resMovie.success) {
            setListMovie(resMovie.data.map(item => ({movieId: item._id, name: item.original_title, image: item.poster_path, runtime: item.runtime})))
            if (!data) {
                setValueSelectMovie(resMovie.data[0]._id)
            }
        }

        if (resRoom.success) {
            setListRoom(resRoom.data.map(item => ({roomId: item._id, name: item.name})))
            if (!data) {
                setValueSelectRoom(resRoom.data[0]._id)
            }
        }
    }

    useEffect(() => {
        if (data) {
            setValueSelectMovie(data.movieId)
            setValueSelectRoom(data.roomId)
            setBeginTime(moment(data.timeStart).format('HH:mm'))
            setValueCalendar(data.timeStart)
            setEndTime(moment(data.timeEnd).format('HH:mm'))
            setValuePrice(data.price)
        }
    }, [data]) 

    useEffect(() => {
        fecthData()
    }, [])

//listen enter type full
    useEffect(() => {
        if (!data) {
            if (valuePrice) {
                console.log('hello')
                setShowSubmit(true)
            } else {
                setShowSubmit(false)
            }
        }
    }, [valuePrice, data])

    // listen datasubmit
    useEffect(() => {
        if (endTime.split(':')[0].length === 1) {
            setEndTime(prev => `0${prev}`)
        }
        console.log(moment(valueCalendar).format('YYYY-MM-DD'))
        console.log(moment(data?.timeStart).format('YYYY-MM-DD'))
        if (data) {
            if (valueSelectMovie !== data.movieId || valueSelectRoom !== data.roomId || endTime !== moment(data.timeEnd).format('HH:mm')
             || valuePrice != data.price || moment(valueCalendar).format('YYYY-MM-DD') !== moment(data.timeStart).format('YYYY-MM-DD')
            ) {
                setShowSubmit(true)
            } else {
                setShowSubmit(false)
            }
        }
    }, [valueSelectMovie, valueSelectRoom, endTime, valueCalendar, valuePrice, data])

    //handle click out calendar is hidden
    useEffect(() => {
        const handleHiddenCalendar = (e) => {
            if (!calendarElement.current?.contains(e.target)) {
                setShowCalendar(false)
            }
        }

        containerElement.current.addEventListener('click', (e) => handleHiddenCalendar(e))

        return containerElement.current.removeEventListener('click', handleHiddenCalendar)
    }, [])

    // handle listen even set begin time
    useEffect(() => {

        console.log(beginTime.slice(0, 2))
        console.log(beginTime.slice(-2))

        const hourEnd = Math.floor((Number(beginTime?.slice(0, 2)) * 60 + Number(beginTime?.slice(-2)) + listMovie.find(item => item.movieId === valueSelectMovie)?.runtime) / 60)
        let minuteEnd = (Number(beginTime?.slice(0, 2)) * 60 + Number(beginTime?.slice(-2)) + listMovie.find(item => item.movieId === valueSelectMovie)?.runtime) % 60

        if (minuteEnd.toString().length === 1) {
            minuteEnd = `0${minuteEnd}`
        }

        console.log({
            hourEnd,
            minuteEnd
        })

        setEndTime(`${hourEnd}:${minuteEnd}`)
    }, [beginTime, valueSelectMovie, listMovie])

    //handle click out calendar is hidden
    useEffect(() => {
        const handleHiddenCalendar = (e) => {
            if (!calendarElement.current?.contains(e.target)) {
                setShowCalendar(false)
            }
        }

        containerElement.current.addEventListener('click', (e) => handleHiddenCalendar(e))

        return containerElement.current.removeEventListener('click', handleHiddenCalendar)
    }, [])

    const handleSetBeginTime = (newValue) => {
        setBeginTime(newValue)
    }

    // handle submit
    const handleSubmit = async() => {
        // console.log(valueSelectMovie)
        // console.log(valueSelectRoom)
        // console.log(moment(valueCalendar).format('YYYY-MM-DD'))
        // console.log(beginTime, endTime)

        const price = Number(valuePrice)
        const day = moment(valueCalendar).format('YYYY-MM-DD')

        const dataPass = {
            movieId: valueSelectMovie,
            begin_time: `${day} ${beginTime}`,
            end_time: `${day} ${endTime}`,
            roomId: valueSelectRoom,
            price: valuePrice
        }

        if (data) {
            dataPass.sid = data._id
            console.log(dataPass)

            const response = await apis.updateShow(dataPass)

            console.log(response)
            
            swal(response.success ? 'Updated' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                dispatch(setChidlren(null))
                dispatch(setRenderManagerShow())
            }
        } else {
            const response = await apis.createShow(dataPass)

            swal(response.success ? 'Created' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                dispatch(setChidlren(null))
                dispatch(setRenderManagerShow())

                console.log(response)
            }
        }
    }

    console.log({valueSelectMovie})

    return (
        <div 
            ref={containerElement}
            className="w-[700px] mx-auto bg-white animate-back-up rounded-md overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{!data ? 'Thêm thông tin xuất chiếu mới' : 'Cập nhật thông tin xuất chiếu'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <div className='p-4'>
                <img 
                    className='w-[200px] h-[200px] object-cover rounded-md shodow-md' 
                    alt='poster' 
                    src={listMovie.find(item => item.movieId === valueSelectMovie)?.image.slice(0, 4) === 'http' ? listMovie?.find(item => item.movieId === valueSelectMovie)?.image : `${process.env.REACT_APP_IMAGE_URL}${listMovie.find(item => item.movieId === valueSelectMovie)?.image}`}
                ></img>

                <div className='mt-7'>
                    <label className='font-medium'>Chọn phim: </label>
                    <select value={valueSelectMovie} onChange={(e) => setValueSelectMovie(e.target.value)}>
                        {listMovie?.map((item, index) => (
                            <option key={index} value={item.movieId}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='mt-7'>
                    <label className='font-medium'>Chọn phòng chiếu: </label>
                    <select value={valueSelectRoom} onChange={(e) => setValueSelectRoom(e.target.value)}>
                        {listRoom?.map((item, index) => (
                            <option key={index} value={item.roomId}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='relative mt-7'>
                    <label className='font-medium'>Ngày chiếu</label>
                    <input 
                        onClick={() => setShowCalendar(!showCalendar)}
                        className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                        placeholder='Nhập ngày' 
                        value={moment(valueCalendar).format('DD/MM/YYYY')}
                    ></input>

                    {showCalendar &&
                        <div 
                            className='absolute right-[0] bottom-0 bg-white p-4 shadow-lg' 
                            ref={calendarElement}
                        >
                            <Calendar onChange={setValueCalendar} value={valueCalendar} />
                        </div>
                    }
                </div>

                <div className='mt-7'>
                    <label className='font-medium'>Giá vé</label>
                    <input 
                        type='number'
                        className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                        placeholder='Nhập giá vé' 
                        value={valuePrice}
                        onChange={(e) => setValuePrice(e.target.value.trim())}
                    ></input>
                </div>

                <div className='flex items-center justify-between mt-7'>
                    <label className='font-medium'>Thời gian chiếu</label>

                    <div>
                        <label className='font-medium mr-2'>Bắt đầu:</label>
                        <TimePicker
                            disableClock
                            format={"HH:mm"}
                            value={beginTime}
                            clockIcon={false}
                            onChange={(newValue) => handleSetBeginTime(newValue)}
                        />
                    </div>

                    <div>
                        <label className='font-medium mr-2'>{`Kết thúc: ${endTime || '00:00'}`}</label>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-6 pb-[30px]'>
                <button 
                    className={clsx('py-2 mx-auto font-medium rounded-md w-[500px]', {'bg-main': showSubmit}, {'bg-gray-400': !showSubmit})}
                    onClick={handleSubmit}
                >{data ? 'Cập nhật' : 'Thêm'}</button>
            </div>
        </div>
    )
}

export default FormAddShow