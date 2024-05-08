import clsx from 'clsx'
import { MdEmail, MdOutlineDelete, MdOutlineRestorePage} from "react-icons/md"
import default_avatar from '../../component/assest/images/defaul_avatar.jpg'
import { useDispatch } from 'react-redux'

import { setChidlren } from '../../redux/slides/appSlice'
import { FormEditUser } from '../../component/forms'


const ItemUserInfor = ({ name, email, phone, role, image }) => {
    console.log(role)
    const dispatch = useDispatch()

    const handleEditUser = () => {
        const dataPass = {
            name,
            email,
            phone,
            role,
            image
        }

        dispatch(setChidlren(<FormEditUser data={dataPass} />))
    }

    return (
        <ul className={clsx('flex items-center px-4 w-full mt-3 rounded-md border-b-2 border-l-4  py-1 shadow-md', {'border-l-main': role === 9}, {'border-l-green-500': role === 3})}>
            <li className='rounded-sm'>
                <img 
                    className="w-[35px] h-[35px] mr-2 object-cover rounded-sm" 
                    src={image || default_avatar}
                ></img>
            </li>
            <li className="flex-1 font-medium">{name}</li>
            <li className="flex-1 font-medium">{email}</li>
            <li className="flex-1 font-medium">{phone}</li>
            <li className="flex-1 font-medium">{+role === 3 ? 'Khách hàng' : 'Quản lí'}</li>
            <li 
                className='cursor-pointer'
                onClick={handleEditUser}
            ><MdOutlineRestorePage size='22px' /></li>
            <li className='ml-2 cursor-pointer'><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemUserInfor