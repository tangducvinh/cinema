import { FaAngleDown } from "react-icons/fa";
function HeaderBarItem({ data }) {
  const handleLogout = () => {
    console.log(data);
  };

  return (
    <div
      className="flex items-center px-3 cursor-pointer text-gray-600  hover:text-[text-primary]"
      onClick={handleLogout}
    >
      <p className="mr-1 ">{data}</p>
      <FaAngleDown className=" text-xs" />
    </div>
  );
}

export default HeaderBarItem;
