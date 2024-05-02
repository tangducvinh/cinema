import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Button from "../Button/Button";

function SignIn() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="px-5">
        <p className="text-[-18] font-bold">Email</p>
        <input
          type="email"
          placeholder="email"
          className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
          onChange={(e) => handleOnChangeEmail(e)}
          value={email}
        />
        <p className="text-[-18] font-bold">Password</p>
        <div className="relative">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="password"
            className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
            onChange={(e) => handleOnChangePassword(e)}
            value={password}
          />
          <div
            className="absolute top-4 right-0 px-2 py-2"
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          >
            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
