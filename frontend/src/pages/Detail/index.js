import Image from "../../component/Image/Image";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Button from "../../component/Button/Button";
import { calender, convertCalender } from "../../component/utils";
import { useState } from "react";

function Detail() {
  const [activeCalender, setActiveCalender] = useState(0);
  const date = calender();
  const handleActiveCalender = (index) => {
    setActiveCalender(index);
  };

  return (
    <div>
      <div className="w-screen h-[-500] bg-black flex justify-center ">
        <div className="relative">
          <Image
            className="w-[-860] h-[-500] object-cover"
            alt="trailer"
            src="https://cdn.galaxycine.vn/media/2024/4/26/lm7-750_1714101584545.jpg"
          />
          <div className="absolute w-[-860] h-[-500] top-0 shadow-trailer flex justify-center items-center">
            <MdOutlinePlayCircleFilled className="text-7xl text-white" />
          </div>
        </div>
      </div>

      <div className="mx-80 px-4 py-12 ">
        <div className="flex relative  w-[-882]">
          <div className="absolute -top-24 ">
            <div className="flex">
              <div className="w-[-278] h-[-398]  border-2 border-white mr-6 border-b-0">
                <Image
                  className="w-[-278] h-[-398] object-cover"
                  alt="poster"
                  src="	https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg"
                />
              </div>
              <div className="flex flex-col justify-end  flex-1">
                <h1 className="text-3xl font-semibold">
                  Lật Mặt 7: Một Điều Ước
                </h1>
                <div className="flex mt-1">
                  <div className="flex items-center mr-3 ">
                    <LuClock3 className="text-[14] mr-1 text-[text-primary]" />
                    <span className="text-[14] mr-1">138 Phút</span>
                  </div>
                  <div className="flex items-center mr-3 ">
                    <FaRegCalendarMinus className="text-[14] mr-1 text-[text-primary]" />
                    <span className="text-[14] mr-1">24/04/2024</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <FaStar className="text-2xl mr-1 text-[text-primary]" />
                  <span className="text-xl mr-1">9.4</span>
                </div>
                <div className="flex items-center text-[-14] mt-2">
                  <span className="text-gray-500 mr-3">Quốc gia: </span>
                  <span className="">9.4</span>
                </div>
                <div className="flex items-center text-[-14] mt-2">
                  <span className="text-gray-500 mr-3">Nhà sản xuất: </span>
                  <span className="">Lý Hải producer</span>
                </div>
                <div className="flex items-center  text-[-14] mt-2">
                  <span className="text-gray-500 mr-3 min-w-16">
                    Thể loại:{" "}
                  </span>
                  <div className="flex ">
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                  </div>
                </div>
                <div className="flex items-center text-[-14] mt-2">
                  <span className="text-gray-500 mr-3 min-w-16">
                    Đạo diễn:{" "}
                  </span>
                  <div className="flex">
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                  </div>
                </div>
                <div className="flex items-center text-[-14] mt-2 ">
                  <span className="text-gray-500 mr-3 min-w-16">
                    Diễn viên:{" "}
                  </span>
                  <div className="flex items-center flex-wrap">
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                    <Button hoverPrimary>mot-dieu-uo</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h1 className="inline-block leading-none px-2 border-l-4 border-l-blue-950 text-[-20] font-semibold mr-10">
                Nội dung phim
              </h1>
              <p className="mt-2 text-[-14] text-justify">
                Qua những lát cắt đan xen, ẩn chứa nhiều nụ cười và cả nước mắt,
                "Lật Mặt 7: Một Điều Ước" là câu chuyện cảm động về đại gia đình
                bà Hai 73 tuổi - người mẹ đơn thân tự mình nuôi 5 người con khôn
                lớn. Khi trưởng thành, mỗi người đều có cuộc sống và gia đình
                riêng. Bất chợt, biến cố ập đến, những góc khuất dần được hé lộ,
                những nỗi niềm, lo lắng, trĩu nặng ẩn sâu trong trái tim người
                mẹ. Trách nhiệm thuộc về ai?
              </p>
              <p className="mt-2 text-[-14] text-justify">
                Phim mới Lật Mặt 7: Một Điều Ước dự kiến ra mắt tại các rạp
                chiếu phim toàn quốc từ 26.04.2024. Xem thêm tại:
                https://www.galaxycine.vn/dat-ve/lat-mat-7-mot-dieu-uoc/
              </p>
            </div>
            <div className="mt-10">
              <h1 className="inline-block leading-none px-2 border-l-4 border-l-blue-950 text-[-20] font-semibold mr-10">
                Lịch chiếu phim
              </h1>
              <div className="flex mx-3 mt-3">
                {date.map((item, index) => {
                  return (
                    <button
                      className={`px-2 py-4  mr-4 rounded-xl ${
                        index === activeCalender && "bg-blue-900 text-white"
                      }`}
                      key={index}
                      onClick={() => {
                        handleActiveCalender(index);
                      }}
                    >
                      {/* {item} */}
                      {convertCalender(item)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
