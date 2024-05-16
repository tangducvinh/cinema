import { useNavigate, useParams } from "react-router-dom";
import Button from "../../component/Button/Button";
import Image from "../../component/Image/Image";
import { BsQrCode } from "react-icons/bs";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { converTimeShow, convertCalender } from "../../component/utils";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ShowServices from "../../services/ShowServices";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShow } from "../../redux/slides/showSlide";
import Swal from "sweetalert2";
import Cart from "../../component/Cart/Cart";
import Room from "../../component/Room/Room";
import { updateOrder } from "../../redux/slides/orderSlide";
import Bill from "../../component/Bill/Bill";

function Booking() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [state, setState] = useState(0);
  const [check, setCheck] = useState(false);
  const [bill, setBill] = useState(false);

  let actions = [
    {
      name: "Chọn phim/ Rạp / Xuất",
      status: true,
    },
    {
      name: "Chọn ghế",
      status: true,
    },
    {
      name: "Thanh toán",
      status: check,
    },
    {
      name: "Xác nhận",
      status: bill,
    },
  ];

  const { sid } = useParams();
  const navigate = useNavigate();

  const [dataShowDetail, setDataShowDetail] = useState([]);
  const [listShow, setListShow] = useState([]);

  const mutationDetailShow = useMutationHooks(async (showId) => {
    const res = await ShowServices.getDetailShow(showId);
    setDataShowDetail(res.data);
  });

  const mutationListShow = useMutationHooks(async (data) => {
    const { movieId, day } = data;
    const res = await ShowServices.getListShow(movieId, day);
    setListShow(res.data);
  });

  useEffect(() => {
    mutationDetailShow.mutate(sid);
    if (dataShowDetail.length !== 0) {
      const value = {
        movieId: dataShowDetail.movieId._id,
        total_pay: 0,
        seats: [],
        userId: user._id,
        showId: sid,
        roomId: dataShowDetail.roomId._id,
        status: "none",
        method_pay: "none",
      };
      localStorage.setItem("booking", JSON.stringify(value));
    }
  }, [sid]);

  // const countinue = () => {
  //   setCheck(true);
  // };

  useEffect(() => {
    if (dataShowDetail.length !== 0) {
      let day = dataShowDetail.begin_time.slice(0, 10);
      mutationListShow.mutate({
        movieId: dataShowDetail.movieId._id,
        day: day,
      });
      // const value = {
      //   movieId: dataShowDetail.movieId._id,
      //   total_pay: 0,
      //   seats: [],
      //   userId: "66212212a8f0f37c788e917f",
      //   showId: dataShowDetail._id,
      //   roomId: dataShowDetail.roomId._id,
      //   status: "none",
      //   method_pay: "none",
      // };
      // localStorage.setItem("booking", JSON.stringify(value));
      dispatch(
        updateOrder({
          movieId: dataShowDetail.movieId._id,
          showId: dataShowDetail._id,
          roomId: dataShowDetail.roomId._id,
          seats: [],
        })
      );
    }
  }, [dataShowDetail]);

  console.log("datashow detail", dataShowDetail);

  return (
    <div className="bg-slate-100 h-screen">
      <div className="py-4 bg-white border-t-8 border-t-gray-100">
        <div className="flex items-center justify-center">
          {actions.map((item) => {
            return (
              <div
                className={`px-5 py-3 border-b-4 border-b-blue-900 inline-block text-[-16] font-semibold ${
                  item.status === false && "border-b-gray-300 text-gray-300"
                } `}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      {bill === false ? (
        <div>
          {dataShowDetail.length !== 0 && (
            <div className="mx-80 mt-6 flex">
              <div className="w-[-860] h-28 ">
                {check === false ? (
                  <div>
                    {/* Xuất chiếu */}
                    <div className="flex py-3 px-3 bg-white rounded-md items-center">
                      <span className="min-w-32 ml-5 font-semibold">
                        Đổi xuất chiếu
                      </span>
                      <div className="flex flex-wrap">
                        {listShow.length !== 0 &&
                          listShow.map((item) => {
                            return (
                              <button
                                className={`px-4 py-3 border border-gray-400 mr-4 mb-1 rounded-lg hover:bg-blue-900  hover:text-white ${
                                  item.begin_time ===
                                    dataShowDetail.begin_time &&
                                  "bg-blue-900 text-white"
                                }`}
                                onClick={() => {
                                  navigate(`/booking/${item._id}`);
                                  const value = {
                                    movieId: "",
                                    total_pay: 0,
                                    seats: [],
                                    userId: "",
                                    showId: "",
                                    roomId: "",
                                    status: "none",
                                    method_pay: "none",
                                  };
                                  localStorage.setItem(
                                    "booking",
                                    JSON.stringify(value)
                                  );
                                }}
                              >
                                {converTimeShow(item.begin_time)}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Ghế  */}
                    <Room show={dataShowDetail} sid={sid} />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center bg-white py-10">
                    <div className="text-4xl mb-7">Quét để thanh toán</div>
                    <BsQrCode className="w-96 h-96" />
                  </div>
                )}
              </div>

              {/* Hóa đơn */}
              <div className="flex-1">
                <Cart dataShowDetail={dataShowDetail} />
                <div className="flex  justify-end mt-4 ">
                  {bill === false && (
                    <div className="mr-3">
                      <Button
                        outline
                        onClick={() => {
                          setCheck(false);
                        }}
                      >
                        Quay lại
                      </Button>
                    </div>
                  )}

                  <div>
                    {check === false ? (
                      <Button
                        primary
                        onClick={() => {
                          let localBooking = JSON.parse(
                            localStorage.getItem("booking")
                          );
                          if (localBooking.seats.length !== 0) {
                            setCheck(true);
                          }
                        }}
                      >
                        Tiếp tục
                      </Button>
                    ) : (
                      <Button
                        primary
                        onClick={() => {
                          setBill(true);
                        }}
                      >
                        Thanh toán
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-80 mt-6 flex justify-center">
          <Bill data1={dataShowDetail} />
        </div>
      )}
    </div>
  );
}

export default Booking;
