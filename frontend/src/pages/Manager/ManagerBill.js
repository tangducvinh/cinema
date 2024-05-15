import { useState, useRef, useEffect, Fragment } from 'react'
import { MdClear } from 'react-icons/md'
import moment from 'moment'
import Calendar from 'react-calendar'
import { ItemBillInfor } from '../../component/itemInfor'
import { IoSearchOutline } from "react-icons/io5"

import * as apis from '../../apis'

const ManagerBill = () => {
    const calendarElement = useRef()
    const containerElement = useRef()

    const [ listBill, setListBill ] = useState([])

    const [ value, setValue ] = useState()
    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ valueCalendar, setValueCalendar ] = useState(new Date())


    const fecthListBill = async(data) => {
        const response = await apis.getAllOrder(data)

        if (response.success) {
            setListBill(response.data)
        }
    }


    useEffect(() => {
        fecthListBill({day: moment(valueCalendar).format('YYYY/MM/DD')})
    }, [valueCalendar, value === ''])

    const handleSearch = () => {
        fecthListBill({day: moment(valueCalendar).format('YYYY/MM/DD'), title: value})
    }


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

    return (
        <div 
            ref={containerElement}
            className="w-full">
            <h2 className="font-medium text-2xl">Danh sách các hoá đơn</h2>

            <div className='flex items-center mt-4'>
                <div className='relative mr-4'>
                    <label className='font-medium'>Chọn ngày</label>
                    <input 
                        onClick={() => setShowCalendar(!showCalendar)}
                        className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                        placeholder='Nhập ngày' 
                        value={moment(valueCalendar).format('DD/MM/YYYY')}
                    ></input>

                    {showCalendar &&
                        <div 
                            className='absolute left-[100%] top-[100%] bg-white p-4 shadow-lg' 
                            ref={calendarElement}
                        >
                            <Calendar onChange={setValueCalendar} value={valueCalendar} />
                        </div>
                    }
                </div>

                <div className="relative w-[300px]">
                    <input 
                        className="border-[2px] w-full shadow-sm px-2 py-1 rounded-md outline-none" 
                        placeholder='Mã hoá đơn'
                        value={value}
                        onChange={(e) => setValue(e.target.value.trim())}
                    >
                    </input>
                    {value && 
                        <span 
                            className="absolute translate-y-[50%] cursor-pointer right-[10px]"
                            onClick={() => setValue('')}
                        >
                            <MdClear size="18px"/>
                        </span>
                    }

                </div>

                <button onClick={handleSearch} className='py-[5px] px-3 rounded-sm'><IoSearchOutline size='20px' /></button>
            </div>

            <ul className="flex items-center bg-[#eb9651] px-4 py-2 w-full mt-3 rounded-sm">
                <li className="w-[100px] font-semibold">Mã hoá đơn</li>
                <li className="flex-2 font-semibold">Tên phim</li>
                <li className="flex-1 font-semibold">Rạp</li>
                <li className="flex-1 font-semibold">Thời gian</li>
                <li className="flex-1 font-semibold">Ngày</li>
                <li className="flex-1 font-semibold">Ghế</li>
                <li className="flex-1 font-semibold">STĐ</li>
                <li className="flex-1 font-semibold">Trạng thái</li>
                <li className="w-[85px]"></li>
            </ul>

            {listBill.map((item, index) => (
                <Fragment key={index}>
                    <ItemBillInfor
                        idBill={item.orderNumber}
                        movieName={item.movieId?.original_title}
                        roomName={item.roomId.name}
                        timeStart={moment(item.showId.begin_time).format('HH:MM')}
                        day={moment(item.createdAt).format('DD/MM/YYYY')}
                        seats={item.seats.map(item => item.name).toString()}
                        phone={item.userId.phone}
                        status={'Đã thanh toán'}
                    />
                </Fragment>
            ))}
        </div>
    )
}

export default ManagerBill