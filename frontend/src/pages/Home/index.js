import { useState } from "react";
import Content from "../../component/Content/Content";

function Home() {
  const [showDangChieu, setShowDangChieu] = useState(true);
  const listFilm = [
    {
      name: "Phim số 1",
    },
    {
      name: "Phim số 2",
    },
    {
      name: "Phim số 3",
    },
    {
      name: "Phim số 4",
    },
    {
      name: "Phim số 5",
    },
  ];
  return (
    <div className="mt-10">
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
      <Content data={listFilm} />
    </div>
  );
}

export default Home;
