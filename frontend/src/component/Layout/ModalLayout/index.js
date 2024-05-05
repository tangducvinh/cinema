import { useDispatch } from 'react-redux'

import { setChidlren } from '../../../redux/slides/appSlice'

const ShowModal = ({children}) => {
    const dispatch = useDispatch()

    return (
        <div 
            className='bg-overlay absolute w-screen h-screen z-10'
            onClick={() => dispatch(setChidlren(null))}
        >{children}</div>
    )
}

export default ShowModal