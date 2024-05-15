import { GiRibbonMedal } from "react-icons/gi";
import Image from "../../component/Image/Image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const oke = window.location.href.split("/");
  const navigate = useNavigate();
  const last = oke[oke.length - 1];

  const [action, setAction] = useState(last === "history" ? true : false);
  useEffect(() => {
    if (last === "history") {
      setAction(true);
    } else {
      setAction(false);
    }
  }, [last]);

  const actions = [
    {
      title: "Lịch sử giao dịch",
      status: true,
    },
    {
      title: "Thông tin cá nhân",
      status: false,
    },
  ];
  const support = [
    {
      title: "HOTLINE hỗ trợ :",
      name: "199002224  (09:00 - 22:00)",
    },
    {
      title: "Email hỗ trợ :",
      name: "hotro@gmail.com",
    },
  ];
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="bg-[-white-fake] ">
      <div className="w-full h-20 bg-[-white-fake]"></div>
      <div className="">
        <div className="mx-80 h-screen flex justify-between ">
          <div className="w-96 h-[-500] bg-white shadow-2xl rounded-md py-4 px-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-center items-center ">
                <Image
                  alt="avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png"
                  className=" w-14 h-14 border-4 border-gray-200 rounded-[-50%]"
                />
                <div className="flex items-center">
                  <GiRibbonMedal className="text-3xl text-[text-primary]" />
                  <div className="ml-2 hover:text-[text-primary] hover:cursor-pointer">
                    <p className="text-[-20] font-semibold ">{user?.name}</p>
                    <span className="text-[-14] ">Star</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-300 my-8"></div>
              <div className="flex justify-between items-center text-[-20]">
                <span className="font-semibold">Tổng chi tiêu 2024</span>
                <span className="font-semibold text-[text-primary]">
                  100000000đ
                </span>
              </div>
            </div>
            <div>
              {support.map((item) => {
                return (
                  <div className="px-2 py-3 border-t border-gray-300 font-medium cursor-pointer">
                    <span className="text-[text-color]">{item.title} </span>
                    <span className="text-blue-700">{item.name} </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ml-14 flex-1">
            <div className="flex justify-center border-b border-gray-300">
              <div
                className={`py-3 px-3  font-semibold text-[-20] cursor-pointer ${
                  action
                    ? "border-b-2 border-blue-700 text-blue-700"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  setAction(true);
                  navigate("/history");
                }}
              >
                Lịch sử giao dịch
              </div>
              <div
                className={`py-3 px-3  font-semibold text-[-20] cursor-pointer ${
                  action === false
                    ? "border-b-2 border-blue-700 text-blue-700"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  setAction(false);
                  navigate("/profile");
                }}
              >
                Thông tin cá nhân
              </div>
            </div>
            <p className="text-center my-2 text-gray-400 font-semibold italic">
              Lưu ý : Chỉ hiển thị 10 giao dịch gần nhất
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
