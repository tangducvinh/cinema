import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Button from "../../component/Button/Button";
import Image from "../../component/Image/Image";
import { BsQrCode } from "react-icons/bs";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { converTimeShow, convertCalender } from "../../component/utils";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ShowServices from "../../services/ShowServices";
import * as PaymentServices from "../../services/PaymentServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShow } from "../../redux/slides/showSlide";
import Swal from "sweetalert2";
import Cart from "../../component/Cart/Cart";
import Room from "../../component/Room/Room";
import { updateOrder } from "../../redux/slides/orderSlide";
import Bill from "../../component/Bill/Bill";
import Pay from "../../component/Payment/Pay";

function Booking() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [state, setState] = useState(0);
  const [check, setCheck] = useState(false);
  const [bill, setBill] = useState(false);
  const [payMethod, setPayMethod] = useState("VNpay");
  const [checkBought, setCheckBought] = useState(true);
  const [amount, setAmount] = useState("");
  const [urlPayment, setUrlPayment] = useState("");
  const [statusPay, setStatusPay] = useState(false);
  // thời gian đem ngược của thanh toán
  // const [counter, setCounter] = useState(589);

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

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status")) {
      setCheck(true);
      setBill(true);
      if (searchParams.get("status") === "failed") {
        setStatusPay(false);
      } else if (searchParams.get("status") === "success") {
        setStatusPay(true);
      }
    }
  }, [searchParams]);

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

  useEffect(() => {
    if (dataShowDetail.length !== 0) {
      let day = dataShowDetail.begin_time.slice(0, 10);
      mutationListShow.mutate({
        movieId: dataShowDetail.movieId._id,
        day: day,
      });

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

  // thời gian đem ngược của thanh toán
  // useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);
  // console.log("method pay", payMethod);

  const mutationPaymentVnpay = useMutationHooks(async (data) => {
    const { amount, email, sid } = data;
    const res = await PaymentServices.getCreateURLPayment({
      amount: amount,
      email: email,
      sid: sid,
    });
    setUrlPayment(res?.data?.paymentUrl);

    return res?.data;
  });

  const handleGetURLPayment = () => {
    mutationPaymentVnpay.mutate({
      amount: amount,
      email: user?.email,
      sid: sid,
    });
  };

  useEffect(() => {
    if (urlPayment) {
      window.location.href = urlPayment;
    }
  }, [urlPayment]);

  return (
    <div className="bg-slate-100 h-screen ">
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
        <div className="">
          {dataShowDetail.length !== 0 && (
            <div className="w-3/4 mt-6 flex mx-auto gap-6">
              <div className="w-2/3 h-28 flex-1">
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
                                className={`px-4 py-2 border border-gray-400 mr-4 mb-1 rounded-sm hover:bg-blue-900  hover:text-white ${
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
                  <Pay methodPay={payMethod} setMeThodPay={setPayMethod} />
                )}
              </div>

              {/* Hóa đơn */}
              <div className="flex-none w-1/3">
                {/* <div>  // thời gian đem ngược của thanh toán
                  Countdown: {Math.floor(counter / 60)} : {counter % 60}
                </div> */}
                <Cart
                  dataShowDetail={dataShowDetail}
                  setCheckBought={setCheckBought}
                  setAmount={setAmount}
                />
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
                        disabled={checkBought}
                      >
                        Tiếp tục
                      </Button>
                    ) : (
                      <Button
                        primary
                        onClick={() => {
                          // setBill(true);
                          if (payMethod === "VNpay") {
                            handleGetURLPayment();
                          }
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
          <Bill data1={dataShowDetail} statusPay={statusPay} />
        </div>
      )}
    </div>
  );
}

export default Booking;
