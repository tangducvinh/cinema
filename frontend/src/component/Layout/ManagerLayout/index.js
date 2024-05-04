import { Outlet } from 'react-router-dom'

import Header from '../../Header/header'
import Sidebar from '../../Sidebar'


const ManagerLayout = () => {
    return (
        <div>
            <Header />

            <div className='w-[1400px] flex mx-auto border-t border-main pt-5'>
                <Sidebar />

                <Outlet />
            </div>

        </div>
    )
}

export default ManagerLayout