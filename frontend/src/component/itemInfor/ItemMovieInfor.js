import clsx from 'clsx'
import { MdOutlineDelete, MdOutlineRestorePage } from "react-icons/md"
import { useDispatch, useSelector  } from 'react-redux'
import moment from 'moment'
import swal from 'sweetalert'

import { FormAddMovie, FormEditMovie } from '../../component/forms'
import { setChidlren, setRenderManagerMovie } from '../../redux/slides/appSlice'
import * as apis from '../../apis'
import { statusMovie } from '../../ultis/options'
import { createInstance } from '../../axios'

const ItemMovieInfor = ({ id, name, runtime, status, image, release }) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)

    let axiosJWT = createInstance(dispatch, currentUser)

    const handleUpdateMovie = () => {
        dispatch(setChidlren(<FormAddMovie id={id}/>))
    }

    const handleDeleteMovie = async() => {
        const willDelete = await swal({
            title: "Xoá phim",
            text: "Bạn có chắn chắc muốn xoá phim không?",
            icon: "warning",
            dangerMode: true,
            buttons: true,
        });
           
        if (willDelete) {
            const response = await apis.deleteMovie(id, axiosJWT)
            swal(response.success ? "Deleted!" : "Error", response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
            if (response.success) {
                dispatch(setRenderManagerMovie())
            }
        }
    }

    return (
        <ul className="flex items-center text-[15px] px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-medium">{`#${id}`}</li>
            <li>
                <img className="w-[35px] h-[35px] rounded-sm mr-2 object-cover" src={image.slice(0, 4) === 'http' ? image :`${process.env.REACT_APP_IMAGE_URL}${image}`}></img>
            </li>
            <li className="flex-2 font-medium">{name.length < 32 ? name : `${name.slice(0, 29)}...`}</li>
            <li className="flex-1 font-medium">{`${runtime} phút`}</li>
            <li className="flex-1 font-medium">{moment(release).format('DD/MM/YYYY')}</li>
            <li className={clsx('flex-1 font-medium', {'text-green-500': status === 'showing'}, {'text-main': status === 'soon'}, {'text-red-500': status === 'showed'})}>{statusMovie.find(item => item.value === status).name}</li>
            <li 
                className='cursor-pointer'
                onClick={handleUpdateMovie}
            ><MdOutlineRestorePage size='22px' /></li>
            <li 
                className='ml-2 cursor-pointer'
                onClick={handleDeleteMovie}
            ><MdOutlineDelete size='22px'/></li>
        </ul>
    )
}

export default ItemMovieInfor