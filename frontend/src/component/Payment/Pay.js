import { useState } from "react";
import Image from "../Image/Image";
import images from "../assest/images";

function Pay({ methodPay, setMeThodPay }) {
  const [selected, setSelected] = useState(methodPay);

  const handleSelected = (value) => {
    setSelected(value);
    setMeThodPay(value);
  };

  return (
    <div className="bg-white p-10">
      <h1 className="font-semibold mb-3">Phương thức thanh toán</h1>
      <div className="flex flex-col gap-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            handleSelected("VNpay");
          }}
        >
          <input
            type="radio"
            name="site_name"
            value="VNPay"
            checked={selected === "VNpay"}
          ></input>
          <div className="flex items-center gap-2">
            <Image src={images.logoVnpay} className="w-20 object-cover" />
            <span>VNpay</span>
          </div>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            handleSelected("Zalopay");
          }}
        >
          <input
            type="radio"
            name="site_name"
            value="Zalopay"
            checked={selected === "Zalopay"}
          ></input>
          <div className="flex items-center gap-2">
            <Image
              src={images.logoZalopay.default}
              className="w-20 object-cover"
            />
            <span className="">Zalopay</span>
          </div>
        </div>
        <span>
          (*) Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận hiểu
          rõ các Quy Định Giao Dịch Trực Tuyến của Galaxy Cinema.
        </span>
      </div>
    </div>
  );
}

export default Pay;
