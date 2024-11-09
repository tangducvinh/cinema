import { useState, useEffect, Fragment } from "react";
import { MdClear } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";

import { ItemUserInfor } from "../../component/itemInfor";
import * as apis from "../../apis";
import Pagiantion from "../../component/pagination/Pagination";
import { listRole } from "../../ultis/options";
import Loading from '../../component/common/Loading'

const ManagerAccount = () => {
  const { renderManagerUser } = useSelector((state) => state.app);
  const [value, setValue] = useState("");
  const [dataUsers, setDataUsers] = useState([]);
  const [textSearch] = useDebounce(value, 800);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [valueRole, setValueRole] = useState();

  const fecthDataUsers = async (data) => {
    const response = await apis.getAllUsers(data);

    if (response?.success) {
      setDataUsers(response.data);
      setTotal(response.counts);
    }
  };

  useEffect(() => {
    const dataPass = {};
    if (textSearch) {
      dataPass.title = textSearch.trim();
    }
    if (page) {
      dataPass.page = page;
    }
    if (valueRole !== "all") {
      dataPass.role = valueRole;
    }
    fecthDataUsers(dataPass);
  }, [textSearch, renderManagerUser, page, valueRole]);

  useEffect(() => {
    setPage(1);
  }, [textSearch]);

  useEffect(() => {
    setPage(1);
  }, [valueRole]);

  if (!dataUsers) return <Loading />

  return (
    <div className="w-full">
      <h2 className="font-medium text-2xl">Danh sách tài khoản</h2>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center">
          <form className="relative w-[300px]">
            <input
              className="border-[2px] w-full shadow-sm px-2 py-1 rounded-md outline-none"
              placeholder="Tìm kiếm theo email hoặc số điện thoại"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>
            {value !== "" && (
              <span
                className="absolute translate-y-[50%] cursor-pointer right-[10px]"
                onClick={() => setValue("")}
              >
                <MdClear size="18px" />
              </span>
            )}
          </form>

          <div>
            <label className="font-medium mr-2 ml-5">Vai trò</label>
            <select
              className="ml-3"
              onChange={(e) => setValueRole(e.target.value)}
            >
              <option value="all">Tất cả</option>
              {listRole.map((item, inex) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ul className="flex items-center bg-[#eb9651] px-4 py-2 w-full mt-3 rounded-sm">
        <li className="w-[48px]"></li>
        <li className="flex-1 font-semibold">Tên</li>
        <li className="flex-1 font-semibold">Email</li>
        <li className="flex-1 font-semibold">Số điện thoại</li>
        <li className="flex-1 font-semibold">Vai trò</li>
        <li className="w-[52px]"></li>
      </ul>

      {dataUsers.map((item, index) => (
        <Fragment key={index}>
          <ItemUserInfor
            name={item.name}
            email={item.email}
            phone={item.phone}
            role={item.role}
            image={item.avatar}
            _id={item._id}
          />
        </Fragment>
      ))}

      {total > 15 && (
        <div className="flex justify-center mt-[30px] pb-[50px]">
          <Pagiantion
            total={total}
            sizePage={15}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default ManagerAccount;
