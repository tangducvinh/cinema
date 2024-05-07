import { useState, useEffect, Fragment } from 'react'
import { MdClear } from 'react-icons/md'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { ItemShowInfor } from '../../component/itemInfor'
import * as apis from '../../apis'
import { setChidlren } from '../../redux/slides/appSlice'
import { FormAddShow } from '../../component/forms'


const totalRoom = [
    {
        name: 'Phòng 1',
    },
    {
        name: 'Phòng 2',
    },
    {
        name: 'Phòng 3',
    },
    {
        name: 'Phòng 4',
    },
    {
        name: 'Phòng 5',
    },
]

const ManagerShow = () => {
    const dispatch = useDispatch()
    const { renderManagerShow } = useSelector(state => state.app)

    const [ value, setValue ] = useState()
    const [ dataShows, setDataShows ] = useState([])
    const [ statusDelete, setStatusDelete ] = useState(false)
    const [ valueDay, setValueDay ] = useState(moment(new Date).format('YYYY-MM-DD'))

    const fecthDataShow = async(day) => {
        const response = await apis.getAllShow(day)

        if (response?.success) {
            setDataShows(response.data)
        }
    }

    useEffect(() => {
        fecthDataShow({day: valueDay})
    }, [statusDelete, valueDay, renderManagerShow])

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

            swal(response.success ? "Deleted!" : "Error", response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                setStatusDelete(prev => !prev)
            }
        }
    }

    const handleAddShow = async(_id) => {
        dispatch(setChidlren(<FormAddShow />))
        console.log(_id)
    }

    return (
        <div className="w-full">
            <h2 className="font-medium text-2xl">Danh sách các xuất chiếu</h2>

            <form className="relative w-[300px] mt-4">
                <input 
                    className="border-[2px] w-full shadow-sm px-2 py-1 rounded-md outline-none" 
                    placeholder='Tên phim'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
                    <div>
                        <laber className='font-medium '>Chọn ngày: </laber>

                        <select>
                            <option>Hôm nay</option>
                            <option>Ngày mai</option>
                            <option>Ngày kia</option>
                        </select>   
                    </div>

                    <div>
                        <laber className='font-medium '>Chọn phòng: </laber>

                        <select>
                            <option>Tất cả</option>
                            {totalRoom.map((item, index) => (
                                <option>{item.name}</option>
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
                <li className="flex-1 font-semibold">Số chỗ</li>
                <li className="w-[85px]"></li>
            </ul>

            <div>
                {dataShows?.length === 0 ?
                    <div className='mt-[150px]'>
                        <p className='text-center text-gray-500 font-medium'>Không có xuất chiếu nào ở đây</p>
                    </div>
                :
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
                                totalBlock={12}
                                total={50}
                                onDelete={handleDeleteShow}
                            />
                        </Fragment>
                    )) 
                }
            </div>
        </div>
    )
}

export default ManagerShow