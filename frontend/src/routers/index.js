import Home from "../pages/Home";
import Detail from "../pages/Detail";
import { SliderLayout } from "../component/Layout";

const publicRouters = [
  {
    path: "/",
    component: Home,
    layout: SliderLayout,
  },
  {
    path: "/detail",
    component: Detail,
  },
];

export { publicRouters };
