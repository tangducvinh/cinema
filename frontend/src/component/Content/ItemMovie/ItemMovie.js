import { useState } from "react";
import Button from "../../Button/Button";
import { GrTicket } from "react-icons/gr";
import { FaRegCirclePlay } from "react-icons/fa6";
import Image from "../../Image/Image";
import { useNavigate } from "react-router-dom";
import Trailer from "../../trailer/trailer";

function ItemMovie({ data }) {
  const [hoverPoster, setHoverPoster] = useState(false);
  const [hoverBg, setHoverBg] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const navigate = useNavigate();
  const handleDetailMovie = () => {
    window.scrollTo(0, 0);
    navigate(`/detail/${data.id}`);
  };
  const handleTrailer = () => {
    setTrailer(!trailer);
  };
  return (
    <div className="flex flex-col w-full h-full">
      {trailer && (
        <Trailer keyFrame={data.video[0].key} onClick={handleTrailer} />
      )}
      <div
        className="w-full h-5/6 object-cover rounded-xl relative mr-4 flex-none"
        onMouseEnter={() => {
          setHoverPoster(true);
          setHoverBg(true);
        }}
        onMouseLeave={() => {
          setHoverPoster(false);
          setHoverBg(false);
        }}
      >
        <div className="relative w-full h-full" onClick={handleDetailMovie}>
          <Image
            alt="oke"
            src={
              data.poster_path.slice(0, 4) === "http"
                ? data.poster_path
                : `${process.env.REACT_APP_IMAGE_URL}${data.poster_path}`
            }
            className="w-full h-full object-cover rounded-xl "
          />
          <div
            className={`absolute w-full h-full top-0  rounded-xl ${
              hoverBg && "bg-black bg-opacity-45"
            }`}
          ></div>
        </div>
        {hoverPoster && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 traslate-y-1/2 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Button
                leftIcon={<GrTicket />}
                primary
                small
                onClick={handleDetailMovie}
                onMouseEnter={() => {
                  setHoverBg(true);
                }}
                onMouseLeave={() => {}}
              >
                Mua vé
              </Button>
            </div>
            <Button
              leftIcon={<FaRegCirclePlay />}
              outline
              small
              onClick={handleTrailer}
            >
              Trailer
            </Button>
          </div>
        )}
      </div>
      <h1 className="text-[-18] font-medium mt-2 overflow-hidden line-clamp-1 ">
        {data.original_title}
      </h1>
    </div>
  );
}

export default ItemMovie;
