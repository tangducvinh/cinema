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

            <Header />

            <div className='w-[1400px] flex mx-auto border-t border-main pt-5'>
                <Sidebar />

                <Outlet />
            </div>

        </div>
    )
}

export default ManagerLayout