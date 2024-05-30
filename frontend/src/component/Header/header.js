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
import { GrUserManager } from "react-icons/gr";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (currentUser?.accessToken) {
      setShowLogin(false);
      setLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [currentUser]);

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
      to: "/profile",
    },
    {
      title: "Lịch sử",
      icon: <History />,
      to: "/history",
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
    <div className="w-full ">
      {login && (
        <Login
          onClick={() => {
            setLogin(false);
          }}
        />
      )}
      <div className=" flex justify-center ">
        <div className="h-28 flex items-center justify-between w-3/4">
          <div className="flex items-center">
            <Link to={"/"} className="w-52">
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

          <div className="flex items-center ">
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
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png"
                    className=" w-9 h-9 border-4 border-gray-200 rounded-[-50%]"
                  />
                </Menu>
                <div className="flex items-center">
                  <GiRibbonMedal className="text-3xl text-[text-primary]" />
                  <div className="ml-2 hover:text-[text-primary] hover:cursor-pointer">
                    <p className="text-[-16] font-semibold ">
                      {currentUser?.name}
                    </p>
                    <span className="text-xs ">Star</span>
                  </div>
                </div>

                {(currentUser?.role === "7" || currentUser?.role === "9") && (
                  <Link
                    to={"/manager/movie"}
                    className="flex gap-2 items-center ml-8 p-2 rounded-md hover:bg-main"
                  >
                    <GrUserManager size="17px" />
                    <p>Quản lí</p>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
