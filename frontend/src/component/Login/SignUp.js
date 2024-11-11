import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Button from "../Button/Button";
import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import Swal from "sweetalert2";
import swal from "sweetalert";
import validate from "../../ultis/validateField";
import * as apis from "../../apis";

function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const [isPending, setIsPending] = useState(false);

  // const mutationSignUp = useMutationHooks((data) =>
  //   {
  //     const response = UserServices.signUpUser(data)

  //     // swal(response.success ? 'Thành công' : 'Thất bại', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
  //     return response
  //   }
  // );
  // const { isPending, isSuccess, data } = mutationSignUp;

  // // listen when signup success
  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log(data)
  //   }
  // }, [isSuccess])

  const handleSignUp = async () => {
    const valid = validate(payload, setInvalidFields);
    if (valid === 0) {
      setIsPending(true);
      const response = await apis.register({ ...payload });
      setIsPending(false);
      swal(
        response.success ? "Thành công" : "Thất bại",
        response.mes || "Đã có lỗi xảy ra",
        response.success ? "success" : "error"
      );
      setPayload({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // Swal.fire({
      //   text: "Bạn đã đăng kí thành công!",
      //   icon: "success",
      // });
    }
  };

  return (
    <div>
      <div className="px-5">
        <div>
          <p className="text-[-18] font-bold">Họ và tên</p>
          <input
            type="text"
            placeholder="họ và tên"
            className="w-full px-3 leading-10 border border-gray-300 outline-none mt-3 focus:border-black"
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, name: e.target.value }))
            }
            value={payload.name}
            onFocus={() => {
              setInvalidFields([]);
              setPayload((prev) => ({ ...prev, name: "" }));
            }}
          />
          {invalidFields?.some((el) => el.name === "name") && (
            <small className="text-red-500 italic">
              {invalidFields.find((el) => el.name === "name").mes}
            </small>
          )}
        </div>
        <div>
          <p className="text-[-18] font-bold">Email</p>
          <input
            type="email"
            placeholder="email"
            className="w-full px-3 leading-10 border border-gray-300 outline-none mt-3 focus:border-black "
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
          <p className="text-[-18] font-bold">Phone</p>
          <input
            type="text"
            placeholder="số điện thoại"
            className="w-full px-3 leading-10 border border-gray-300 outline-none mt-3 focus:border-black "
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, phone: e.target.value }))
            }
            value={payload.phone}
            onFocus={() => {
              setInvalidFields([]);
              setPayload((prev) => ({ ...prev, phone: "" }));
            }}
          />
          {invalidFields?.some((el) => el.name === "phone") && (
            <small className="text-red-500 italic">
              {invalidFields.find((el) => el.name === "phone").mes}
            </small>
          )}
        </div>
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
        <p className="text-[-18] font-bold">Confirm Password</p>
        <div className="relative">
          <input
            type={isShowConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none mt-3 focus:border-black"
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            value={payload.confirmPassword}
            onFocus={() => {
              setInvalidFields([]);
              setPayload((prev) => ({ ...prev, confirmPassword: "" }));
            }}
          />
          <div
            className="absolute top-4 right-0 px-2 py-2"
            onClick={() => {
              setIsShowConfirmPassword(!isShowConfirmPassword);
            }}
          >
            {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          {invalidFields?.some((el) => el.name === "confirmPassword") && (
            <small className="text-red-500 italic">
              {invalidFields.find((el) => el.name === "confirmPassword").mes}
            </small>
          )}
        </div>

        <div className="mt-3 pb-9">
          <Loading isLoading={isPending}>
            <div className="flex justify-center  border-b border-b-gray-400">
              <Button primary big onClick={handleSignUp}>
                HOÀN THÀNH
              </Button>
            </div>
          </Loading>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
