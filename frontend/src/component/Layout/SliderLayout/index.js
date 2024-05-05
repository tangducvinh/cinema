import Header from "../../Header/header";
import Slider from "./Slider/Slider";

function SliderLayout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default SliderLayout;
