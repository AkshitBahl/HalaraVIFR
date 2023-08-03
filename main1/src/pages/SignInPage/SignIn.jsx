import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import AuthLanding from "../../components/Landingtemp/AuthLanding";
import chevron_left from "../../assets/images/chevron_left.png";
import eye from "../../assets/images/eye.png";
import google from "../../assets/images/google.png";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (


<div className="flex w-full bg-[#F4F5FE] min-h-screen">
      <AuthLanding />

      <div className="bg-[white] w-3/6 border-none rounded-l-2xl flex items-center justify-center">
        <div className=" flex flex-col w-3/5 gap-5 justify-center items-center">
          <div className="flex w-full items-center gap-2">
            <img src={chevron_left} alt="" className="w-10 h-10 shrink-0" />
            <div className="text-[#000] text-3xl font-medium leading-9 tracking-wider">
              Login
            </div>
          </div>
          <form className="flex flex-col gap-8 w-full"  onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full outline-none border-b-2 p-2 placeholder:text-base placeholder:font-normal placeholder:leading-9 placeholder:tracking-widest"
            />
            <div className="w-full flex border-b-2 p-2">
              <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
                className=" w-full outline-none  placeholder:text-base placeholder:font-normal placeholder:leading-9 placeholder:tracking-widest"
              />
              <img src={eye} alt="" className=" w-6 h-6 cursor-pointer" />
            </div>
            <Link to={"/signinwithnumber"} className="text-xs font-normal leading-9 tracking-wider text-[#4E51BF]">Login with email & password</Link>
            <p className="text-center text-[red]">{error}</p>
            <button
              className="w-full px-6 py-3 flex justify-center items-center bg-[#4E51BF] rounded-3xl text-[#fff] montserrat text-base not-italic leading-4 tracking-widest "
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>
          <div className="text-[#0a0a0a] text-base not-italic font-medium leading-9">
            Or
          </div>

          {/* <button
            className="flex justify-center items-center gap-2 w-46 h-9 text-sm font-light leading-9 tracking-wide"
            onClick={handleGoogleSubmit}
          >
            <img src={google} alt="" className="w-6 h-7 shrink-0  " />
            Signup with Google
          </button> */}

          <div className="text-[#909094] text-base not-italic font-medium leading-9 tracking-wider">
            Dont't have an account?{"  "}
            <Link className="text-[#4E51BF]" to={"/signup"}>Sign up</Link>
          </div>
        </div>

      </div>
    </div>
  
  );
};

export default SignIn;
