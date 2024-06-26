import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { FormWatchOrder } from '../forms'
import { setChidlren } from '../../redux/slides/appSlice'

const ItemBillInfor = ({data, idBill, movieName, roomName, timeStart, day, phone, status, seats}) => {
    const dispatch = useDispatch()

    const handleWatchOrder = () => {
        dispatch(setChidlren(<FormWatchOrder data={data}/>))
    }

    return (
        <ul className="flex items-center text-[15px] px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-semibold">{`#${idBill}`}</li>
            <li className="flex-2 font-semibold">{movieName}</li>
            <li className="w-[60px] font-semibold">{roomName}</li>
            <li className="flex-1 font-semibold">{timeStart}</li>
            <li className="flex-1 font-semibold">{day}</li>
            <li className="flex-1 font-semibold line-clamp-1">{seats.length < 14 ? seats : `${seats.slice(0, 12)}...`}</li>
            <li className="flex-1 font-semibold">{phone}</li>
            <li className="flex-1 font-semibold">{status}</li>
            <li className='cursor-pointer' onClick={handleWatchOrder}><MdOutlineRemoveRedEye size='22px' /></li>
        </ul>
    )
}

export default ItemBillInfor