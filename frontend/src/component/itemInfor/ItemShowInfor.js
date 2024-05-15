import clsx from 'clsx'
import moment from 'moment'
import { MdOutlineRestorePage, MdOutlineDelete, MdOutlineRemoveRedEye  } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import * as apis from '../../apis'
import { setChidlren } from '../../redux/slides/appSlice'
import { FormAddShow } from '../../component/forms'

const ItemShowInfor = ({id, _id, name, runtime, timeStart, timeEnd, roomName, totalBlock, image, onDelete, price, roomId, movieId}) => {
    const dispatch = useDispatch() 
    const [ totalSeat, setTotalSeat ] = useState(0)
    const handleEditShow = () => {
        const data = {
            movieId,
            timeStart,
            roomId,
            price,
            timeEnd,
            _id,
        }

        dispatch(setChidlren(<FormAddShow data={data}/>))
    }

    const fecthDataSeat = async(id) => {
        const response = await apis.getListSeat(id)

        if (response.success) {
            setTotalSeat(response.counts)
        }
    }

    useEffect(() => {
      fecthDataSeat(roomId)
    }, [roomId])

    return (
        <ul className="flex items-center text-[15px] px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-medium">{`#${id}`}</li>
            <li>
                <img className="w-[35px] h-[35px] rounded-sm mr-2 object-cover" src={image.slice(0, 4) === 'http' ? image : `${process.env.REACT_APP_IMAGE_URL}${image}`}></img>
            </li>
            <li className="flex-2 font-medium line-clamp-1">{name.length < 27 ? name : `${name.slice(0, 25)}...`}</li>
            <li className="flex-1 font-medium">{`${runtime} phút`}</li>
            <li className="flex-1 font-semibold">{`${moment(timeStart).format('HH:mm')} - ${moment(timeEnd).format('HH:mm')}`}</li>
            <li className="flex-1 font-semibold">{roomName}</li>
            <li className="flex-1 font-semibold text-red-500">{price?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</li>
            <li className="flex-1 font-semibold">{`${totalBlock}/${totalSeat}`}</li>
            <li className='cursor-pointer'><MdOutlineRemoveRedEye size='22px' /></li>
            <li className='cursor-pointer ml-2'
                onClick={handleEditShow}
            >
                <MdOutlineRestorePage size='22px' />
            </li>
            <li 
                className='ml-2 cursor-pointer'
                onClick={() => onDelete(_id)}
            ><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemShowInfor