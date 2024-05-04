import clsx from 'clsx'
import { MdOutlineDelete, MdOutlineRestorePage} from "react-icons/md"



const ItemMovieInfor = ({ id, name, runtime, status}) => {
    return (
        <ul className="flex items-center px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-medium">{`#${id}`}</li>
            <li>
                <img className="w-[35px] h-[35px] rounded-sm mr-2 object-cover" src="https://th.bing.com/th/id/R.b304c7b0e1751794c05ca44d94cea47a?rik=LZD4JLSQturzbA&riu=http%3a%2f%2fglobalcomment.com%2fwp-content%2fuploads%2f2009%2f12%2favatarstill1.jpg&ehk=vGiHlZi0SvoA3HQBCKONr%2f6BmG5tPKjs14Xb9o6%2f%2bPU%3d&risl=&pid=ImgRaw&r=0"></img>
            </li>
            <li className="flex-1 font-medium">{name}</li>
            <li className="flex-1 font-medium">{runtime}</li>
            <li className={clsx('flex-1 font-medium', {'text-green-500': status === 1}, {'text-main': status === 2})}>{status == 1 ? 'Đang chiếu' : 'Sắp chiếu'}</li>
            <li className='cursor-pointer'><MdOutlineRestorePage size='22px' /></li>
            <li className='ml-2 cursor-pointer'><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemMovieInfor