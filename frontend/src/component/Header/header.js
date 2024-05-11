import images from "../assest/images";
import HeaderBar from "./HeaderBar/HeaderBar";
import { IoSearch } from "react-icons/io5";
import Button from "../Button/Button";
import Login from "../Login/Login";
import { useState, useEffect } from "react";
import Image from "../Image/Image";
import { GiRibbonMedal } from "react-icons/gi";
import Tippy from "@tippyjs/react/headless";
import { History, LogOut, Profile } from "../Icons";
import { Wrapper as PopperWrapper } from "../Popper";
import Menu from "../Popper/Menu/Menu";
import { GrUserManager } from "react-icons/gr"
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

function Header() {
  const { currentUser } = useSelector(state => state.user)
  const [ showLogin, setShowLogin ] = useState(true)

  useEffect(() => {
    if (currentUser?.accessToken) {
      setShowLogin(false)
      setLogin(false)
    } else {
      setShowLogin(true)
    }
  }, [currentUser])

  console.log(currentUser)

  const menu = [
    {
      title: "Phim",
      to: "/",
    },
    {
      title: "Góc điện ảnh",
      to: "/",
    },
    {
      title: "Sự kiện",
      to: "/",
    },
    {
      title: "Rạp/Giá vé",
      to: "/",
    },
  ];

  const userMenu = [
    {
      title: "Thông tin cá nhân",
      icon: <Profile />,
      to: "/",
    },
    {
      title: "Lịch sử",
      icon: <History />,
      to: "/",
    },
    {
      title: "Đăng xuất",
      icon: <LogOut />,
      to: "/",
    },
  ];
  const [login, setLogin] = useState(false);
  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <div className="">
      {login && (
        <Login
          onClick={() => {
            setLogin(false);
          }}
        />
      )}
      <div className="mx-80 h-28 flex items-center justify-between">
        <div className="flex items-center">
          <Link to={'/'} className="w-52">
            <img
              className="w-16 h-16 object-cover"
              alt="logo-cinema"
              src={images.logo.default}
            />
          </Link>

          <div className="flex items-center">
            <img
              alt="ticket"
              src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
              className="w-28 h-9 mr-3"
            />
            <HeaderBar data={menu} />
          </div>
        </div>

        <div className="flex items-center">
          <IoSearch />

          {showLogin ? (
            <button
              className="text-[-16] text-gray-500 ml-7"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          ) : (
            <div className="flex items-center ml-2">
              <Menu items={userMenu}>
                <Image
                  alt="avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons123/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                  className=" w-9 h-9 border-4 border-gray-200 rounded-[-50%]"
                />
              </Menu>
              <div className="flex items-center">
                <GiRibbonMedal className="text-3xl text-[text-primary]" />
                <div className="ml-2 hover:text-[text-primary] hover:cursor-pointer">
                  <p className="text-[-16] font-semibold ">{currentUser?.name}</p>
                  <span className="text-xs ">Star</span>
                </div>
              </div>

              {(currentUser?.role === '7' || currentUser?.role === '9') &&
                <Link to={'/manager/movie'} className="flex flex-col items-center ml-8 border p-2 rounded-md hover:bg-main">
                  <GrUserManager size='20px' />
                  <p className="font-medium">Quản lí</p>
                </Link>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
