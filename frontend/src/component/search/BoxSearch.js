import { useState, useEffect } from "react";
import moment from "moment";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import * as apis from "../../apis";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const BoxSearch = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const [dataMovieShow, setDataMovieShow] = useState([]);
  const [valueMovie, setValueMovie] = useState("");
  const currentDay = new Date();
  const [listDay, setListDay] = useState([]);
  const [valueDay, setValueDay] = useState("");
  const [listShow, setListshow] = useState([]);
  const [valueShow, setValueShow] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  console.log(
    `${currentDay.getFullYear()}-${
      currentDay.getMonth() + 1
    }-${currentDay.getDate()}`
  );

  // get list movie showing
  const fecthDataMovieShow = async () => {
    const response = await apis.getListMovie("showing");

    if (response?.success) {
      setDataMovieShow(
        response.data.map((item) => ({
          id: item._id,
          name: item.original_title,
        }))
      );
    }
  };

  // get list show
  const fecthListShow = async (data) => {
    const response = await apis.getListShow(data);

    if (response.success) {
      setListshow(
        response.data.map((item) => ({
          id: item._id,
          time: moment(item.begin_time).format("HH:mm"),
        }))
      );
    }
  };

  useEffect(() => {
    fecthDataMovieShow();
  }, []);

  useEffect(() => {
    const listDay = [];

    for (let i = 0; i < 3; i++) {
      let tuesday;
      if (i === 0) tuesday = "Hôm nay";
      else if (i === 1) tuesday = "Ngày mai";
      else tuesday = "Ngày kia";
      listDay.push({
        value: `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${
          currentDay.getDate() + i
        }`,
        text: `${tuesday}, ${currentDay.getDate() + i}-${
          currentDay.getMonth() + 1
        }-${currentDay.getFullYear()}`,
      });
    }

    setListDay(listDay);
  }, []);

  useEffect(() => {
    if (valueDay && valueMovie) {
      const dataPass = {
        movieId: valueMovie,
        day: valueDay,
      };
      fecthListShow(dataPass);
    }
  }, [valueDay, valueMovie]);

  useEffect(() => {
    if (valueMovie && valueDay && valueShow) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [valueMovie, valueDay, valueShow]);

  const handleSearch = () => {
    if (showSearch) {
      navigate(`/booking/${valueShow}`);
    }
  };

  return (
    <div className="flex items-center shadow-lg">
      <div className="flex items-center pl-3 pr-1 py-4 rounded-l-sm">
        <div className="mr-2 flex items-center text-sm">
          <label className="bg-main text-white px-[6px] text-[12px] rounded-full mr-1">
            1
          </label>
          <select
            className="w-[250px] outline-none cursor-pointer"
            value={valueMovie}
            onChange={(e) => setValueMovie(e.target.value)}
          >
            <option value={""}>Chọn phim</option>
            {dataMovieShow.map((item, index) => (
              <option value={item.id} key={item.id}>
                {item.name}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mr-2 flex items-center text-sm">
          <label className="bg-main text-white px-[6px] text-[12px] rounded-full mr-1">
            2
          </label>
          <select
            className="w-[250px] outline-none cursor-pointer"
            value={valueDay}
            onChange={(e) => setValueDay(e.target.value)}
          >
            <option value="">Chọn ngày</option>
            {listDay.map((item) => (
              <option value={item.value} key={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center text-sm">
          <label className="bg-main text-white px-[6px] text-[12px] rounded-full mr-1">
            3
          </label>
          <select
            className="w-[170px] outline-none cursor-pointer"
            value={valueShow}
            onChange={(e) => setValueShow(e.target.value)}
          >
            <option value="">Chọn suất</option>
            {listShow.length > 0 ? (
              listShow.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.time}
                </option>
              ))
            ) : (
              <option value="">Chưa có suất chiếu</option>
            )}
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          if (user === null) {
            Swal.fire({
              title: "Login?",
              text: "Đăng nhập để đặt vé!!!",
              icon: "error",
            });
          } else {
            handleSearch();
          }
        }}
        className={clsx(
          "h-[52px] min-w-[200px] rounded-r-sm ",
          { "bg-main": showSearch },
          { "bg-[#F8AC6E] text-gray-500": !showSearch }
        )}
      >
        Mua vé nhanh
      </button>
    </div>
  );
};

export default BoxSearch;
