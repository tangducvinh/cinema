import { useDispatch } from 'react-redux'

import { setChidlren } from '../../../redux/slides/appSlice'

const ShowModal = ({children}) => {
    const dispatch = useDispatch()

    return (
        <div 
            className='bg-overlay fixed flex items-center w-screen h-screen z-30'
            onMouseDown={() => dispatch(setChidlren(null))}
        >{children}</div>
    )
}

export default ShowModal