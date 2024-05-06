import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Button from "../Button/Button";
function Login({ onClick }) {
  const [handleLogin, setHandleLogin] = useState(true);

  return (
    <div className="fixed w-screen h-screen z-10 bg-black bg-opacity-45 ">
      <div className="w-[-500] absolute max-h-full bg-white mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div className="flex relative py-3">
          <button
            className={`text-2xl font-bold py-3 text-center relative cursor-pointer px-5 text-[text-primary]`}
          >
            {handleLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
          <div
            className="absolute right-5 top-4 px-1 py-1 bg-gray-100 rounded-[-50%] hover:cursor-pointer "
            onClick={onClick}
          >
            <IoMdClose fontSize="23px" />
          </div>
        </div>
        {handleLogin ? <SignIn /> : <SignUp />}
        {handleLogin ? (
          <div className="px-5">
            <div className="flex flex-col items-center justify-center mt-4 pb-9">
              <h1 className="mb-3">Bạn chưa có tài khoản ?</h1>
              <Button
                outline
                big
                onClick={() => {
                  setHandleLogin(false);
                }}
              >
                ĐĂNG KÝ
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-5">
            <div className="flex flex-col items-center justify-center mt-4 pb-9">
              <h1 className="mb-3">Bạn đã có tài khoản ?</h1>
              <Button
                outline
                big
                onClick={() => {
                  setHandleLogin(true);
                }}
              >
                ĐĂNG NHẬP
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
