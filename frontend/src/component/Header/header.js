import images from "../assest/images";
import HeaderBar from "./HeaderBar/HeaderBar";
import { IoSearch } from "react-icons/io5";
import Button from "../Button/Button";
import Login from "../Login/Login";
import { useState } from "react";

function Header() {
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
          <div className="w-52">
            <img
              className="w-16 h-16 object-cover"
              alt="logo-cinema"
              src={images.logo.default}
            />
          </div>

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
          <button
            className="text-[-16] text-gray-500 ml-7"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
