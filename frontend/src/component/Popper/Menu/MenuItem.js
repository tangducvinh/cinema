import Button from "../../Button/Button";
import { useDispatch } from 'react-redux'

import { logoutUser } from "../../../services/UserServices";
import { updateUser } from '../../../redux/slides/userSlide'

function MenuItem({ data, onClick, ...pastProps }) {
  const dispatch = useDispatch()

  const handleLogout = async() => {
    if (data.title === 'Đăng xuất') {
      const response = await logoutUser()

      if (response.success) { 
        dispatch(updateUser(null))
      } 
    }
  }

  const props = {
    onClick,
    ...pastProps,
  };
  return (
    <div
      className="flex items-center justify-center py-2 px-2 hover:border-l-4 hover:text-[text-primary] hover:border-yellow-500 cursor-pointer"
      {...props}
      onClick={handleLogout}
    >
      <span className="mr-3 ">{data.icon}</span>
      <p className="text-[-14]">{data.title}</p>
    </div>
  );
}

export default MenuItem;
