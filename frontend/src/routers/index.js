import Home from "../pages/Home";
import Detail from "../pages/Detail";

const publicRouters = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/detail",
    component: Detail,
  },
];

export { publicRouters };
