import { memo, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'

import * as apis from '../../apis'

const menu = [
    {
        name: 'Hoạt động',
        value: 'activity'
    },
    {
        name: 'Đang sửa',
        value: 'fix'
    },
    {
        name: 'Trống',
        value: 'empty'
    }
]

const FormEditSeat = ({data, rid, onSet}) => {
    const { register, handleSubmit, setValue, watch, reset, formState: {errors} } = useForm()

    useEffect(() => {
        setValue('name', data?.name)
        setValue('_id', data?._id)
        setValue('status', data?.status || 'empty')
        setValue('idRoom', data?.idRoom)
        setValue('number', data?.number)
        setValue('row', data?.row)
    }, [data])

    const onSubmit = async(data) => {
        if (data._id) {
            const response = await apis.updateSeat({id: data._id, name: data.name, status: data.status})

            swal(response.success ? 'Updated' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                onSet(prev => !prev)
            }

        } else {
            const response = await apis.createSeat({idRoom: rid, row: data.row + 1, number: data.number + 1, status: data.status, name: data.name})

            swal(response.success ? 'Created' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                onSet(prev => !prev)
            }

        }
    }

    useEffect(() => {
        if (watch('status') === 'empty') {
            setValue('name', '')
        }
    }, [watch('status')])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='ml-[50px]'
        >
            <h3 className='font-medium text-xl text-main text-center'>Thay đổi thông tin ghế</h3>

            <div className='flex items-center mt-8'>
                <label className='font-medium'>Tên ghế</label>
                <input 
                    className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                    placeholder='Nhập tên' 
                    {...register('name')}
                ></input>
            </div>

            <div className='mt-6'>
                <label className='font-medium mr-2'>Chọn trạng thái: </label>
                <select {...register('status')}>
                    {menu?.map((item, index) => (
                        <option key={index} value={item.value}>{item?.name}</option>
                    ))}
                </select>
            </div>

            <div className='flex justify-center mt-8'>
                <button className='mt-4 bg-main py-1 px-4 rounded-md font-medium'>{data?._id ? 'Cập nhật' : 'Thêm mới'}</button>
            </div>
        </form>
    )
}

export default memo(FormEditSeat)