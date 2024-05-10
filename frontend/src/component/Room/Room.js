import Seat from "../Seat/Seat";

function Room({ roomId }) {
  const room = roomId;
  return (
    <div className="mt-5 px-4 py-4 bg-white">
      <div>
        <Seat row={Number(roomId.row)} col={Number(roomId.column)} />
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
