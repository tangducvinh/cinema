import clsx from 'clsx'
import { MdOutlineDelete, MdOutlineRestorePage} from "react-icons/md"

const ItemMovieInfor = ({ id, name, runtime, status, image}) => {
    return (
        <ul className="flex items-center px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-medium">{`#${id}`}</li>
            <li>
                <img className="w-[35px] h-[35px] rounded-sm mr-2 object-cover" src={`${process.env.REACT_APP_IMAGE_URL}${image}`}></img>
            </li>
            <li className="flex-1 font-medium">{name}</li>
            <li className="flex-1 font-medium">{`${runtime} phút`}</li>
            <li className={clsx('flex-1 font-medium', {'text-green-500': status === 1}, {'text-main': status === 2})}>{status == 1 ? 'Đang chiếu' : 'Sắp chiếu'}</li>
            <li className='cursor-pointer'><MdOutlineRestorePage size='22px' /></li>
            <li className='ml-2 cursor-pointer'><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemMovieInfor