import { MdClear, MdPostAdd } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { setChidlren } from '../../redux/slides/appSlice'
import * as apis from '../../apis'

const FormAddMovie = ({ id }) => {
    const dispatch = useDispatch()
    const calendarElement = useRef()
    const containerElement = useRef()

    const [ valueCompany, setValueCompany ] = useState('')
    const [ valueCalendar, setValueCalendar ] = useState(new Date())
    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ spokenLanguage, setValueSpokenLanguage ] = useState('')
    const [ valueKeyVideo, setValueKeyVideo ] = useState('')
    const [ valueNameCast, setValueNameCast ] = useState('')
    const [ valueStatus, setValueStatus ] = useState('soon')
    const [ valueGenre, setValueGenre ] = useState()
    const [ valueDirector, setValueDirector ] = useState()


    const [ dataMovie, setDataMovie ] = useState({
        id: '',
        genres: [],
        original_language: '',
        original_title: '',
        overview: '',
        poster_path: '',
        backdrop_path: '',
        product_company: [],
        release_date: '',
        runtime: '',
        spoken_language: [],
        status: '',
        tagline: '',
        video: [],
        images: [],
        cast: [],
        director: [],
    })

    const fecthDataMovie = async(mid) => {
        const response = await apis.getMovieInfor(mid)
        if (response.success) {
            setDataMovie({
                id: response.data.id,
                genres: response.data.genres,
                original_language: response.data.original_language,
                original_title: response.data.original_title,
                overview: response.data.overview,
                poster_path: response.data.poster_path,
                backdrop_path: response.data.backdrop_path,
                product_company: response.data.product_company,
                release_date: response.data.release_date,
                runtime: response.data.runtime,
                spoken_language: response.data.spoken_language,
                status: response.data.status,
                tagline: response.data.tagline,
                video: response.data.video,
                images: response.data.images,
                cast: response.data.cast,
                director: response.data.director
            })

            setValueCompany(response.data.product_company.map(item => item.name).toString())
            setValueCalendar(response.data.release_date)
            setValueSpokenLanguage(response.data.spoken_language.map(item => item).toString())
            setValueKeyVideo(response.data.video.map(item => item.key).toString())
            setValueNameCast(response.data.cast.map(item => item.name).toString())
            setValueStatus(response.data.status)
            setValueGenre(response.data.genres.map(item => item).toString())
            setValueDirector(response.data.director.toString())
        }
    }

    useEffect(() => {
        if (id) fecthDataMovie(id)
    }, [id])

    //handle click out calendar is hidden
    useEffect(() => {
        const handleHiddenCalendar = (e) => {
            if (!calendarElement.current?.contains(e.target)) {
                setShowCalendar(false)
            }
        }

        containerElement.current.addEventListener('click', (e) => handleHiddenCalendar(e))

        return containerElement.current.removeEventListener('click', handleHiddenCalendar)
    }, [])

    const handleSubmit = async() => {
        const dataPass = {...dataMovie}

        const dataCompany = await valueCompany.split(',').map((item) => ({name: item.trim()}))
        // await setDataMovie(prev => ({...prev, product_company: dataCompany}))
        // await setDataMovie(prev => ({...prev, release_date: moment(valueCalendar).format('YYYY/MM/DD')}))
        // await setDataMovie(prev => ({...prev, spoken_language: spokenLanguage.split(',')}))
        const dataVideo = await valueKeyVideo.split(',').map((item) => ({key: item.trim()}))
        // await setDataMovie(prev => ({...prev, video: dataVideo}))
        const dataCast = valueNameCast.split(',').map((item) => ({name: item.trim()}))
        // await setDataMovie(prev => ({...prev, cast: dataCast}))
        // await setDataMovie(prev => ({...prev, status: valueStatus}))
        // await setDataMovie(prev => ({...prev, genres: valueGenre.trim().split(',')}))
        // await setDataMovie(prev => ({...prev, director: valueDirector.trim().split(',')}))

        dataPass.product_company = dataCompany
        dataPass.release_date = moment(valueCalendar).format('YYYY/MM/DD')
        dataPass.spoken_language = spokenLanguage.trim().split(',')
        dataPass.video = dataVideo
        dataPass.cast = dataCast
        dataPass.status = valueStatus
        dataPass.genres = valueGenre.trim().split(',')
        dataPass.director = valueDirector.trim().split(',')

        const response = await apis.updateMovie(dataPass)

        console.log(response)
    }

    return (
        <div 
            className='w-[1000px] h-[800px] mx-auto mt-[100px] rounded-[10px] overflow-hidden transition-all bg-white animate-back-up'
            onClick={(e) => e.stopPropagation()}
            ref={containerElement}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{id ? 'Thêm thông tin phim mới' : 'Cập nhật thông tin phim'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <div className='overflow-y-scroll h-[730px]'>
                <div className='mt-4 p-4 relative flex gap-4'>
                    <div>
                        <img className='w-[750px] h-[300px] object-cover border-[1px] shadow-sm rounded-md' src={`${process.env.REACT_APP_IMAGE_URL}${dataMovie.backdrop_path}`}></img>

                        <img className='absolute bottom-0 w-[200px] h-[250px] object-cover rounded-md ml-5' src={`${process.env.REACT_APP_IMAGE_URL}${dataMovie.poster_path}`}></img>
                    </div>

                    <div className='mt-auto'>
                        <div>
                            <label htmlFor='poster' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' /> Chọn ảnh poster</label>
                            <input className='hidden' id='poster' type='file'></input>
                        </div>

                        <div className='mt-6'>
                            <label htmlFor='ground' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' /> Chọn ảnh bìa</label>
                            <input className='hidden' id='ground' type='file'></input>
                        </div>
                    </div>
                </div>

                <div className='px-4 pt-7 pb-4'>
                    <div className='flex items-center gap-3'>
                        {/* <img className='w-[60px] h-[60px] rounded-sm object-cover' src='https://th.bing.com/th/id/R.40bb16d113fec1d642bfcbe193f017d5?rik=PPoebEIsQKCRgg&pid=ImgRaw&r=0'></img> */}
                        {dataMovie.images.map((item, index) => (
                            <img key={index} className='w-[60px] h-[60px] rounded-sm object-cover' src={`${process.env.REACT_APP_IMAGE_URL}${item}`}></img>
                        ))}
                    </div>

                    <div className='mt-6'>
                        <label htmlFor='ground' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' />Chọn ảnh</label>
                        <input className='hidden' id='ground' type='file'></input>
                    </div>
                </div>

                <div className='p-4'>
                    <div className='flex justify-between gap-4'>
                        <div>
                            <label className='font-medium'>ID Phim</label>
                            <input 
                                className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                                placeholder='Nhập id' 
                                value={dataMovie.id}
                                onChange={(e) => (setDataMovie((prev) => ({...prev, id: e.target.value})))}
                            ></input>
                        </div>

                        <div className='flex-1 flex items-center'>
                            <label className='font-medium'>Tên phim</label>
                            <input 
                                className='ml-2 border-[1px] p-1 border-gray-300 rounded-md flex-1 outline-none' 
                                placeholder='Nhập tên'
                                value={dataMovie.original_title} 
                                onChange={(e) => (setDataMovie((prev) => ({...prev, original_title: e.target.value})))}
                            ></input>
                        </div>

                        <div>
                            <label className='font-medium'>Ngôn ngữ</label>
                            <input 
                                className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none capitalize' 
                                placeholder='Nhập ngôn ngữ' 
                                value={dataMovie.original_language}
                                onChange={(e) => (setDataMovie((prev) => ({...prev, original_language: e.target.value})))}
                            ></input>
                        </div>
                    </div>

                    <div className='flex items-center w-full mt-4'>
                        <label className='font-medium'>Thể loại</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập thể loại: Hành động,...' 
                            value={valueGenre} 
                            onChange={(e) => setValueGenre(e.target.value)}
                        ></input>
                    </div>

                    <div className='flex items-center w-full mt-4'>
                        <label className='font-medium'>Đạo diễn</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: James Cameron,...' 
                            value={valueDirector} 
                            onChange={(e) => setValueDirector(e.target.value)}
                        ></input>
                    </div>

                    <div className='flex mt-4'>
                        <label className='font-medium'>Mô tả</label>
                        <textarea 
                            className='border-gray-300 ml-2 rounded-md flex-1 h-[100px] border-[1px] outline-none' 
                            value={dataMovie.overview}
                            onChange={(e) => (setDataMovie((prev) => ({...prev, overview: e.target.value})))}
                        ></textarea>
                    </div>

                    <div className='flex items-center w-full py-4'>
                        <label className='font-medium'>Tên các công ty: </label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: Cinema,...' 
                            value={valueCompany} 
                            onChange={(e) => setValueCompany(e.target.value)}
                        ></input>
                    </div>

                    <div className='flex items-center'>
                        <div className='relative'>
                            <label className='font-medium'>Ngày phát hành</label>
                            <input 
                                onClick={() => setShowCalendar(!showCalendar)}
                                className='ml-2 border-[1px] rounded-md p-1 border-gray-300 outline-none' 
                                placeholder='Nhập ngày' 
                                value={moment(valueCalendar).format('DD/MM/YYYY')}
                            ></input>

                            {showCalendar &&
                                <div 
                                    className='absolute left-[110px] bg-white p-4 shadow-lg' 
                                    ref={calendarElement}
                                >
                                    <Calendar onChange={setValueCalendar} value={valueCalendar} />
                                </div>
                            }
                        </div>

                        <div className='ml-4'>
                            <label className='font-medium'>Thời lượng</label>
                            <input 
                                className='ml-2 border-[1px] rounded-md p-1 w-[100px] border-gray-300 outline-none' 
                                placeholder='Nhập thời lượng' 
                                type='number'
                                value={dataMovie.runtime}
                                onChange={(e) => (setDataMovie((prev) => ({...prev, runtime: e.target.value})))}
                            ></input>
                        </div>

                        <div className='ml-4'>
                            <label className='font-medium mr-2'>Status</label>
                            <select onChange={(e) => setValueStatus(e.target.value)} value={valueStatus}>
                                <option value='soon'>Sắp chiếu</option>
                                <option value='showing'>Đang chiếu</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex items-center gap-1 mt-6'>
                        <label className='font-medium'>Ngôn ngữ nói:</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: English,...' 
                            value={spokenLanguage}
                            onChange={(e) => setValueSpokenLanguage(e.target.value)}
                        ></input>
                    </div>

                    <div className='flex items-center flex-1 mt-auto pt-4'>
                        <label className='font-medium'>Tagline</label>
                        <input 
                            className='ml-2 border-[1px] rounded-md p-1 w-full border-gray-300 outline-none' 
                            placeholder='Nhập tagline' 
                            value={dataMovie.tagline}
                            onChange={(e) => (setDataMovie((prev) => ({...prev, tagline: e.target.value})))}
                        ></input>
                    </div>

                    <div className='flex items-center gap-1 mt-6'>
                        <label className='font-medium'>Danh sách key video:</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: usdfsarehe,...' 
                            value={valueKeyVideo}
                            onChange={(e) => setValueKeyVideo(e.target.value)} 
                        ></input>
                    </div>

                    <div className='flex items-center gap-1 mt-6'>
                        <label className='font-medium'>Danh sách diễn viên:</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: davil, sosen,...' 
                            value={valueNameCast}
                            onChange={(e) => setValueNameCast(e.target.value)} 
                        ></input>
                    </div>
                </div>

                <div className='flex justify-center mt-6 pb-[30px]'>
                    <button 
                        className='bg-main py-2 mx-auto font-medium rounded-md w-[500px]'
                        onClick={handleSubmit}
                    >Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default FormAddMovie