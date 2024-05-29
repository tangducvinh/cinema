import moment from 'moment'


const ItemMovieOrderInfor = ({index, name, poster, release, status, total}) => {
    return (
        <ul className="flex items-center px-4 py-1 w-full mt-1 rounded-sm text-sm">
            <li className={`w-[50px] font-semibold text-lg ${index === 0 ? 'text-main' : index === 1 ? 'text-blue-500' : index === 2 ? 'text-green-500' : ''}`}>{`#${index + 1}`}</li>
            <li>
                <img className="w-[35px] h-[35px] rounded-sm mr-2 object-cover" src={poster.slice(0, 4) === 'http' ? poster :`${process.env.REACT_APP_IMAGE_URL}${poster}`}></img>
            </li>
            <li className="flex-2 font-semibold line-clamp-1">{name}</li>
            <li className="flex-1 font-semibold">{moment(release).format('DD/MM/YYYY')}</li>
            <li className={`flex-1 font-semibold ${status === 'showing' ? 'text-green-500' : 'text-red-500'}`}>{status === 'showing' ? 'Đang chiếu' : 'Đã chiếu'}</li>
            <li className={`flex-1 font-semibold ${index === 0 ? 'text-main' : index === 1 ? 'text-blue-500' : index === 2 ? 'text-green-500' : ''}`}>{total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</li>
        </ul>
    )
}

export default ItemMovieOrderInfor