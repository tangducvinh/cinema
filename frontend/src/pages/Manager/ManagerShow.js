import { useState, useEffect, Fragment, useRef } from 'react'
import { MdClear } from 'react-icons/md'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Calendar } from 'react-calendar'

import { ItemShowInfor } from '../../component/itemInfor'
import * as apis from '../../apis'
import { setChidlren } from '../../redux/slides/appSlice'
import { FormAddShow } from '../../component/forms'


const ManagerShow = () => {
    const dispatch = useDispatch()
    const { renderManagerShow } = useSelector(state => state.app)
    
    const calendarElement = useRef()
    const containerElement = useRef()

    const [ value, setValue ] = useState()
    const [ dataShows, setDataShows ] = useState([])
    const [ statusDelete, setStatusDelete ] = useState(false)

    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ valueCalendar, setValueCalendar ] = useState(new Date)
    const [ valueSelectRoom, setValueSelectRoom ] = useState('all')
    const [ listRoom, setListRoom ] = useState([])

    const fecthDataShow = async(day) => {
        const response = await apis.getAllShow(day)

        if (response?.success) {
            if (value) {
                setDataShows(response.data.filter(item => item.movieId.original_title.toLowerCase().includes(value)))
            } else {
                setDataShows(response.data)
            }
        }
    }

    const fecthListRoom = async() => {
        const response = await apis.getListRoom()

        if (response.success) {
            setListRoom(response.data.map(item => ({roomId: item._id, name: item.name})))
        }
    }

    // apis get all show
    useEffect(() => {
        fecthDataShow({day: moment(valueCalendar).format('YYYY-MM-DD')})
    }, [statusDelete, valueCalendar, renderManagerShow, value])


    useEffect(() => {
        fecthListRoom()
    }, [])

    // handle delete show 
    const handleDeleteShow = async(_id) => {
        const willDelete = await swal({
            title: "Xoá phim",
            text: "Bạn có chắn chắc muốn xoá phim không?",
            icon: "warning",
            dangerMode: true,
            buttons: true,
        });
           
        if (willDelete) {
            const response = await apis.deleteShow(_id)

            console.log(response)

            swal(response.success ? "Deleted!" : "Error", response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                setStatusDelete(prev => !prev)
            }
        }
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

    const handleAddShow = async(_id) => {
        dispatch(setChidlren(<FormAddShow />))
    }

    console.log(dataShows)

    return (
        <div className="w-full" ref={containerElement}>
            <h2 className="font-medium text-2xl">Danh sách các xuất chiếu</h2>

            <form className="relative w-[300px] mt-4">
                <input 
                    className="border-[2px] w-full shadow-sm px-2 py-1 rounded-md outline-none" 
                    placeholder='Tên phim'
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
                    </span>}
            </form>


            <div className="my-4 flex items-center justify-between">
                <div className='flex items-center gap-5'>
                    {/* <div>
                        <laber className='font-medium '>Chọn ngày: </laber>

                        <select>
                            <option>Hôm nay</option>
                            <option>Ngày mai</option>
                            <option>Ngày kia</option>
                        </select>   
                    </div> */}

                    <div className='relative'>
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

                    {/* <div>
                        <laber className='font-medium '>Chọn phòng: </laber>

                        <select>
                            <option>Tất cả</option>
                            {totalRoom.map((item, index) => (
                                <option>{item.name}</option>
                            ))}
                        </select> 
                    </div> */}

                    <div>
                        <label className='font-medium mr-2'>Chọn phòng: </label>
                        <select value={valueSelectRoom} onChange={(e) => setValueSelectRoom(e.target.value)}>
                            <option value='all'>Tất cả</option>
                            {listRoom?.map((item, index) => (
                                <option key={index} value={item.roomId}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <button 
                        className="bg-blue-500 px-3 text-sm py-2 rounded-md text-white font-medium"
                        onClick={handleAddShow}
                    >Tạo xuất</button>
                </div>
            </div>

            <ul className="flex items-center bg-[#eb9651] px-4 py-2 w-full mt-3 rounded-sm">
                <li className="w-[100px] font-semibold">ID Phim</li>
                <li className="w-[42px]"></li>
                <li className="flex-2 font-semibold">Tên phim</li>
                <li className="flex-1 font-semibold">Thời lượng</li>
                <li className="flex-1 font-semibold">Thời gian chiếu</li>
                <li className="flex-1 font-semibold">Tên phòng</li>
                <li className="flex-1 font-semibold">Giá vé</li>
                <li className="flex-1 font-semibold">Số chỗ</li>
                <li className="w-[85px]"></li>
            </ul>

            <div>
                {dataShows?.length === 0 ?
                    <div className='mt-[150px]'>
                        <p className='text-center text-gray-500 font-medium'>Không có xuất chiếu nào ở đây</p>
                    </div>
                :
                    valueSelectRoom === 'all' ?
                        dataShows?.map((item, index) => (
                            <Fragment>
                                <ItemShowInfor 
                                    _id={item._id}
                                    id={item.movieId?.id} 
                                    name={item.movieId.original_title} 
                                    runtime={item.movieId.runtime} 
                                    timeStart={item.begin_time} 
                                    timeEnd={item.end_time}
                                    image={item.movieId.poster_path}
                                    roomName={item.roomId.name}
                                    totalBlock={item.block_seats.length}
                                    total={50}
                                    onDelete={handleDeleteShow}
                                    price={item?.price}
                                    roomId={item?.roomId._id}
                                    movieId={item?.movieId._id}
                                    block={item.block_seats.length}
                                />
                            </Fragment>
                        ))
                        :
                        dataShows?.filter(item => item.roomId._id === valueSelectRoom).length > 0 ?
                            dataShows?.filter(item => item.roomId._id === valueSelectRoom)?.map((item, index) => (
                                <Fragment>
                                    <ItemShowInfor 
                                        _id={item._id}
                                        id={item.movieId?.id} 
                                        name={item.movieId.original_title} 
                                        runtime={item.movieId.runtime} 
                                        timeStart={item.begin_time} 
                                        timeEnd={item.end_time}
                                        image={item.movieId.poster_path}
                                        roomName={item.roomId.name}
                                        totalBlock={item.block_seats.length}
                                        total={50}
                                        onDelete={handleDeleteShow}
                                        price={item?.price}
                                        roomId={item?.roomId._id}
                                        movieId={item?.movieId._id}
                                    />
                                </Fragment>
                            )) 
                            :
                            <div className='mt-[150px]'>
                                <p className='text-center text-gray-500 font-medium'>Không có xuất chiếu nào ở đây</p>
                            </div>
                }
            </div>
        </div>
    )
}

export default ManagerShow