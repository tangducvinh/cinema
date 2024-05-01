import Header from "../../Header/header";
import Slider from "./Slider/Slider";

function SliderLayout({ children }) {
  const sliders = [
    {
      url: "https://cdn.galaxycine.vn/media/2024/4/26/roundup-2048_1714102300441.jpg",
    },
    {
      url: "https://cdn.galaxycine.vn/media/2024/2/8/2048x682_1707364876796.jpg",
    },
    {
      url: "https://cdn.galaxycine.vn/media/2024/4/10/cai-gia-cua-hanh-phuc-2_1712733220607.jpg",
    },
  ];
  return (
    <div>
      <Header />
      <Slider slider={sliders} />
      <div className="mx-80">{children}</div>
    </div>
  );
}

export default SliderLayout;
