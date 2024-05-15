import { GiRibbonMedal } from "react-icons/gi";
import Image from "../../component/Image/Image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as OrderServices from "../../services/OrderServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { PiFlagPennantFill } from "react-icons/pi";
import { converTimeShow, convertCalender } from "../../component/utils";
import { FaUser } from "react-icons/fa";
function History() {
  const oke = window.location.href.split("/");
  const navigate = useNavigate();
  const last = oke[oke.length - 1];
  let date = new Date();
  const [action, setAction] = useState(last === "history" ? true : false);
  const [listOrder, setListOrder] = useState(null);
  useEffect(() => {
    if (last === "history") {
      setAction(true);
    } else {
      setAction(false);
    }
  }, [last]);
  let sum = 0;

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
  const [idUser, setIdUser] = useState(user._id);

  const mutationOrderOfUser = useMutationHooks(async (uid) => {
    const res = await OrderServices.getOrderOfUser(uid);
    setListOrder(res.data);
    return res;
  });
  if (listOrder !== null) {
    listOrder.map((item) => {
      const d = new Date(item.createdAt);

      if (d.getFullYear() === date.getFullYear()) sum = sum + item.total_pay;
    });
  }

  useEffect(() => {
    mutationOrderOfUser.mutate(user._id);
  }, [idUser]);
  return (
    <div className="bg-[-white-fake] h-screen">
      <div className="w-full h-20 bg-[-white-fake]"></div>
      <div className="">
        <div className="mx-80 flex justify-between ">
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
                <span className="font-semibold">
                  {"Tổng chi tiêu " + date.getFullYear()}
                </span>
                <span className="font-semibold text-[text-primary]">
                  {sum + "đ"}
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
            {action === true ? (
              <div>
                {listOrder !== null && (
                  <div>
                    <p className="text-center my-2 text-gray-400 font-semibold italic">
                      Lưu ý : Chỉ hiển thị 10 giao dịch gần nhất
                    </p>
                    <div className="h-[-500] bg-white py-3 px-3 rounded-lg overflow-hidden overflow-y-scroll scrollbar-thin ">
                      {listOrder.map((item) => {
                        return (
                          <div>
                            <div>
                              <div className="flex items-center text-[text-primary] text-[-16] font-semibold mt-3">
                                <div className="px-2 py-2 rounded-[-50%] bg-[-button-primary]"></div>
                                <span className="ml-3">
                                  {converTimeShow(item.createdAt) +
                                    " - " +
                                    convertCalender(item.createdAt)}
                                </span>
                              </div>
                              <div className="flex ">
                                <span className="font-semibold w-36 ">
                                  Mã vé:
                                </span>
                                <span className="font-semibold text-[text-primary]">
                                  {item._id}
                                </span>
                              </div>
                              <div className="flex ">
                                <span className="font-semibold w-36 ">
                                  Phim:
                                </span>
                                <span className="font-semibold text-[text-primary]">
                                  {item.movieId.original_title}
                                </span>
                              </div>
                              <div className="flex ">
                                <span className="font-semibold w-36 ">
                                  Ghế:
                                </span>
                                {item.seats.map((seat, index) => {
                                  if (index === item.seats.length - 1) {
                                    return (
                                      <span className="font-semibold text-[text-primary]">
                                        {seat.name}
                                      </span>
                                    );
                                  }
                                  return (
                                    <span className="font-semibold text-[text-primary] mr-1">
                                      {seat.name + " , "}
                                    </span>
                                  );
                                })}
                              </div>
                              <div className="flex ">
                                <span className="font-semibold w-36 ">
                                  Xuất:
                                </span>
                                <span className="font-semibold text-[text-primary]">
                                  {converTimeShow(item.showId.begin_time)}
                                </span>
                              </div>
                              <p className="font-semibold w-36 ">Rạp 3</p>
                              <div className="flex ">
                                <span className="font-semibold w-36 ">
                                  Thanh toán:
                                </span>
                                <span className="font-semibold text-[text-primary]">
                                  {item.total_pay + "đ"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full  bg-white mt-3 px-5 pt-3 pb-10 rounded-lg ">
                <div className="mt-4 ">
                  <p>Họ Và Tên</p>
                  <div className="flex items-center px-3 py-3 bg-slate-200 rounded-lg w-1/2">
                    <FaUser />
                    <span className="ml-2">Trần Văn Thịnh</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p>Email</p>
                  <div className="flex items-center px-3 py-3 bg-slate-200 rounded-lg w-1/2">
                    <FaUser />
                    <span className="ml-2">Trần Văn Thịnh@gmail.com</span>
                  </div>
                </div>
                <div className="mt-4 ">
                  <p>Số điện thoại</p>
                  <div className="flex items-center px-3 py-3 bg-slate-200 rounded-lg w-1/2">
                    <FaUser />
                    <span className="ml-2">07777777</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
