import { MdClear, MdPostAdd } from 'react-icons/md'
import { FaTrash } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import swal from 'sweetalert'

import { setChidlren, setRenderManagerMovie } from '../../redux/slides/appSlice'
import * as apis from '../../apis'
import { getBase64 } from '../../component/utils/helpers'

const FormAddMovie = ({ id }) => {
    const dispatch = useDispatch()
    const calendarElement = useRef()
    const containerElement = useRef()

    const [ valueCompany, setValueCompany ] = useState('')
    const [ valueCalendar, setValueCalendar ] = useState(new Date())
    const [ showCalendar, setShowCalendar ] = useState(false)
    // const [ spokenLanguage, setValueSpokenLanguage ] = useState('')
    const [ valueKeyVideo, setValueKeyVideo ] = useState('')
    const [ valueNameCast, setValueNameCast ] = useState('')
    const [ valueStatus, setValueStatus ] = useState('soon')
    const [ valueGenre, setValueGenre ] = useState()
    const [ valueDirector, setValueDirector ] = useState()
    const [ valuePoster, setValuePoster ] = useState()
    const [ valueBackground, setValueBackground ] = useState()
    const [ valueImages, setValueImages ] = useState([])
    const [ showTrash, setShowTrash ] = useState()
    const [ valuePosterSave, setValuePosterSave ] = useState()
    const [ valueBackgroundSave, setValueBackgroundSave ] = useState()

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
        // spoken_language: [],
        status: '',
        tagline: '',
        video: [],
        // images: [],
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
                // spoken_language: response.data.spoken_language,
                status: response.data.status,
                tagline: response.data.tagline,
                video: response.data.video,
                // images: response.data.images,
                cast: response.data.cast,
                director: response.data.director
            })

            setValueCompany(response.data.product_company.map(item => item.name).toString())
            setValueCalendar(response.data.release_date)
            // setValueSpokenLanguage(response.data.spoken_language.map(item => item).toString())
            setValueKeyVideo(response.data.video.map(item => item.key).toString())
            setValueNameCast(response.data.cast.map(item => item.name).toString())
            setValueStatus(response.data.status)
            setValueGenre(response.data.genres.map(item => item).toString())
            setValueDirector(response.data.director.toString())
            setValuePoster(response.data.poster_path)
            setValueBackground(response.data.backdrop_path)
            // setValueImages(response.data.images)
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

    //handle get file input poster
    const handleFilePoster = async(e) => {
        if (e.target.files[0]) {
            const url = await getBase64(e.target.files[0])
            setValuePoster(url)

            // handle get url online image
            const uploadData = new FormData()
            uploadData.append("file", e.target.files[0], "file")
    
            const response = await apis.uploadImage(uploadData)
            if (response.success) {
                setValuePosterSave(response.data.path)
            }
        }
    }

    // hanlde get file input background
    const handleFileBackground = async(e) => {
        if (e.target.files[0]) {
            const url = await getBase64(e.target.files[0])
            setValueBackground(url)

            // handle get url online image
            const uploadData = new FormData()
            uploadData.append("file", e.target.files[0], "file")
    
            const response = await apis.uploadImage(uploadData)
            if (response.success) {
                setValueBackgroundSave(response.data.path)
            }
        }
    }

    // handle get files images
    // const handleFileImages = async(e) => {
    //     if (e.target.files) {
    //         for (let file of e.target.files) {
    //             const url = await getBase64(file)
    //             setValueImages(prev => [...prev, url])
    //         }
    //     }
    // }

    // // handle delate image
    // const handleDeleteImage = (index) => {
    //     const newData = [...valueImages]
    //     newData.splice(index, 1)
    //     setValueImages(newData)
    // }

    // handle submit form
    const handleSubmit = async() => {
        const dataPass = {...dataMovie}
        const dataCompany = await valueCompany.split(',').map((item) => ({name: item?.trim()}))
        const dataVideo = await valueKeyVideo.split(',').map((item) => ({key: item?.trim()}))
        const dataCast = valueNameCast.split(',').map((item) => ({name: item?.trim()}))
        dataPass.product_company = dataCompany
        dataPass.release_date = moment(valueCalendar).format('YYYY/MM/DD')
        // dataPass.spoken_language = spokenLanguage?.trim().split(',')
        dataPass.video = dataVideo
        dataPass.cast = dataCast
        dataPass.status = valueStatus
        dataPass.genres = valueGenre?.trim().split(',')
        dataPass.director = valueDirector?.trim().split(',')
        // dataPass.images = valueImages
        dataPass.backdrop_path = valueBackgroundSave
        dataPass.poster_path = valuePosterSave

        const convertToArray = Object.entries(dataPass)
        for (let i = 0; i < convertToArray.length; i++) {
            if (convertToArray[i][1]?.length === 0) {
                swal('Error', 'Vui lòng nhập đầy đủ thông tin', 'error')
                return
            }
        }

        if (id) {
            const response = await apis.updateMovie(dataPass)
            
            swal(response.success ? 'Updated' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                dispatch(setChidlren(null))
                dispatch(setRenderManagerMovie())
            }
        } else {
            const response = await apis.createMovie(dataPass)

            swal(response.success ? 'Created' : 'Error', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                dispatch(setChidlren(null))
                dispatch(setRenderManagerMovie())
            }
        }
    }

    return (
        <div 
            className='w-[65%] mx-auto rounded-[10px] h-[90%] mt-[2%] overflow-hidden transition-all bg-white animate-back-up'
            onMouseDown={(e) => e.stopPropagation()}
            ref={containerElement}
        >
            <div className="w-full bg-main justify-center relative py-4 flex items-center" >
                <h2 className="text-xl text-center font-bold">{!id ? 'Thêm thông tin phim mới' : 'Cập nhật thông tin phim'}</h2>

                <button 
                    className='absolute right-[10px] hover:text-red-500'
                    onClick={() => dispatch(setChidlren(null))}
                ><MdClear size='30px'/></button>
            </div>

            <div className='overflow-y-scroll h-full w-full pb-[50px]'>
                <div className='mt-4 p-4 relative flex gap-4'>
                    <div className='flex-3'>
                        <img className='w-[100%] h-[400px] object-cover border-b-[1px] shadow-sm rounded-md' src={valueBackground?.slice(0, 4) === 'http' ? valueBackground : valueBackground?.slice(0, 4) === 'data' ? valueBackground : `${process.env.REACT_APP_IMAGE_URL}${valueBackground}`}></img>

                        <img className='absolute bottom-0 w-[25%] h-[250px] object-cover rounded-md ml-5' src={valuePoster?.slice(0, 4) === 'http' ? valuePoster : valuePoster?.slice(0, 4) === 'data' ? valuePoster : `${process.env.REACT_APP_IMAGE_URL}${valuePoster}`}></img>
                    </div>

                    <div className='mt-auto flex-1'>
                        <div>
                            <label htmlFor='poster' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' /> Chọn ảnh poster</label>
                            <input className='hidden' id='poster' type='file' onChange={handleFilePoster}></input>
                        </div>

                        <div className='mt-6'>
                            <label htmlFor='ground' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' /> Chọn ảnh bìa</label>
                            <input className='hidden' id='ground' type='file' onChange={handleFileBackground}></input>
                        </div>
                    </div>
                </div>

                {/* <div className='px-4 pt-7 pb-4'>
                    <div className='flex items-center gap-3'>
                        {valueImages?.map((item, index) => (
                            <div 
                                className='w-[60px] h-[60px] rounded-sm hover:cursor-pointer relative overflow-hidden'
                                onMouseEnter={() => setShowTrash(index)}
                                onClick={() => handleDeleteImage(index)}
                            >
                                <img 
                                    key={index} 
                                    className='w-full h-full rounded-sm object-cover'
                                    src={item.slice(0, 4) === 'data' ? item : `${process.env.REACT_APP_IMAGE_URL}${item}`}
                                ></img>

                                <div className='absolute inset-0 z-10 hover:bg-overlay flex items-center justify-center'>
                                    {showTrash === index && 
                                        <FaTrash size="20px" color='red'/>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-6'>
                        <label htmlFor='image' className='font-medium flex items-center gap-4 cursor-pointer'><FiUpload size='25px' />Chọn ảnh</label>
                        <input className='hidden' id='image' type='file' multiple onChange={handleFileImages}></input>
                    </div>
                </div> */}

                <div className='p-4'>
                    <div className='flex gap-4'>
                        <div>
                            <label className='font-medium'>ID Phim</label>
                            <input 
                                className='ml-2 border-b-[1px] rounded-md p-1 border-gray-300 outline-none' 
                                placeholder='Nhập id' 
                                value={dataMovie.id}
                                onChange={(e) => (setDataMovie((prev) => ({...prev, id: e.target.value})))}
                            ></input>
                        </div>

                        <div>
                            <label className='font-medium'>Ngôn ngữ</label>
                            <input 
                                className='ml-2 border-b-[1px] rounded-md p-1 border-gray-300 outline-none capitalize' 
                                placeholder='Nhập ngôn ngữ' 
                                value={dataMovie.original_language}
                                onChange={(e) => (setDataMovie((prev) => ({...prev, original_language: e.target.value})))}
                            ></input>
                        </div>
                    </div>

                    <div className='flex-1 flex items-center mt-4'>
                        <label className='font-medium'>Tên phim</label>
                        <input 
                            className='ml-2 border-b-[1px] p-1 border-gray-300 rounded-md flex-1 outline-none' 
                            placeholder='Nhập tên'
                            value={dataMovie.original_title} 
                            onChange={(e) => (setDataMovie((prev) => ({...prev, original_title: e.target.value})))}
                        ></input>
                    </div>
                    

                    <div className='flex items-center w-full mt-4'>
                        <label className='font-medium'>Thể loại</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-b-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập thể loại: Hành động,...' 
                            value={valueGenre} 
                            onChange={(e) => setValueGenre(e.target.value)}
                        ></input>
                    </div>

                    <div className='flex items-center w-full mt-4'>
                        <label className='font-medium'>Đạo diễn</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-b-[1px] flex-1 p-1 outline-none' 
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
                            className='ml-2 border-gray-300 rounded-md border-b-[1px] flex-1 p-1 outline-none' 
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
                                className='ml-2 border-b-[1px] rounded-md p-1 border-gray-300 outline-none' 
                                placeholder='Nhập ngày' 
                                value={moment(valueCalendar).format('DD/MM/YYYY')}
                            ></input>

                            {showCalendar &&
                                <div 
                                    className='absolute left-[100%] bottom-[0px] bg-white p-4 shadow-lg' 
                                    ref={calendarElement}
                                >
                                    <Calendar onChange={setValueCalendar} value={valueCalendar} />
                                </div>
                            }
                        </div>

                        <div className='ml-4'>
                            <label className='font-medium'>Thời lượng</label>
                            <input 
                                className='ml-2 border-b-[1px] rounded-md p-1 w-[100px] border-gray-300 outline-none' 
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
                                <option value='showed'>Đã chiếu</option>
                            </select>
                        </div>
                    </div>

                    {/* <div className='flex items-center gap-1 mt-6'>
                        <label className='font-medium'>Ngôn ngữ nói:</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-b-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: English,...' 
                            value={spokenLanguage}
                            onChange={(e) => setValueSpokenLanguage(e.target.value)}
                        ></input>
                    </div> */}

                    <div className='flex items-center flex-1 mt-auto pt-4'>
                        <label className='font-medium'>Tagline</label>
                        <input 
                            className='ml-2 border-b-[1px] rounded-md p-1 w-full border-gray-300 outline-none' 
                            placeholder='Nhập tagline' 
                            value={dataMovie.tagline}
                            onChange={(e) => (setDataMovie((prev) => ({...prev, tagline: e.target.value})))}
                        ></input>
                    </div>

                    <div className='flex items-center gap-1 mt-6'>
                        <label className='font-medium'>Danh sách key video:</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-b-[1px] flex-1 p-1 outline-none' 
                            placeholder='Nhập tên: usdfsarehe,...' 
                            value={valueKeyVideo}
                            onChange={(e) => setValueKeyVideo(e.target.value)} 
                        ></input>
                    </div>

                    <div className='flex items-center gap-1 mt-6'>
                        <label className='font-medium'>Danh sách diễn viên:</label>
                        <input 
                            className='ml-2 border-gray-300 rounded-md border-b-[1px] flex-1 p-1 outline-none' 
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
                    >{id ? 'Cập nhật' : 'Thêm'}</button>
                </div>
            </div>
        </div>
    )
}

export default FormAddMovie