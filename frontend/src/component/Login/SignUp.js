// import { useEffect, useState } from 'react';
// import Button from '../Layout/component/Button/Button';
// import { FaEyeSlash } from 'react-icons/fa';
// import { FaEye } from 'react-icons/fa6';
// import { useMutationHooks } from '../../hooks/useMutationHook';
// import * as UserService from '../../services/UserService';
// import Loading from '../LoadingComponent/Loading';
// import * as message from '../Message/Message';

// function SignUp() {
//     const mutation = useMutationHooks((data) => UserService.signUpUser(data));
//     const [isShowPassword, setIsShowPassword] = useState(false);
//     const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const { data, isPending, isSuccess, isError } = mutation;

//     useEffect(() => {
//         if (isSuccess) {
//             message.success();
//         } else if (isError) {
//             message.error();
//         }
//     }, [isSuccess, isError]);
//     const handleOnChangeEmail = (e) => {
//         setEmail(e.target.value);
//     };
//     const handleOnChangeName = (e) => {
//         setName(e.target.value);
//     };
//     const handleOnChangePassword = (e) => {
//         setPassword(e.target.value);
//     };
//     const handleOnChangeConfirmPassword = (e) => {
//         setConfirmPassword(e.target.value);
//     };

//     const handleSignUp = () => {
//         mutation.mutate({
//             name,
//             email,
//             password,
//             confirmPassword,
//         });
//     };

//     return (
//         <div>
//             <div className="px-5">
//                 <p className="text-[-18] font-bold">Họ và tên</p>
//                 <input
//                     type="text"
//                     placeholder="họ và tên"
//                     className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
//                     onChange={(e) => handleOnChangeName(e)}
//                     value={name}
//                 />
//                 <p className="text-[-18] font-bold">Email</p>
//                 <input
//                     type="email"
//                     placeholder="email"
//                     className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black "
//                     onChange={(e) => handleOnChangeEmail(e)}
//                     value={email}
//                 />
//                 <p className="text-[-18] font-bold">Password</p>
//                 <div className="relative">
//                     <input
//                         type={isShowPassword ? 'text' : 'password'}
//                         placeholder="password"
//                         className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
//                         onChange={(e) => handleOnChangePassword(e)}
//                         value={password}
//                     />
//                     <div
//                         className="absolute top-4 right-0 px-2 py-2"
//                         onClick={() => {
//                             setIsShowPassword(!isShowPassword);
//                         }}
//                     >
//                         {isShowPassword ? <FaEye /> : <FaEyeSlash />}
//                     </div>
//                 </div>
//                 <p className="text-[-18] font-bold">Confirm Password</p>
//                 <div className="relative">
//                     <input
//                         type={isShowConfirmPassword ? 'text' : 'password'}
//                         placeholder="confirm password"
//                         className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
//                         onChange={(e) => handleOnChangeConfirmPassword(e)}
//                         value={confirmPassword}
//                     />
//                     <div
//                         className="absolute top-4 right-0 px-2 py-2"
//                         onClick={() => {
//                             setIsShowConfirmPassword(!isShowConfirmPassword);
//                         }}
//                     >
//                         {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                     </div>
//                 </div>
//                 {data?.status === 'ERR' && <span className="text-red-600">{data?.message}</span>}
//             </div>

//             <div className="flex justify-center mt-3 pb-9">
//                 <Loading isLoading={isPending}>
//                     <Button
//                         noOutline
//                         onClick={handleSignUp}
//                         disabled={!email || !password || !name || !confirmPassword}
//                     >
//                         Đăng ký
//                     </Button>
//                 </Loading>
//             </div>
//         </div>
//     );
// }

// export default SignUp;
