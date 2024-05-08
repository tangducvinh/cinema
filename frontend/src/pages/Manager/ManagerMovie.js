import { MdClear } from "react-icons/md"
import { useState, useEffect, Fragment } from 'react'
import { useDebounce } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'

import { ItemMovieInfor } from '../../component/itemInfor'
import * as apis from '../../apis'
import { setChidlren } from '../../redux/slides/appSlice'
import { FormAddMovie } from '../../component/forms'

// all: tất cả
// showing: đang chiếu
// soon: sắp chiếu

const type = [
    {
        name: 'Tất cả',
        value: ''
    },
    {
        name: 'Đang chiếu',
        value: 'showing'
    },
    {
        name: 'Sắp chiếu',
        value: 'soon'
    }
]

const ManagerMovie = () => {
    const dispatch = useDispatch()
    const { renderManagerMovie } = useSelector(state => state.app)
    const [ value, setValue ] = useState()
    const [ dataAllMovie, setDataAllMovie ] = useState()
    const [ status, setStatus ] = useState(type[0].value)
    const [ text ] = useDebounce(value, 800)

    const fecthAllMovie = async(data) => {
        const response = await apis.getAllMoives(data)

        if (response?.success) {
            setDataAllMovie(response.data)
        }
    }

    useEffect(() => {
        const dataPass = {}
        if (text) {
            dataPass.title = text
        }
        if (status) {
            dataPass.status = status
        }

        fecthAllMovie(dataPass)
    }, [text, renderManagerMovie, status])

    // xử lí thêm phim
    const handleAddMovie = () => {
        dispatch(setChidlren(<FormAddMovie />))
    }

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
                        {value && 
                            <span 
                                className="absolute translate-y-[50%] cursor-pointer right-[10px]"
                                onClick={() => setValue('')}
                            >
                                <MdClear size="18px"/>
                            </span>}
                    </form>

                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="ml-3">
                        {type.map((item) => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button 
                        className="bg-blue-500 px-3 text-sm py-2 rounded-md text-white font-medium"
                        onClick={handleAddMovie}
                    >Thêm phim</button>
                </div>
            </div>

            <ul className="flex items-center bg-[#eb9651] px-4 py-2 w-full mt-3 rounded-sm">
                <li className="w-[100px] font-semibold">ID</li>
                <li className="w-[42px]"></li>
                <li className="flex-2 font-semibold">Tên phim</li>
                <li className="flex-1 font-semibold">Thời lượng</li>
                <li className="flex-1 font-semibold">Ngày phát hành</li>
                <li className="flex-1 font-semibold">Trạng thái</li>
                <li className="w-[52px]"></li>
            </ul>

            <div>
                {/* {status === 'all' ?
                    dataAllMovie?.map((item, index) => (
                        <Fragment key={index}>
                            <ItemMovieInfor 
                                id={item?.id} 
                                name={item?.original_title} 
                                runtime={item?.runtime} 
                                status={item?.status === 'showing' ? 1 : 2}
                                image={item?.poster_path}
                                release={item?.release_date}
                            />
                        </Fragment>
                    ))  
                    :
                    dataAllMovie?.filter(item => item.status === status)?.map((item, index) => (
                        <Fragment key={index}>
                            <ItemMovieInfor 
                                id={item?.id} 
                                name={item?.original_title} 
                                runtime={item?.runtime} 
                                status={item?.status === 'showing' ? 1 : 2}
                                image={item?.poster_path}
                                release={item?.release_date}
                            />
                        </Fragment>
                    ))
                } */}

                    {dataAllMovie?.map((item, index) => (
                        <Fragment key={index}>
                            <ItemMovieInfor 
                                id={item?.id} 
                                name={item?.original_title} 
                                runtime={item?.runtime} 
                                status={item?.status === 'showing' ? 1 : 2}
                                image={item?.poster_path}
                                release={item?.release_date}
                            />
                        </Fragment>))}
            </div>
        </div>
    )
}

export default ManagerMovie