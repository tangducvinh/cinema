import Image from "../../component/Image/Image";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Button from "../../component/Button/Button";
import { calender, convertCalender } from "../../component/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as MovieServices from "../../services/MovieServices";
import Trailer from "../../component/trailer/trailer";

function Detail() {
  const [activeCalender, setActiveCalender] = useState(0);
  const [trailer, setTrailer] = useState(false);
  const date = calender();
  const handleActiveCalender = (index) => {
    setActiveCalender(index);
  };
  const [detailMovie, setDetailMovie] = useState(null);

  const { mid } = useParams();
  const fetchDetailMovie = async (mid) => {
    const res = await MovieServices.getDetailMovie(mid);
    setDetailMovie(res.data);
  };

  useEffect(() => {
    fetchDetailMovie(mid);
  }, [mid]);

  console.log("detail ", detailMovie);
  const handleTrailer = () => {
    setTrailer(!trailer);
  };

  return (
    <div>
      {detailMovie !== null && (
        <div>
          {trailer && (
            <Trailer
              keyFrame={detailMovie.video[0].key}
              onClick={handleTrailer}
            />
          )}

          <div>
            <div className="w-screen h-[-500] bg-black flex justify-center ">
              <div className="relative">
                <Image
                  className="w-[-860] h-[-500] object-cover"
                  alt="trailer"
                  src={`${process.env.REACT_APP_IMAGE_URL}${detailMovie.backdrop_path}`}
                />
                <div
                  className="absolute w-[-860] h-[-500] top-0 shadow-trailer flex justify-center items-center"
                  onClick={handleTrailer}
                >
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
                        src={`${process.env.REACT_APP_IMAGE_URL}${detailMovie.poster_path}`}
                      />
                    </div>
                    <div className="flex flex-col justify-end  flex-1">
                      <h1 className="text-3xl font-semibold">
                        {detailMovie.original_title}
                      </h1>
                      <div className="flex mt-1">
                        <div className="flex items-center mr-3 ">
                          <LuClock3 className="text-[14] mr-1 text-[text-primary]" />
                          <span className="text-[14] mr-1">
                            {`${detailMovie.runtime} phút`}
                          </span>
                        </div>
                        <div className="flex items-center mr-3 ">
                          <FaRegCalendarMinus className="text-[14] mr-1 text-[text-primary]" />
                          <span className="text-[14] mr-1">
                            {convertCalender(detailMovie.release_date)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <FaStar className="text-2xl mr-1 text-[text-primary]" />
                        <span className="text-xl mr-1">
                          {detailMovie.popular}
                        </span>
                      </div>
                      <div className="flex items-center text-[-14] mt-2">
                        <span className="text-gray-500 mr-3">Quốc gia: </span>
                        <span className="">
                          {detailMovie.original_language}
                        </span>
                      </div>
                      <div className="flex items-center text-[-14] mt-2">
                        <span className="text-gray-500 mr-3">
                          Nhà sản xuất:{" "}
                        </span>
                        <span className="">
                          {detailMovie.product_company.length !== 0
                            ? detailMovie.product_company[0].name
                            : detailMovie.director}
                        </span>
                      </div>
                      <div className="flex items-center  text-[-14] mt-2">
                        <span className="text-gray-500 mr-3 min-w-16">
                          Thể loại:{" "}
                        </span>
                        <div className="flex ">
                          {detailMovie.genres.map((item) => {
                            return <Button hoverPrimary>{item}</Button>;
                          })}
                        </div>
                      </div>
                      <div className="flex items-center text-[-14] mt-2">
                        <span className="text-gray-500 mr-3 min-w-16">
                          Đạo diễn:{" "}
                        </span>
                        <div className="flex">
                          {detailMovie.director.map((item) => {
                            return <Button hoverPrimary>{item}</Button>;
                          })}
                        </div>
                      </div>
                      <div className="flex items-center text-[-14] mt-2 ">
                        <span className="text-gray-500 mr-3 min-w-16">
                          Diễn viên:{" "}
                        </span>
                        <div className="flex items-center flex-wrap">
                          {detailMovie.cast.map((item) => {
                            return <Button hoverPrimary>{item.name}</Button>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-20">
                    <h1 className="inline-block leading-none px-2 border-l-4 border-l-blue-950 text-[-20] font-semibold mr-10">
                      Nội dung phim
                    </h1>
                    <p className="mt-2 text-[-14] text-justify">
                      {detailMovie.overview}
                    </p>
                    <p className="mt-2 text-[-14] text-justify">
                      {`Phim mới ${
                        detailMovie.original_title
                      } dự kiến phát hành tại rạp vào ngày ${convertCalender(
                        detailMovie.release_date
                      )}`}
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
                              index === activeCalender &&
                              "bg-blue-900 text-white"
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
        </div>
      )}
    </div>
  );
}

export default Detail;
