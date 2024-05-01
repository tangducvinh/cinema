import { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

function Slider({ slider }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = slider.length;
  //   let refreshSlider = setInterval(() => {
  //     nextSlider();
  //   }, 5000);

  const prevSlider = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const nextSlider = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };
  const goToSlideIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="overflow-hidden relative my-4">
      <div onClick={prevSlider}>
        <GrPrevious className="absolute left-6 top-1/2 -translate-y-1/2 text-6xl cursor-pointer hover:text-[text-primary]" />
      </div>
      <div onClick={nextSlider}>
        <GrNext className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl cursor-pointer hover:text-[text-primary]" />
      </div>
      {slider.map((item, index) => {
        return (
          <div>
            {index === currentIndex && (
              <img
                src={item.url}
                alt="poster"
                className="w-[-1500] h-[-500] px-2 object-cover mx-auto"
              />
            )}
          </div>
        );
      })}
      <div className="flex items-center absolute bottom-4 left-1/2 -translate-x-1/2">
        {slider.map((item, index) => {
          return (
            <div key={index} onClick={() => goToSlideIndex(index)}>
              {index === currentIndex ? (
                <div className="w-4 h-4 mx-2 rounded-[-50%] border border-white bg-white cursor-pointer"></div>
              ) : (
                <div className="w-4 h-4 mx-2 rounded-[-50%] border border-white bg-transparent cursor-pointer"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
