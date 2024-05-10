import { useSelector } from "react-redux";
import Image from "../Image/Image";
import { converTimeShow, convertCalender } from "../utils";
import Button from "../Button/Button";

function Cart({ dataShowDetail }) {
  return (
    <div>
      <div className="bg-white ml-3  rounded-lg border-t-8 border-t-yellow-600 px-4 py-5">
        <div className="flex mt-2">
          <Image
            alt="poster"
            src={`${process.env.REACT_APP_IMAGE_URL}${dataShowDetail.movieId.poster_path}`}
            className="w-32 h-48 object-cover rounded-lg"
          />
          <div className="ml-2 flex flex-col">
            <span className="text-[-18] font-semibold">
              {dataShowDetail.movieId.original_title}
            </span>
            <span>2D phụ đề</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold">{dataShowDetail.roomId.name}</div>
          <div className="mt-1">
            <span>Suất: </span>
            <span className="font-semibold">
              {converTimeShow(dataShowDetail.begin_time) +
                " - " +
                convertCalender(dataShowDetail.begin_time)}
            </span>
          </div>
        </div>
        <div className="border-t border-t-orange-600 border-dashed my-5"></div>
        <div className="flex justify-between">
          <p className="font-semibold">Tổng cộng</p>
          <p className=" text-[text-primary] font-semibold text-[-18]">0đ</p>
        </div>
      </div>

      <div className="flex  justify-end mt-4 ">
        <div className="mr-3">
          <Button outline>Quay lại</Button>
        </div>
        <Button primary>Tiếp tục</Button>
      </div>
    </div>
  );
}

export default Cart;
