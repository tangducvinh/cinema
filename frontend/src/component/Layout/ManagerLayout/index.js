import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../Header/header'
import Sidebar from '../../Sidebar'
import ShowModal from '../ModalLayout'
import { paths } from '../../../routers'

import { FormAddMovie } from '../../../component/forms'


const ManagerLayout = () => {
    const naviagte = useNavigate()
    const { children } = useSelector(state => state.app)
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        if (currentUser?.role !== '7' && currentUser?.role !== '9') {
            naviagte('/')
        }

    }, [currentUser])  

    return (
        <div className='relative'>
            {children && <ShowModal children={children} />}

            <div className='fixed bg-white w-full z-20'><Header /></div>
            <div className='h-[130px]'></div>

            <div className='w-[75%] flex mx-auto'>
                <div className='flex-1 fixed'>
                    <Sidebar />
                </div>

                <div className='flex-1'></div>

                <div className='flex-5'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default ManagerLayout