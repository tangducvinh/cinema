import { useEffect, useState } from "react";
import Content from "../../component/Content/Content";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "../../component/Layout/SliderLayout/Slider/Slider";

import { BoxSearch } from "../../component/search";
import Loading from "../../component/common/Loading";
function Home() {
  const [showDangChieu, setShowDangChieu] = useState(true);
  const [isPending, setIsPending] = useState(true);

  const fecthShowing = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URl}/movie/list/showing`
    );
    setIsPending(false);
    return res.data;
  };
  const fecthSoon = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URl}/movie/list/soon`
    );
    setIsPending(false);
    return res.data;
  };

  const { data: listShowing, isLoading } = useQuery({
    queryKey: ["ListShowingMovies"],
    queryFn: fecthShowing,
  });
  const { data: listSoon } = useQuery({
    queryKey: ["ListSoons"],
    queryFn: fecthSoon,
  });

  const handleShowingTrue = () => {
    setShowDangChieu(true);
  };
  const handleShowingFalse = () => {
    setShowDangChieu(false);
  };

  const sliders = [
    {
      url: "https://cdn.galaxycine.vn/media/2024/4/26/roundup-2048_1714102300441.jpg",
    },
    {
      url: "https://cdn.galaxycine.vn/media/2024/2/8/2048x682_1707364876796.jpg",
    },
    {
      url: "https://cdn.galaxycine.vn/media/2024/4/10/cai-gia-cua-hanh-phuc-2_1712733220607.jpg",
    },
  ];
  return (
    <div className="w-screen relative">
      {isLoading && <Loading />}
      <div className="relative">
        <Slider slider={sliders} />

        <div className="absolute bottom-[-40px] rounded-sm overflow-hidden shadow-lg left-[50%] translate-x-[-50%] bg-white flex justify-center">
          <BoxSearch />
        </div>
      </div>

      <div className="w-3/5 mx-auto mt-20">
        <div className="flex items-center mb-10">
          <h1 className="uppercase inline-block leading-none px-2 border-l-4 border-l-blue-950 text-[-20] font-semibold mr-10">
            Phim
          </h1>
          <div
            className={`px-5 py-1 text-[-18] cursor-pointer font-medium hover:border-b-blue-950 ${
              showDangChieu
                ? `textblue-950 border-b-2 border-b-blue-950`
                : `text-gray-400 border-b-2 border-b-gray-300`
            }`}
            onClick={handleShowingTrue}
          >
            Đang chiếu
          </div>

          <div
            className={`px-5 py-1 text-[-18] cursor-pointer font-medium hover:border-b-blue-950 ${
              showDangChieu
                ? `text-gray-400 border-b-2 border-b-gray-300`
                : `textblue-950 border-b-2 border-b-blue-950`
            }`}
            onClick={handleShowingFalse}
          >
            Sắp chiếu
          </div>
        </div>
        {showDangChieu ? (
          <div className="w-full">
            {listShowing !== undefined && <Content data={listShowing.data} />}
          </div>
        ) : (
          <div className="w-full">
            {listSoon !== undefined && <Content data={listSoon.data} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
