import { useDispatch } from 'react-redux'
import { MdClear } from 'react-icons/md'

import { setChidlren } from '../../redux/slides/appSlice'

const FormEditUser = ({data}) => {
    const dispatch = useDispatch()

    console.log(data)
    return (
        <div className="w-[700px] mx-auto mt-[50px] h-[300px] bg-white animate-back-up rounded-md overflow-hidden">
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{!data ? 'Thêm thông tin xuất chiếu mới' : 'Cập nhật thông tin người dùng'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <div className='p-4'>

            </div>
        </div>
    )
}

export default FormEditUser