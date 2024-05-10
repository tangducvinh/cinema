import Image from "../../component/Image/Image";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Button from "../../component/Button/Button";
import {
  calender,
  convertCalender,
  converTimeShow,
} from "../../component/utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as MovieServices from "../../services/MovieServices";
import * as ShowServices from "../../services/ShowServices";
import Trailer from "../../component/trailer/trailer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Content from "../../component/Content/Content";
import ItemMovie from "../../component/Content/ItemMovie/ItemMovie";
import { useDispatch } from "react-redux";
import { updateShow } from "../../redux/slides/showSlide";

function Detail() {
  const [activeCalender, setActiveCalender] = useState(0);
  const [trailer, setTrailer] = useState(false);
  const date = calender("2024-04-13");
  const handleActiveCalender = (index) => {
    setActiveCalender(index);
  };
  const [detailMovie, setDetailMovie] = useState(null);
  const [listShow, setListShow] = useState([]);

  const dispatch = useDispatch();
  const { mid } = useParams();

  const fetchDetailMovie = async (mid) => {
    const res = await MovieServices.getDetailMovie(mid);
    setDetailMovie(res.data);
  };
  const fetchListShow = async (movieId, day) => {
    const res = await ShowServices.getListShow(movieId, day);
    setListShow(res.data);
  };
  useEffect(() => {
    fetchDetailMovie(mid);
  }, [mid]);
  useEffect(() => {
    if (detailMovie !== null) {
      fetchListShow(detailMovie._id, date[`${activeCalender}`].slice(0, 10));
    }
  }, [detailMovie, activeCalender]);

  const handleTrailer = () => {
    setTrailer(!trailer);
  };
  const fecthShowing = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URl}/movie/list/showing`
    );
    return res.data;
  };
  const { data: listShowing } = useQuery({
    queryKey: ["ListShowingMovies"],
    queryFn: fecthShowing,
  });

  const navigate = useNavigate();

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
                  src={
                    detailMovie.backdrop_path?.slice(0, 4) === "http"
                      ? detailMovie.backdrop_path
                      : `${process.env.REACT_APP_IMAGE_URL}${detailMovie.backdrop_path}`
                  }
                />
                <div
                  className="absolute w-[-860] h-[-500] top-0 shadow-trailer flex justify-center items-center"
                  onClick={handleTrailer}
                >
                  <MdOutlinePlayCircleFilled className="text-7xl text-white" />
                </div>
              </div>
            </div>

            <div className="mx-80 flex  px-4 py-12">
              <div className="flex  relative  w-[-882]">
                <div className="absolute -top-24 ">
                  <div className="flex">
                    <div className="w-[-278] h-[-398]  border-2 border-white mr-6 border-b-0">
                      <Image
                        className="w-[-278] h-[-398] object-cover"
                        alt="poster"
                        src={
                          detailMovie.poster_path.slice(0, 4) === "http"
                            ? detailMovie.poster_path
                            : `${process.env.REACT_APP_IMAGE_URL}${detailMovie.poster_path}`
                        }
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
                  <div className="mt-10  mb-28">
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
                    {listShow.length !== 0 && (
                      <div className="flex items-center mx-6 mt-3">
                        <h1 className="mr-10">2D phụ đề</h1>
                        <div className="flex ">
                          {listShow.map((item) => {
                            return (
                              <button
                                className="px-4 py-3 border border-gray-400 mr-2 rounded-lg hover:bg-blue-900  hover:text-white"
                                onClick={() => {
                                  navigate(`/booking/${item._id}`);
                                  console.log("itemmm", item);
                                  dispatch(
                                    updateShow({
                                      ...item,
                                    })
                                  );
                                  localStorage.setItem(
                                    "timeShow",
                                    item.begin_time
                                  );
                                }}
                              >
                                {converTimeShow(item.begin_time)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className="uppercase inline-block leading-none px-2 border-l-4 border-l-blue-950 text-[-20] font-semibold mr-10">
                  Phim đang chiếu
                </h1>
                <div className="mt-3 ml-3">
                  {listShowing !== undefined && (
                    <div>
                      {listShowing.data.map((item, index) => {
                        if (index <= 1) {
                          return <ItemMovie data={item} />;
                        }
                      })}
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button
                    outline
                    small
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Xem thêm
                  </Button>
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
