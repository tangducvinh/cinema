import Button from "../../Button/Button";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../../services/UserServices";
import { updateUser } from "../../../redux/slides/userSlide";
import { Link } from "react-router-dom";

function MenuItem({ data, onClick, ...pastProps }) {
  let Comp = "div";
  if (data.to) {
    Comp = Link;
  }
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (data.title === "Đăng xuất") {
      const response = await logoutUser();

      console.log(response)

      if (response.success) {
        dispatch(updateUser(null));
      }
    }
  };

  const props = {
    onClick,
    ...pastProps,
  };
  return (
    <Comp
      className="flex items-center justify-center py-2 px-2 hover:border-l-4 hover:text-[text-primary] hover:border-yellow-500 hover:bg-orange-100 cursor-pointer"
      {...props}
      onClick={handleLogout}
      to={data.to}
    >
      <span className="mr-3 ">{data.icon}</span>
      <p className="text-[-14]">{data.title}</p>
    </Comp>
  );
}

export default MenuItem;
