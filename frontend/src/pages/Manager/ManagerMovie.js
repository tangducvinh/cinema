import { MdClear } from "react-icons/md"
import { useState } from 'react'

import { ItemMovieInfor } from '../../component/itemInfor'

const ManagerMovie = () => {
    const [ value, setValue ] = useState()
    return (
        <div className="w-full">
            <h2 className="font-medium text-2xl">Danh sách các phim</h2>

            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center">
                    <form className="relative w-[300px]">
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

                    <select className="ml-3">
                        <option>Tất cả</option>
                        <option>Đang chiếu</option>
                        <option>Sắp chiếu</option>
                    </select>
                </div>

                <div>
                    <button className="bg-blue-500 px-3 text-sm py-2 rounded-md text-white font-medium">Thêm phim</button>
                </div>
            </div>

            <ul className="flex items-center bg-[#eb9651] px-4 py-2 w-full mt-3 rounded-sm">
                <li className="w-[100px] font-semibold">ID</li>
                <li className="w-[42px]"></li>
                <li className="flex-1 font-semibold">Tên phim</li>
                <li className="flex-1 font-semibold">Thời lượng</li>
                <li className="flex-1 font-semibold">Trạng thái</li>
                <li className="w-[52px]"></li>
            </ul>

            <div>
                <ItemMovieInfor id={'#93243'} name={'Avatar Dòng chảy nước'} runtime={'140 phút'} status={1}/>
                <ItemMovieInfor id={'#93243'} name={'Avatar Dòng chảy nước'} runtime={'140 phút'} status={2}/>
                <ItemMovieInfor id={'#93243'} name={'Avatar Dòng chảy nước'} runtime={'140 phút'} status={2}/>
                <ItemMovieInfor id={'#93243'} name={'Avatar Dòng chảy nước'} runtime={'140 phút'} status={1}/>
            </div>
        </div>
    )
}

export default ManagerMovie