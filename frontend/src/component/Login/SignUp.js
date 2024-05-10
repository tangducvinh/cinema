import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Button from "../Button/Button";
import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import Swal from "sweetalert2";
import swal from 'sweetalert'

import * as apis from '../../apis'

function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validatePass, setValidatePass] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);

  const [ isPending, setIsPending ] = useState(false)

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
    setValidateEmail(false);
  };
  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
    setValidatePass(false);
  };
  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setValidatePass(false);
  };
  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };

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



  const handleSignUp = async() => {
    const reg =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    console.log("email 123 ", !reg.test(email));
    if (password !== confirmPassword) {
      setValidatePass(true);
    } else if (!reg.test(email)) {
      setValidateEmail(true);
    } else {
      // mutationSignUp.mutate({
      //   name: name,
      //   email: email,
      //   password: password,
      //   phone: phone,
      // })
      setIsPending(true)
      const response = await apis.register({name, email, password, phone})
      setIsPending(false)

      swal(response.success ? 'Thành công' : 'Thất bại', response.mes || 'Đã có lỗi xảy ra', response.success ? 'success' : 'error')
      // Swal.fire({
      //   text: "Bạn đã đăng kí thành công!",
      //   icon: "success",
      // });
    }
  };

  return (
    <div>
      <div className="px-5">
        <p className="text-[-18] font-bold">Họ và tên</p>
        <input
          type="text"
          placeholder="họ và tên"
          className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
          onChange={(e) => handleOnChangeName(e)}
          value={name}
        />
        <p className="text-[-18] font-bold">Email</p>
        <input
          type="email"
          placeholder="email"
          className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black "
          onChange={(e) => handleOnChangeEmail(e)}
          value={email}
        />
        <p className="text-[-18] font-bold">Phone</p>
        <input
          type="text"
          placeholder="số điện thoại"
          className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black "
          onChange={(e) => handleOnChangePhone(e)}
          value={phone}
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
        <p className="text-[-18] font-bold">Confirm Password</p>
        <div className="relative">
          <input
            type={isShowConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
            onChange={(e) => handleOnChangeConfirmPassword(e)}
            value={confirmPassword}
          />
          <div
            className="absolute top-4 right-0 px-2 py-2"
            onClick={() => {
              setIsShowConfirmPassword(!isShowConfirmPassword);
            }}
          >
            {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div>
          {validatePass && (
            <span className="text-red-600 italic">
              Mất khẩu không trùng khớp
            </span>
          )}
          {validateEmail && (
            <span className="text-red-600 italic">Email không hợp lệ</span>
          )}
        </div>
        <div className="mt-3 pb-9">
          <Loading isLoading={isPending}>
            <div className="flex justify-center  border-b border-b-gray-400">
              <Button
                primary
                big
                disabled={
                  !name || !email || !password || !phone || !confirmPassword
                }
                onClick={handleSignUp}
              >
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
