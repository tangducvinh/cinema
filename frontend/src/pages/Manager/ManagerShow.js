import { useState } from 'react'
import { MdClear } from 'react-icons/md'

import { ItemShowInfor } from '../../component/itemInfor'


const ManagerShow = () => {
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

    const [ value, setValue ] = useState()

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
                {value !== '' && 
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
                    <button className="bg-blue-500 px-3 text-sm py-2 rounded-md text-white font-medium">Tạo xuất</button>
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
                <ItemShowInfor 
                    id={324243} 
                    name={'Avatar dòng chảy nước'} 
                    runtime={'120 phút'} 
                    timeStart={'2h30'} 
                    timeEnd={'3h'}
                    roomName={'Phòng 1'}
                    totalBlock={12}
                    total={50}
                />
            </div>
        </div>
    )
}

export default ManagerShow