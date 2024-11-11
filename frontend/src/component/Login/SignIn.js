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
import validate from "../../ultis/validateField";

function SignIn() {
  const dispatch = useDispatch();

  const mutationSingIn = useMutationHooks(
    async (data) =>
      // call api login
      await UserServices.signInUser(data)
  );
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);

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
    const valid = validate(payload, setInvalidFields);
    if (valid === 0) {
      mutationSingIn.mutate({
        account: payload.email,
        password: payload.password,
      });
    }
  };

  return (
    <div>
      <div className="px-5 flex flex-col gap-3">
        <div>
          <p className="text-[-18] font-bold">Email</p>
          <input
            type="email"
            placeholder="email"
            className="w-full px-3 leading-10 border border-gray-300 outline-none mt-3 focus:border-black"
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, email: e.target.value }))
            }
            value={payload.email}
            onFocus={() => {
              setInvalidFields([]);
              setPayload((prev) => ({ ...prev, email: "" }));
            }}
          />
          {invalidFields?.some((el) => el.name === "email") && (
            <small className="text-red-500 italic">
              {invalidFields.find((el) => el.name === "email").mes}
            </small>
          )}
        </div>
        <div>
          <p className="text-[-18] font-bold">Password</p>
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="password"
              className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none mt-3 focus:border-black"
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, password: e.target.value }))
              }
              value={payload.password}
              onFocus={() => {
                setInvalidFields([]);
                setPayload((prev) => ({ ...prev, password: "" }));
              }}
            />
            <div
              className="absolute top-4 right-0 px-2 py-2"
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            {invalidFields?.some((el) => el.name === "password") && (
              <small className="text-red-500 italic">
                {invalidFields.find((el) => el.name === "password").mes}
              </small>
            )}
          </div>
        </div>
        <div className="mt-4 mb-3">
          <Loading isLoading={isPending}>
            <div className="flex justify-center border-b border-b-gray-400">
              <Button
                primary
                big
                // disabled={!payload.email || !payload.password}
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
