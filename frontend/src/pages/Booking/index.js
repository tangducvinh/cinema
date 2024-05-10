import { useNavigate, useParams } from "react-router-dom";
import Button from "../../component/Button/Button";
import Image from "../../component/Image/Image";

import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { converTimeShow, convertCalender } from "../../component/utils";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ShowServices from "../../services/ShowServices";
import * as SeatServices from "../../services/SeatServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShow } from "../../redux/slides/showSlide";
import Swal from "sweetalert2";
import Cart from "../../component/Cart/Cart";
import Room from "../../component/Room/Room";

function Booking() {
  const [state, setState] = useState(0);

  const actions = [
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
      status: false,
    },
    {
      name: "Xác nhận",
      status: false,
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

  // const mutationListSeat = useMutationHooks(async (idRoom) => {
  //   const res = await SeatServices.getListSeat(idRoom);
  //   setListSeat(res.data);
  // });

  const mutationListShow = useMutationHooks(async (data) => {
    const { movieId, day } = data;
    const res = await ShowServices.getListShow(movieId, day);
    setListShow(res.data);
  });

  useEffect(() => {
    mutationDetailShow.mutate(sid);
  }, [sid]);

  useEffect(() => {
    if (dataShowDetail.length !== 0) {
      let day = dataShowDetail.begin_time.slice(0, 10);
      mutationListShow.mutate({
        movieId: dataShowDetail.movieId._id,
        day: day,
      });
      // mutationListSeat.mutate(dataShowDetail.roomId._id);
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

      {dataShowDetail.length !== 0 && (
        <div className="mx-80 mt-6 flex">
          <div className="w-[-860] h-28 ">
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
                          item.begin_time === dataShowDetail.begin_time &&
                          "bg-blue-900 text-white"
                        }`}
                        onClick={() => {
                          navigate(`/booking/${item._id}`);
                        }}
                      >
                        {converTimeShow(item.begin_time)}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Ghế  */}
            {<Room roomId={dataShowDetail.roomId} />}
          </div>

          {/* Hóa đơn */}
          <div className="flex-1">
            <Cart dataShowDetail={dataShowDetail} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
