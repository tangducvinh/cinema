import { useDispatch } from 'react-redux'
import { MdClear } from 'react-icons/md'
import moment from 'moment'

import { setChidlren } from '../../redux/slides/appSlice'

const FormWatchOrder = ({data}) => {
    const dispatch = useDispatch()

    return (
        <div 
            className="w-[650px] mx-auto bg-white animate-back-up rounded-md overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{'Chi tiết hoá đơn'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <div className='p-4'>
                <div className='flex gap-5'>
                    <div className='w-[150px] h-[150px] rounded-md overflow-hidden'>
                        <img className='w-full h-full object-cover' alt='porter' src={data?.movieId.poster_path?.slice(0, 4) === 'http' ? data?.movieId?.poster_path :`${process.env.REACT_APP_IMAGE_URL}${data?.movieId?.poster_path}`}></img>
                    </div>

                    <div className='flex-1'>
                        <div className='flex items=center gap-2'>
                            <label className='font-medium'>Mã:</label>
                            <p className='border-b-[1px]'>{data?.orderNumber}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Tên phim:</label>
                            <p className='border-b-[1px]'>{data?.movieId?.original_title}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Tên rạp:</label>
                            <p className='border-b-[1px]'>{data?.roomId?.name}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Thời gian chiếu:</label>
                            <p className='border-b-[1px]'>{moment(data?.showId?.begin_time).format('HH:mm DD/MM/YYYY')}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Tên người mua:</label>
                            <p className='border-b-[1px]'>{data?.userId.name}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Email:</label>
                            <p className='border-b-[1px]'>{data?.userId.email}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Số điện thoại:</label>
                            <p className='border-b-[1px]'>{data?.userId.phone}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Danh sách ghế:</label>
                            <p className='border-b-[1px]'>{data?.seats?.map(item => (item.name)).toString().toUpperCase()}</p>
                        </div>

                        <div className='flex items=center gap-2 mt-4'>
                            <label className='font-medium'>Thời gian thanh toán:</label>
                            <p className='border-b-[1px]'>{moment(data?.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FormWatchOrder