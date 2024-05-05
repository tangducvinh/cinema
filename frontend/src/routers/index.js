import Home from "../pages/Home";
import Detail from "../pages/Detail";
import { SliderLayout } from "../component/Layout";

const publicRouters = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/detail/:mid",
    component: Detail,
  },
];

export { publicRouters };
