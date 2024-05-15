import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Button from "../Button/Button";
import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import Swal from "sweetalert2";
import { updateUser } from "../../redux/slides/userSlide";
import { useDispatch } from "react-redux";

function SignIn() {
  const dispatch = useDispatch();

  const mutationSingIn = useMutationHooks((data) =>
    // call api login
    UserServices.signInUser(data)
  );
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const { data, isPending, isSuccess, isError } = mutationSingIn;
  useEffect(() => {
    if (data) {
      if (
        data.data === "Account didn't exist" ||
        data.data === "Wrong password"
      ) {
        Swal.fire({
          text: "Thất bại!",
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Đăng nhập thành công!",
          icon: "success",
        });

        console.log(data);
        if (data) {
          dispatch(updateUser(data.data));
        }
        // localStorage.setItem("access_token ", data.accessToken);
      }
    }
  }, [data]);
  const handleSignIn = () => {
    mutationSingIn.mutate({
      account: email,
      password: password,
    });
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
        <div className="mt-4 mb-3">
          <Loading isLoading={isPending}>
            <div className="flex justify-center border-b border-b-gray-400">
              <Button
                primary
                big
                disabled={!email || !password}
                onClick={handleSignIn}
              >
                ĐĂNG NHẬP
              </Button>
            </div>
          </Loading>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
