import { useDispatch } from 'react-redux'
import { MdClear } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import swal from 'sweetalert'

import * as apis from '../../apis'
import avatar from '../assest/images/defaul_avatar.jpg'
import { listRole } from '../../ultis/options'
import { setChidlren, setRenderManagerUser } from '../../redux/slides/appSlice'

const FormEditUser = ({data}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, watch, reset, formState: {errors} } = useForm()

    useEffect(() => {
        setValue('name', data.name)
        setValue('email', data.email)
        setValue('phone', data.phone)
        setValue('role', data.role)
    }, [data])

    const onSubmit = async(dataForm) => {
        const dataPass = { ...dataForm}
        dataPass.uid = data.uid

        console.log(dataPass)

        const response = await apis.updateUser(dataPass)

        console.log(response)
            
        swal(response.success ? 'Updated' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
        if (response.success) {
            dispatch(setChidlren(null))
            dispatch(setRenderManagerUser())
        }
    }

    return (
        <div 
            className="w-[700px] mx-auto mt-[50px] bg-white animate-back-up rounded-md overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{!data ? 'Thêm thông tin xuất chiếu mới' : 'Cập nhật thông tin người dùng'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <img className='w-[200px] h-[200px] object-cover' src={data.image || avatar} alt='avatar'></img>

            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div className='flex-1 flex items-center mt-4'>
                    <label className='font-medium'>Tên người dùng</label>
                    <input 
                        className='ml-2 border-b-[1px] p-1 border-gray-300 rounded-md flex-1 outline-none' 
                        placeholder='Nhập họ tên'
                        {...register("name", {required: true, minLength: 5})}
                        // value={dataMovie.original_title} 
                        // onChange={(e) => (setDataMovie((prev) => ({...prev, original_title: e.target.value})))}
                    ></input>
                </div>
                {errors.name?.type === 'required' && <span className='text-red-500 text-sm'>Vui lòng nhập thông tin</span>}
                {errors.name?.type === 'minLength' && <span className='text-red-500 text-sm'>Tên tối thiểu phải có 6 kí tự</span>}

                <div className='flex-1 flex items-center mt-4'>
                    <label className='font-medium'>Email</label>
                    <input 
                        className='ml-2 border-b-[1px] p-1 border-gray-300 rounded-md flex-1 outline-none' 
                        placeholder='Nhập tên'
                        {...register("email", {required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                        // value={dataMovie.original_title} 
                        // onChange={(e) => (setDataMovie((prev) => ({...prev, original_title: e.target.value})))}
                    ></input>
                </div>
                {errors.email?.type === 'required' && <span className='text-red-500 text-sm'>Vui lòng nhập thông tin</span>}
                {errors.email?.type === 'pattern' && <span className='text-red-500 text-sm'>Vui lòng nhập đúng mẫu email</span>}


                <div className='flex-1 flex items-center mt-4'>
                    <label className='font-medium'>Số điện thoại</label>
                    <input 
                        className='ml-2 border-b-[1px] p-1 border-gray-300 rounded-md flex-1 outline-none' 
                        placeholder='Nhập tên'
                        {...register("phone", {required: true, minLength: 10, maxLength: 10})}
                        // value={dataMovie.original_title} 
                        // onChange={(e) => (setDataMovie((prev) => ({...prev, original_title: e.target.value})))}
                    ></input>
                </div>
                {errors.phone?.type === 'required' && <span className='text-red-500 text-sm'>Vui lòng nhập thông tin</span>}
                {errors.phone?.type === 'minLength' && <span className='text-red-500 text-sm'>Số điện thoại phải có 10 số</span>}
                {errors.phone?.type === 'maxLength' && <span className='text-red-500 text-sm'>Số điện thoại phải có 10 số</span>}


                <div className='mt-4'>
                    <label className='font-medium mr-2'>Vai trò</label>
                    <select {...register('role')}>
                        {listRole.map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='flex justify-center mt-6 pb-[20px]'>
                    <button 
                        className={'py-2 mx-auto font-medium rounded-md w-[500px] bg-main'}
                    >{data ? 'Cập nhật' : 'Thêm'}</button>
                </div>
            </form>
        </div>
    )
}

export default FormEditUser