import { NavLink } from 'react-router-dom'


const Sidebar = () => {
    const menu = [
        {
            title: 'Phim',
            path: '/manager/movie'
        },
        {
            title: 'Xuất chiếu',
            path: '/manager/show'
        },
        {
            title: 'Tài khoản',
            path: '/manager/account'
        }
    ]


    return (
        <div className="w-[250px] flex flex-col">
            {menu.map((item, index) => 
                <NavLink to={item.path} className={({isActive}) => isActive ? 'text-xl font-medium border-l-4 px-2 border-main text-[text-primary] my-2' : 'px-3 text-xl my-2 hover:text-main font-medium'}>{item.title}</NavLink>
            )}
        </div>
    )
}

export default Sidebar