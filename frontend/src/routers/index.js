import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Booking from "../pages/Booking";
import History from "../pages/History/History";
import { SliderLayout } from "../component/Layout";

const publicRouters = [
  {
    path: "*",
    component: Home,
  },
  {
    path: "/detail/:mid",
    component: Detail,
  },
  {
    path: "/booking/:sid",
    component: Booking,
  },
  {
    path: "/history",
    component: History,
  },
  {
    path: "/profile",
    component: History,
  },
];

export { publicRouters };

export const paths = {
  home: "*",
  manager: "/manager",
  movie: "/movie",
  account: "/account",
};
