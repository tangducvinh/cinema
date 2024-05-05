import clsx from 'clsx'
import { MdEmail, MdOutlineDelete, MdOutlineRestorePage} from "react-icons/md"


const ItemUserInfor = ({ name, email, phone, role }) => {
    return (
        <ul className={clsx('flex items-center px-4 w-full mt-3 rounded-md border-b-2 border-l-4  py-1 shadow-md', {'border-l-main': role === 9}, {'border-l-green-500': role === 3})}>
            <li className='rounded-sm'>
                <img 
                    className="w-[35px] h-[35px] mr-2 object-cover rounded-sm" 
                    src="https://th.bing.com/th/id/R.40bb16d113fec1d642bfcbe193f017d5?rik=PPoebEIsQKCRgg&pid=ImgRaw&r=0"
                ></img>
            </li>
            <li className="flex-1 font-medium">{name}</li>
            <li className="flex-1 font-medium">{email}</li>
            <li className="flex-1 font-medium">{phone}</li>
            <li className="flex-1 font-medium">{role === 3 ? 'Khách hàng' : 'Quản lí'}</li>
            <li className='cursor-pointer'><MdOutlineRestorePage size='22px' /></li>
            <li className='ml-2 cursor-pointer'><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemUserInfor