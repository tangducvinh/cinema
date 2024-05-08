import Button from "../../component/Button/Button";
import Image from "../../component/Image/Image";
import Room from "../../component/Room/Room";
import { Table } from "antd";
function Booking() {
  const actions = [
    {
      name: "Chọn phim/ Rạp / Xuất",
    },
    {
      name: "Chọn ghế",
    },
    {
      name: "Thanh toán",
    },
    {
      name: "Xác nhận",
    },
  ];

  const columns = [1, 2, 3];

  const rows = [1, 2, 3, 4, 5];
  return (
    <div className="bg-slate-100 h-screen">
      <div className="py-4 bg-white border-t-8 border-t-gray-100">
        <div className="flex items-center justify-center">
          {actions.map((item) => {
            return (
              <div className="px-5 py-3 border-b-4 border-b-blue-900 inline-block text-[-16] font-semibold">
                {item.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-80 mt-6 flex">
        <div className="w-[-860] h-28 ">
          {/* Xuất chiếu */}
          <div className="flex py-3 px-3 bg-white rounded-md items-center">
            <span className="min-w-32 ml-5 font-semibold">Đổi xuất chiếu</span>
            <div className="flex flex-wrap">
              <button className="px-4 py-3 border border-gray-400 mr-4 mb-1 rounded-lg hover:bg-blue-900  hover:text-white">
                10:00
              </button>
            </div>
          </div>

          {/* Ghế  */}
          <div className="mt-5 px-4 py-4 bg-white">
            <div>
              <Room />
              <div className="pb-3 pt-10 text-center border-b-4 border-b-orange-600 text-gray-400">
                Màn hình
              </div>
            </div>
            <div className="my-10 flex justify-around">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-slate-500 rounded-md mr-2"></div>
                <span>Ghế đã bán</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-orange-600 rounded-md mr-2"></div>
                <span>Ghế đang chọn</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 border border-gray-500 rounded-md mr-2"></div>
                <span>Ghế </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hóa đơn */}
        <div>
          <div className="bg-white ml-3 flex-1  rounded-lg border-t-8 border-t-yellow-600 px-4 py-5">
            <div>
              <div className="flex mt-2">
                <Image
                  alt="poster"
                  src="https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg"
                  className="w-32 h-48 object-cover rounded-lg"
                />
                <div className="ml-2 flex flex-col">
                  <span className="text-[-18] font-semibold">
                    Lật mật điều ước 7{" "}
                  </span>
                  <span>2D phụ đề</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="font-semibold">Rạp 3</div>
                <div className="mt-1">
                  <span>Suất: </span>
                  <span className="font-semibold">12h30 ngày 08/5/2004</span>
                </div>
              </div>
              <div className="border-t border-t-orange-600 border-dashed my-5"></div>
              <div className="flex justify-between">
                <p className="font-semibold">Tổng cộng</p>
                <p className=" text-[text-primary] font-semibold text-[-18]">
                  0đ
                </p>
              </div>
            </div>
          </div>

          <div className="flex  justify-end mt-4 ">
            <div className="mr-3">
              <Button outline>Quay lại</Button>
            </div>
            <Button primary>Tiếp tục</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
