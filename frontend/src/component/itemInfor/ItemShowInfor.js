import clsx from 'clsx'
import moment from 'moment'
import { MdOutlineRestorePage, MdOutlineDelete, MdOutlineRemoveRedEye  } from 'react-icons/md'

import * as apis from '../../apis'


const ItemShowInfor = ({id, _id, name, runtime, timeStart, timeEnd, roomName, totalBlock, total, image, onDelete}) => {


    return (
        <ul className="flex items-center px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-medium">{`#${id}`}</li>
            <li>
                <img className="w-[35px] h-[35px] rounded-sm mr-2 object-cover" src={image.slice(0, 4) === 'http' ? image : `${process.env.REACT_APP_IMAGE_URL}${image}`}></img>
            </li>
            <li className="flex-2 font-medium line-clamp-1">{name}</li>
            <li className="flex-1 font-medium">{runtime}</li>
            <li className="flex-1 font-semibold">{`${moment(timeStart).format('HH:mm')} - ${moment(timeEnd).format('HH:mm')}`}</li>
            <li className="flex-1 font-semibold">{roomName}</li>
            <li className="flex-1 font-semibold">{`${totalBlock}/${total}`}</li>
            <li className='cursor-pointer'><MdOutlineRemoveRedEye size='22px' /></li>
            <li className='cursor-pointer ml-2'><MdOutlineRestorePage size='22px' /></li>
            <li 
                className='ml-2 cursor-pointer'
                onClick={() => onDelete(_id)}
            ><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemShowInfor