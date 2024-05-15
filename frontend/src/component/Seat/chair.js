import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../redux/slides/orderSlide";
function Chair({ col, sold, click, cancelClick }) {
  const dispatch = useDispatch();
  const localBooking = JSON.parse(localStorage.getItem("booking"));

  const [book, setBook] = useState(false);
  const idShow = localBooking.showId;
  // useEffect(() => {

  //   setBook(false);
  // }, [idShow]);
  useEffect(() => {
    setBook(
      Boolean(
        localBooking.seats.find((item) => {
          return item.name === col?.name;
        })
      )
    );
  }, [localBooking]);

  const handleClick = () => {
    setBook(!book);
    if (book === false) {
      click();
    } else {
      cancelClick();
    }
  };

  // if (book === true) {
  //   dispatch(updateOrder({ seats: col }));
  // }

  return (
    <div>
      {col !== undefined ? (
        <div>
          {sold === false ? (
            <div>
              {col.status === "empty" ? (
                <p
                  className={`mx-1 my-2 min-w-7 py-1 border  text-center text-[-12] rounded-md leading-none  text-white border-white cursor-default`}
                >
                  {col.name}
                </p>
              ) : (
                <p
                  className={`mx-1 my-2 min-w-7 py-1 border border-gray-300 text-center text-[-12] rounded-md leading-none cursor-pointer hover:bg-yellow-700 hover:text-white hover:border-yellow-700 ${
                    book && "bg-orange-600 text-white"
                  }`}
                  onClick={handleClick}
                >
                  {col.name}
                </p>
              )}
            </div>
          ) : (
            <p
              className={`mx-1 my-2 min-w-7 py-1 border border-gray-300 text-center text-[-12] rounded-md leading-none cursor-pointer bg-gray-500 `}
            >
              {col.name}
            </p>
          )}
        </div>
      ) : (
        <p className="mx-1 my-2 min-w-7 h-full py-1 border border-white text-white text-[-12] text-center rounded-md">
          1
        </p>
      )}
    </div>
  );
}

export default Chair;
