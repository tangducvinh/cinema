import { useState, useEffect, Fragment } from 'react'
import { MdClear } from 'react-icons/md'
import { useDebounce } from 'use-debounce'
import { useSelector } from 'react-redux'

import { ItemUserInfor } from '../../component/itemInfor'
import * as apis from '../../apis'

const ManagerAccount = () => {
    const { renderManagerUser } = useSelector(state => state.app)
    const [value, setValue ] = useState('')
    const [ dataUsers, setDataUsers ] = useState([])
    const [ textSearch ] = useDebounce(value, 800)

    const fecthDataUsers = async(data) => {
        const response = await apis.getAllUsers(data)

        if (response.success) {
            setDataUsers(response.data)
        }
    }

    useEffect(() => {
        const dataPass = {}
        if (textSearch) {
            dataPass.title = textSearch
        }
        fecthDataUsers(dataPass)
    }, [textSearch, renderManagerUser])

    console.log(dataUsers)

    return (
        <div className='w-full'>
            <h2 className="font-medium text-2xl">Danh sách tài khoản</h2>

            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center">
                    <form className="relative w-[300px]">
                        <input 
                            className="border-[2px] w-full shadow-sm px-2 py-1 rounded-md outline-none" 
                            placeholder='Tìm kiếm theo email hoặc số điện thoại'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >
                        </input>
                        {value !== '' && 
                            <span 
                                className="absolute translate-y-[50%] cursor-pointer right-[10px]"
                                onClick={() => setValue('')}
                            >
                                <MdClear size="18px"/>
                            </span>}
                    </form>

                    {/* <select className="ml-3">
                        <option>Tất cả</option>
                        <option>Đang chiếu</option>
                        <option>Sắp chiếu</option>
                    </select> */}
                </div>
            </div>

            <ul className="flex items-center bg-[#eb9651] px-4 py-2 w-full mt-3 rounded-sm">
                <li className="w-[48px]"></li>
                <li className="flex-1 font-semibold">Tên</li>
                <li className="flex-1 font-semibold">Email</li>
                <li className="flex-1 font-semibold">Số điện thoại</li>
                <li className="flex-1 font-semibold">Vai trò</li>
                <li className="w-[52px]"></li>
            </ul>

            {dataUsers.map((item, index) => (
                <Fragment>
                    <ItemUserInfor 
                        name={item.name}
                        email={item.email}
                        phone={item.phone}
                        role={item.role}
                        image={item.avatar}
                        _id={item._id}
                    />
                </Fragment>
            ))}

        </div>
    )
}

export default ManagerAccount