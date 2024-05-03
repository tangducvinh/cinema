import { useState } from "react";
import Button from "../../Button/Button";
import { GrTicket } from "react-icons/gr";
import { FaRegCirclePlay } from "react-icons/fa6";
import Image from "../../Image/Image";

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
        <Image
          alt="oke"
          src={`${process.env.REACT_APP_IMAGE_URL}${data.poster_path}`}
          className="w-[-290] h-[-435] object-cover rounded-xl "
        />
        {hoverPoster && (
          <div className="w-[-290] h-[-435] absolute top-0 bg-black bg-opacity-60 object-cover rounded-xl flex flex-col items-center justify-center">
            <div className="mb-4">
              <Button leftIcon={<GrTicket />} primary small>
                Mua vé
              </Button>
            </div>
            <Button leftIcon={<FaRegCirclePlay />} outline small>
              Trailer
            </Button>
          </div>
        )}
      </div>
      <h1 className="text-[-18] font-medium mt-2">{data.original_title}</h1>
    </div>
  );
}

export default ItemMovie;
