import { MdClear, MdPostAdd } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { FiUpload } from "react-icons/fi"

import { setChidlren } from '../../redux/slides/appSlice'

const FormAddMovie = () => {
    const dispatch = useDispatch()
    return (
        <div 
            className='w-[1000px] h-[800px] mx-auto mt-[100px] rounded-[10px] overflow-hidden transition-all bg-white animate-back-up'
            onClick={(e) => e.stopPropagation()}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">Thêm phim mới</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <div className='overflow-y-scroll h-[730px]'>
                <div className='mt-4 p-4 relative flex gap-4'>
                    <div>
                        <img className='w-[750px] h-[300px] object-cover border-[1px] shadow-sm rounded-md' src='https://th.bing.com/th/id/OIP.mKC1YIneo8f2v0iWBED-dgHaDh?rs=1&pid=ImgDetMain'></img>

                        <img className='absolute bottom-0 w-[200px] h-[250px] object-cover rounded-md ml-5' src='https://th.bing.com/th/id/R.55dfc5633ee5810fb001b18f39a25561?rik=H916zhg3YDLQkA&pid=ImgRaw&r=0'></img>
                    </div>

                    <div className='mt-auto'>
                        <div>
                            <label htmlFor='poster' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' /> Chọn ảnh poster</label>
                            <input className='hidden' id='poster' type='file'></input>
                        </div>

                        <div className='mt-4'>
                            <label htmlFor='ground' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' /> Chọn ảnh bìa</label>
                            <input className='hidden' id='ground' type='file'></input>
                        </div>
                    </div>
                </div>

                <div className='px-4 pt-7 pb-4'>
                    <div className='flex items-center gap-3'>
                        <img className='w-[60px] h-[60px] rounded-sm object-cover' src='https://th.bing.com/th/id/R.40bb16d113fec1d642bfcbe193f017d5?rik=PPoebEIsQKCRgg&pid=ImgRaw&r=0'></img>
                        <img className='w-[60px] h-[60px] rounded-sm object-cover' src='https://th.bing.com/th/id/R.40bb16d113fec1d642bfcbe193f017d5?rik=PPoebEIsQKCRgg&pid=ImgRaw&r=0'></img>
                        <img className='w-[60px] h-[60px] rounded-sm object-cover' src='https://th.bing.com/th/id/R.40bb16d113fec1d642bfcbe193f017d5?rik=PPoebEIsQKCRgg&pid=ImgRaw&r=0'></img>
                        <img className='w-[60px] h-[60px] rounded-sm object-cover' src='https://th.bing.com/th/id/R.40bb16d113fec1d642bfcbe193f017d5?rik=PPoebEIsQKCRgg&pid=ImgRaw&r=0'></img>
                        <img className='w-[60px] h-[60px] rounded-sm object-cover' src='https://th.bing.com/th/id/OIP.4kEVtkjFs8tS-p7mcNwrIAHaHa?rs=1&pid=ImgDetMain'></img>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='ground' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' />Chọn ảnh</label>
                        <input className='hidden' id='ground' type='file'></input>
                    </div>
                </div>

                <div className='p-4'>
                    <div className='flex justify-between'>
                        <div>
                            <label className='font-medium'>ID Phim</label>
                            <input className='ml-2 border-[1px] rounded-sm p-1 shadow-md outline-none' placeholder='Nhập id'></input>
                        </div>

                        <div>
                            <label className='font-medium'>Tên phim</label>
                            <input className='ml-2 border-[1px] rounded-sm p-1 shadow-md outline-none' placeholder='Nhập tên'></input>
                        </div>

                        <div>
                            <label className='font-medium'>Ngôn ngữ</label>
                            <input className='ml-2 border-[1px] rounded-sm p-1 shadow-md outline-none' placeholder='Nhập ngôn ngữ'></input>
                        </div>
                    </div>

                    <div className='flex mt-4'>
                        <label className='font-medium'>Mô tả</label>
                        <textarea className='shadow-md ml-2 rounded-sm flex-1 h-[100px] border-[1px] outline-none'></textarea>
                    </div>

                    <div className='flex'>
                            <div className='mt-4'>
                                <ul className='font-medium'>Tên các công ty: </ul>
                                <div className='mt-4 flex items-center'>
                                    <label className='font-medium'>Công ty</label>
                                    <input className='ml-2 shadow-md rounded-sm border-[1px] p-1 outline-none' placeholder='Nhập tên' ></input>
                                    <button className='ml-2 hover:text-green-500'><MdPostAdd size='23px' /></button>
                                </div>
                            </div>

                            <div className='mt-auto flex ml-7'>
                                <div>
                                    <label className='font-medium'>Ngày phát hành</label>
                                    <input className='ml-2 border-[1px] rounded-sm p-1 shadow-md outline-none' placeholder='Nhập ngày'></input>
                                </div>

                                <div className='ml-4'>
                                    <label className='font-medium'>Thời lượng</label>
                                    <input className='ml-2 border-[1px] rounded-sm p-1 shadow-md outline-none' placeholder='Nhập thời lượng'></input>
                                </div>
                            </div>
                    </div>

                    <div className='flex mt-4'>
                            <div className='mt-4'>
                                <ul className='font-medium flex items-center gap-1'>Danh sách ngôn ngữ: 
                                    <li className='text-gray-700'>abc, </li>
                                </ul>
                                <div className='mt-4 flex items-center'>
                                    <label className='font-medium'>Ngôn ngữ</label>
                                    <input className='ml-2 shadow-md rounded-sm border-[1px] p-1 outline-none' placeholder='Nhập ngôn ngữ' ></input>
                                    <button className='ml-2 hover:text-green-500'><MdPostAdd size='23px' /></button>
                                </div>
                            </div>

                            <div className='flex items-center flex-1 mt-auto ml-7'>
                                <label className='font-medium'>Tagline</label>
                                <input className='ml-2 border-[1px] rounded-sm p-1 w-full shadow-md outline-none' placeholder='Nhập tagline'></input>
                            </div>
                    </div>

                    <div className='mt-8'>
                        <ul className='font-medium flex items-center gap-1'>Danh sách key video: 
                            <li className='text-gray-700'>abcdasfs, </li>
                        </ul>
                        <div className='mt-4 flex items-center'>
                            <label className='font-medium'>Key video</label>
                            <input className='ml-2 shadow-md rounded-sm border-[1px] p-1 outline-none' placeholder='Nhập key' ></input>
                            <button className='ml-2 hover:text-green-500'><MdPostAdd size='23px' /></button>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <ul className='font-medium flex items-center gap-1'>Danh sách diễn viên: 
                            <li className='text-gray-700'>Tăng Đức Vinh,.. </li>
                        </ul>
                        <div className='mt-4 flex items-center'>
                            <label className='font-medium'>Diễn viên</label>
                            <input className='ml-2 shadow-md rounded-sm border-[1px] p-1 outline-none' placeholder='Nhập tên diễn viên' ></input>
                            <button className='ml-2 hover:text-green-500'><MdPostAdd size='23px' /></button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mt-4 pb-[30px]'>
                    <button className='bg-main py-2 mx-auto font-medium rounded-md w-[500px]'>Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default FormAddMovie