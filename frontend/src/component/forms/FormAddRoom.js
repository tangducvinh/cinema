import { MdClear } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'

import * as apis from '../../apis'
import { setChidlren } from '../../redux/slides/appSlice'

const FormAddRoom = ({reRender}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: {errors}} = useForm()
    const [ showSubmit, setShowSubmit ] = useState(false)

    const onSubmit = async(data) => {
        if (showSubmit) {
            const response = await apis.createRoom({name: data.name, row: data.width, column: data.height})
            swal(response?.success ? 'Thành công' : 'Thất bại', response?.mes || 'Tên phòng đã tồn tại', response?.success ? 'success' : 'error')
            if (response?.success) {
                dispatch(setChidlren(null))
                reRender(prev => !prev)
            }
        }
    }

    useEffect(() => {
        if (watch('name') !== '' && watch('width') !== '' && watch('height') !== '') {
            setShowSubmit(true)
        } else {
            setShowSubmit(false)
        }
    }, [watch('name'), watch('width'), watch('height')])

    return (
        <div 
            className="w-[500px] mx-auto bg-white animate-back-up rounded-md overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{'Tạo phòng chiếu mới'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}  className='p-4'>
                <div className='flex items-center gap-2'>
                    <label className='font-medium'>Tên phòng</label>
                    <input {...register('name', {required: true})} placeholder='Nhập tên phòng' className='outline-none border-b-[1px]'></input>
                </div>
                {errors.name?.type === 'required' && <span className='text-sm text-red-500'>Vui lòng nhập thông tin</span>}

                <div className='flex items-center gap-2 mt-5'>
                    <label className='font-medium'>Chiều rộng</label>
                    <input {...register('width', {required: true})} placeholder='Nhập chiều rộng' type='number' className='outline-none border-b-[1px]'></input>
                </div>
                {errors.width?.type === 'required' && <span className='text-sm text-red-500'>Vui lòng nhập thông tin</span>}

                <div className='flex items-center gap-2 mt-5'>
                    <label className='font-medium'>Chiều dài</label>
                    <input {...register('height', {required: true})} placeholder='Nhập chiều dài' type='number' className='outline-none border-b-[1px]'></input>
                </div>
                {errors.height?.type === 'required' && <span className='text-sm text-red-500'>Vui lòng nhập thông tin</span>}

                <div className='flex justify-center mt-6'>
                    <button 
                        className={clsx('py-2 mx-auto font-medium transition-all rounded-md w-[250px]', {'bg-main': showSubmit}, {'bg-gray-400': !showSubmit})}
                    >Tạo mới</button>
                </div>
            </form>
        </div>
    )
}

export default FormAddRoom