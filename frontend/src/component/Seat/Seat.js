import { useEffect, useState } from "react";
import Chair from "./chair";
import { useParams } from "react-router-dom";
import { updateOrder } from "../../redux/slides/orderSlide";
import { useDispatch, useSelector } from "react-redux";

function Seat({ row = 10, col = 10, listSeat, blockSeat, sid }) {
  const block_seat = blockSeat;
  var numbers = [];
  const oke = listSeat;
  // Lặp theo hàng
  var t = 0;
  for (var i = 0; i < row; i++) {
    numbers[i] = [];

    // Lặp theo cột, số cộ từ 0 -> số lượng phần tử của hàng i
    for (var j = 0; j < col; j++) {
      numbers[i][j] = oke[t];

      t++;
    }
  }

  // const [seatChoose, setSeatChoose] = useState([]);
  let localBooking1 = JSON.parse(localStorage.getItem("booking"));
  let seatChoose = [];
  if (seatChoose.length === 0) {
    seatChoose = localBooking1.seats;
  }
  const handleChoose = async (coll) => {
    let localBooking = JSON.parse(localStorage.getItem("booking"));
    // await setSeatChoose((prev) => [...prev, coll]);
    seatChoose.push(coll);

    localStorage.setItem(
      "booking",
      JSON.stringify({
        ...localBooking,
        seats: [...seatChoose],
      })
    );
  };
  const handleCancelChoose = (coll) => {
    let localBooking = JSON.parse(localStorage.getItem("booking"));
    const arr = seatChoose.filter((item) => {
      return item.name !== coll.name;
    });
    // setSeatChoose([...arr]);
    seatChoose = arr;

    localStorage.setItem(
      "booking",
      JSON.stringify({ ...localBooking, seats: seatChoose })
    );
  };

  // console.log("localBooking ", localBooking.showId);
  // useEffect(() => {
  //   let localBooking1 = JSON.parse(localStorage.getItem("booking"));
  //   dispatch(updateOrder({ ...order, seats: localBooking1.seats }));
  // }, [order]);

  return (
    <div className="flex items-center">
      {numbers.length !== 0 && (
        <table className="w-full">
          {numbers.map((row, index) => {
            return (
              <div className="flex items-center justify-between">
                <tr>
                  <p className="leading-none w-5 h-5 my-auto py-1 text-center font-semibold text-[text-primary] uppercase">
                    {String.fromCharCode(97 + index)}
                  </p>
                </tr>
                <tr>
                  {row.map((coll, index) => {
                    // blockseat
                    let sold1 = Boolean(
                      blockSeat.find((item) => {
                        return item.seatId === coll?._id;
                      })
                    );
                    return (
                      <td className="leading-none ">
                        <Chair
                          col={coll}
                          sold={sold1}
                          click={() => {
                            if (coll?.status !== "fix") handleChoose(coll);
                          }}
                          cancelClick={() => {
                            if (coll?.status !== "fix")
                              handleCancelChoose(coll);
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <p className="leading-none w-5 h-5 text-center  py-1 my-auto font-semibold text-[text-primary] uppercase">
                    {String.fromCharCode(97 + index)}
                  </p>
                </tr>
              </div>
            );
          })}
        </table>
      )}
    </div>
  );
}

export default Seat;
