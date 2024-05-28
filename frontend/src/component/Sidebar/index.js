import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user)

  const [ dataMenu, setDataMenu ] = useState()
  const menu = [
    {
      title: "Thống kê",
      path: "/manager/dashboard",
    },
    {
      title: "Phim",
      path: "/manager/movie",
    },
    {
      title: "Xuất chiếu",
      path: "/manager/show",
    },
    {
      title: "Tài khoản",
      path: "/manager/account",
    },
    {
      title: "Phòng chiếu",
      path: "/manager/room",
    },
    {
      title: "Hoá đơn",
      path: "/manager/bill"
    }
  ];

  const menuEmployes = [
    {
      title: "Phim",
      path: "/manager/movie",
    },
    {
      title: "Xuất chiếu",
      path: "/manager/show",
    },
    {
      title: "Phòng chiếu",
      path: "/manager/room",
    },
    {
      title: "Hoá đơn",
      path: "/manager/bill"
    }
  ]

  useEffect(() => {
    if (currentUser?.role === '9') {
      setDataMenu(menu)
    } else if (currentUser?.role === '7') {
      setDataMenu(menuEmployes)
    }
  }, [currentUser])

  return (
    <div className="flex flex-col">
      {dataMenu?.map((item, index) => (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "text-lg font-medium border-l-4 px-2 border-main text-[text-primary] my-2"
              : "px-3 text-lg my-2 hover:text-main font-medium"
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
