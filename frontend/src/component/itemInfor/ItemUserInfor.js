import clsx from 'clsx'
import { MdEmail, MdOutlineDelete, MdOutlineRestorePage} from "react-icons/md"
import default_avatar from '../../component/assest/images/defaul_avatar.jpg'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'

import { setChidlren, setRenderManagerUser } from '../../redux/slides/appSlice'
import { FormEditUser } from '../../component/forms'
import * as apis from '../../apis'
import { listRole } from '../../ultis/options'

const ItemUserInfor = ({ name, email, phone, role, image, _id }) => {
    const dispatch = useDispatch()

    const handleEditUser = () => {
        const dataPass = {
            name,
            email,
            phone,
            role,
            image,
            uid: _id
        }

        dispatch(setChidlren(<FormEditUser data={dataPass} />))
    }

    const handleDeleteUser = async() => {
        const willDelete = await swal({
            title: "Xoá phim",
            text: "Bạn có chắn chắc muốn xoá phim không?",
            icon: "warning",
            dangerMode: true,
            buttons: true,
        });
            
        if (willDelete) {
            const response = await apis.deleteUser(_id)
            swal(response.success ? "Deleted!" : "Error", response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                dispatch(setRenderManagerUser())
            }
        }
    }

    return (
        <ul className={clsx('flex items-center px-4 w-full mt-3 rounded-md border-b-2 border-l-4  py-1 shadow-md', {'border-l-main': +role === 9}, {'border-l-green-500': +role === 3}, {'border-l-blue-500': +role === 7})}>
            <li className='rounded-sm'>
                <img 
                    className="w-[35px] h-[35px] mr-2 object-cover rounded-sm" 
                    src={image || default_avatar}
                ></img>
            </li>
            <li className="flex-1 font-medium">{name}</li>
            <li className="flex-1 font-medium line-clamp-1 pr-2">{email.length < 28 ? email : `${email.slice(0, 26)}...`}</li>
            <li className="flex-1 font-medium">{phone}</li>
            <li className="flex-1 font-medium">{listRole.find(item => item.value === +role).name}</li>
            <li 
                className='cursor-pointer'
                onClick={handleEditUser}
            ><MdOutlineRestorePage size='22px' /></li>
            <li 
                className='ml-2 cursor-pointer'
                onClick={handleDeleteUser}
            ><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemUserInfor