import { useState } from "react";
import Button from "../../Button/Button";
import { GrTicket } from "react-icons/gr";
import { FaRegCirclePlay } from "react-icons/fa6";

function ItemMovie({ data }) {
  const [hoverPoster, setHoverPoster] = useState(false);
  return (
    <div className="mb-5">
      <div
        className="w-[-290] h-[-435] object-cover rounded-xl relative"
        onMouseEnter={() => {
          setHoverPoster(true);
        }}
        onMouseLeave={() => {
          setHoverPoster(false);
        }}
      >
        <img
          alt="oke"
          src="https://cdn.galaxycine.vn/media/2024/4/10/cai-gia-cua-hanh-phuc-3_1712733167355.jpg"
          className="w-[-290] h-[-435] object-cover rounded-xl "
        />
        {hoverPoster && (
          <div className="w-[-290] h-[-435] absolute top-0 bg-black bg-opacity-60 object-cover rounded-xl flex flex-col items-center justify-center">
            <div className="mb-4">
              <Button leftIcon={<GrTicket className="mr-2" />} primary small>
                Mua vé
              </Button>
            </div>
            <Button
              leftIcon={<FaRegCirclePlay className="mr-2" />}
              outline
              small
            >
              Trailer
            </Button>
          </div>
        )}
      </div>
      <h1 className="text-[-18] font-medium mt-2">Cái giá của hạnh phúc</h1>
    </div>
  );
}

export default ItemMovie;
