import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderServices from "../../services/OrderServices";
import * as ShowServices from "../../services/ShowServices";
import Image from "../Image/Image";
import { converTimeShow, convertCalender, formatCash } from "../utils";
import Button from "../Button/Button";
import images from "../assest/images";
function Bill({ data1, statusPay }) {
  console.log("data1", data1);
  const navigate = useNavigate();
  const [bill, setBill] = useState(JSON.parse(localStorage.getItem("booking")));
  // const [oid, setOid] = useState("");
  // const [order, setOrder] = useState(null);

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
    // setOid(res.data._id);

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
  // const mutationDetailOrder = useMutationHooks(async (oid) => {
  //   const res = await OrderServices.getDetailOrder(oid);
  //   setOrder(res.data);
  //   return res;
  // });
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
    if (statusPay) {
      handleBill();
    }
  }, [bill, statusPay, data1]);

  // const handleDetail = async () => {
  //   await mutationDetailOrder.mutate(oid);
  // };
  // useEffect(() => {
  //   if (statusPay) {
  //     if (oid !== "") {
  //       handleDetail();
  //     }
  //   }
  // }, [oid, statusPay]);

  return (
    <div>
      <div className="w-screen flex justify-center">
        <div className="w-1/2 ">
          <div className="bg-white px-7 py-10 flex flex-col items-center justify-center gap-6">
            <img
              src={images.logo.default}
              alt="123"
              className="w-16 h-16 object-cover"
            />
            {statusPay ? (
              <div>
                <h2 className="text-2xl text-center font-bold">
                  Giao dịch thanh toán thành công
                </h2>

                <p className="text-[-14] mt-4">
                  Giao dịch thanh toán của bạn đã được xử lý thành công. Vui
                  lòng vào lịch sử hoá đơn để lấy thông tin vé!
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl text-center font-bold">
                  Xuất vé thất bại
                </h2>

                <p className="text-[-14] mt-4">
                  Trường hợp giao dịch chưa thành công, quý khách vui lòng không
                  thực hiện giao dịch online lần nữa và tới rạp Galaxy Cinema
                  gần nhất để mua vé.
                </p>

                <p className="text-[-14] mt-4">
                  Việc phản hồi tới quý khách có thể bị chậm trễ, mong quý khách
                  thông cảm và kiên nhẫn cùng nhân viên CSKH của Galaxy Cinema
                </p>

                <p className="text-[-14]] mt-4">
                  Chúng tôi cam kết sẽ hoàn lại 100% giá trị giao dịch lỗi đã bị
                  trừ tiền sau khi đội ngũ CSKH kiểm tra và xác nhận. Vui lòng
                  gởi thông tin giao dịch lỗi về email supports@galaxystudio.vn
                  hoặc tin nhắn trang fanpage
                  https://www.facebook.com/galaxycinevn
                </p>
              </div>
            )}
            <div className="">
              <Button
                primary
                onClick={() => {
                  navigate("/");
                }}
              >
                Quay về trang chủ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
