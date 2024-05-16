import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderServices from "../../services/OrderServices";
import * as ShowServices from "../../services/ShowServices";
import Image from "../Image/Image";
import { converTimeShow, convertCalender, formatCash } from "../utils";
import Button from "../Button/Button";
function Bill({ data1 }) {
  console.log("123123 ", data1);
  const navigate = useNavigate();

  const [bill, setBill] = useState(JSON.parse(localStorage.getItem("booking")));
  const [oid, setOid] = useState("");
  const [order, setOrder] = useState(null);

  console.log("bill", bill);

  const mutationCreateOrder = useMutationHooks(async (data) => {
    const {
      movieId,
      seats = [],
      status,
      userId = "123123123",
      method_pay,
      showId,
      roomId,
    } = data;
    const total_pay = Number(data.seats.length * (data1.price || 70000));
    const res = await OrderServices.createOrder({
      movieId,
      seats,
      status,
      userId,
      method_pay,
      showId,
      roomId,
      total_pay,
    });
    setOid(res.data._id);

    return res;
  });

  const mutationUpdateBlockSeat = useMutationHooks(async (data) => {
    const { sid, seats, name, userId } = data;
    const res = await ShowServices.updateBlockSeats({
      sid,
      seats,
    });
    return res;
  });
  const mutationDetailOrder = useMutationHooks(async (oid) => {
    const res = await OrderServices.getDetailOrder(oid);
    setOrder(res.data);
    return res;
  });
  const handleBill = async () => {
    await mutationUpdateBlockSeat.mutate({
      sid: bill.showId,
      seats: bill.seats,
    });
    await mutationCreateOrder.mutate(bill);

    const value = {
      movieId: bill.movieId,
      total_pay: 0,
      seats: [],
      userId: bill.userId,
      showId: bill.showId,
      roomId: bill.roomId,
      status: "none",
      method_pay: "none",
    };
    await localStorage.setItem("booking", JSON.stringify(value));
    // await navigate("/");
  };
  useEffect(() => {
    handleBill();
  }, [bill]);
  const handleDetail = async () => {
    await mutationDetailOrder.mutate(oid);
  };
  useEffect(() => {
    if (oid !== "") {
      handleDetail();
    }
  }, [oid]);

  return (
    <div>
      <div className="">
        {order !== null && (
          <div className="w-[-500]">
            <div className="bg-white  ml-3  rounded-lg border-t-8 border-t-yellow-600 px-4 py-4">
              <p className="flex justify-center text-[-20] text-[text-primary] font-semibold">
                Sticker Of You
              </p>
              <div className="flex mt-2">
                <Image
                  alt="poster"
                  src={
                    order.movieId.poster_path.slice(0, 4) === "http"
                      ? order.movieId.poster_path
                      : `${process.env.REACT_APP_IMAGE_URL}${order.movieId.poster_path}`
                  }
                  className="w-32 h-48 object-cover rounded-lg"
                />
                <div className="ml-2 flex flex-col">
                  <span className="text-[-18] font-semibold">
                    {order.movieId.original_title}
                  </span>
                  <span>2D phụ đề </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-[-20] font-semibold text-orange-600">
                  <span className="">Mã vé: </span>
                  <span className="">{order.orderNumber}</span>
                </div>
                <div className="font-semibold">{order.roomId.name}</div>
                <div className="mt-1">
                  <span>Suất: </span>
                  <span className="font-semibold">
                    {converTimeShow(order.showId.begin_time) +
                      " - " +
                      convertCalender(order.showId.begin_time)}
                  </span>
                </div>
              </div>
              <div className="border-t border-t-orange-600 border-dashed my-5"></div>

              <div>
                <div className="flex justify-between">
                  <div>
                    <div className="flex">
                      <p className="font-semibold">{order.seats.length}</p>{" "}
                      <span> x Ghế đơn</span>
                    </div>
                    <span>
                      Ghế:{" "}
                      <span className="font-semibold">
                        {order.seats.map((item, index) => {
                          if (index === order.seats.length - 1) {
                            return item.name;
                          }

                          return item.name + " , ";
                        })}
                      </span>
                    </span>
                  </div>
                  <p className="font-semibold">
                    {formatCash(Number(order.seats.length * data1.price))}
                  </p>
                </div>
                <div className="border-t border-t-orange-600 border-dashed my-5"></div>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold">Tổng cộng</p>
                <p className=" text-[text-primary] font-semibold text-[-18]">
                  {formatCash(Number(order.seats.length * data1.price))}
                </p>
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  primary
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bill;
