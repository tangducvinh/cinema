import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../../Header/header'
import Sidebar from '../../Sidebar'
import ShowModal from '../ModalLayout'

import { FormAddMovie } from '../../../component/forms'


const ManagerLayout = () => {
    const { children } = useSelector(state => state.app)
    return (
        <div className='relative'>
            {children && <ShowModal children={children} />}

            <div className='fixed bg-white w-full z-20'><Header /></div>
            <div className='h-[130px]'></div>

            <div className='w-[75%] flex mx-auto border-t'>
                <div className='w-[260px] fixed'>
                    <Sidebar />
                </div>

                <div className='w-[260px]'></div>

                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default ManagerLayout