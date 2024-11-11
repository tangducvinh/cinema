import { useMutationHooks } from "../../hooks/useMutationHook";
import Seat from "../Seat/Seat";
import * as SeatServices from "../../services/SeatServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Room({ show, sid }) {
  const [listSeat, setListSeat] = useState([]);
  const data = show;

  const mutationListSeat = useMutationHooks(async (idRoom) => {
    const res = await SeatServices.getListSeat(idRoom);
    setListSeat(res.data);
  });
  useEffect(() => {
    mutationListSeat.mutate(data.roomId._id);
  }, [data]);

  return (
    <div className="mt-5 px-4 py-4 bg-white w-full">
      <div>
        <Seat
          row={Number(data.roomId.row)}
          col={Number(data.roomId.column)}
          blockSeat={data.block_seats}
          listSeat={listSeat}
          sid={sid}
        />
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
  );
}

export default Room;
