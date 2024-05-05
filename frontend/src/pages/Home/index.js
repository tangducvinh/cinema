import { useEffect, useState } from "react";
import Content from "../../component/Content/Content";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "../../component/Layout/SliderLayout/Slider/Slider";
function Home() {
  const [showDangChieu, setShowDangChieu] = useState(true);

  const listMovie = [
    {
      title: "Phim 1",
    },
    {
      title: "Phim 1",
    },
    {
      title: "Phim 1",
    },
    {
      title: "Phim 1",
    },
    {
      title: "Phim 1",
    },
  ];
  const fecth = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URl}/movie/list/showing`
    );
    return res.data;
  };

  const { data: listShowing } = useQuery({
    queryKey: ["ListShowingMovies"],
    queryFn: fecth,
  });
  console.log("list ", listShowing);
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
    <div>
      <Slider slider={sliders} />
      <div className="mx-80 px-4 py-12">
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
            onClick={() => {
              setShowDangChieu(true);
            }}
          >
            Đang chiếu
          </div>

          <div
            className={`px-5 py-1 text-[-18] cursor-pointer font-medium hover:border-b-blue-950 ${
              showDangChieu
                ? `text-gray-400 border-b-2 border-b-gray-300`
                : `textblue-950 border-b-2 border-b-blue-950`
            }`}
            onClick={() => {
              setShowDangChieu(false);
            }}
          >
            Sắp chiếu
          </div>
        </div>
        {listShowing !== undefined && <Content data={listShowing.data} />}

        {/* code ngu */}
        {/* <div>HELLO WORLD</div> */}
      </div>
    </div>
  );
}

export default Home;
