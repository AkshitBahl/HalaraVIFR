import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import AuthLanding from "../../components/Landingtemp/AuthLanding";
import chevron_left from "../../assets/images/chevron_left.png";
import eye from "../../assets/images/eye.png";
import google from "../../assets/images/google.png";
const SignInPhone = () => {
    const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();
  const [confirmObj, setConfirmObj] = useState("");
  const { createUser, googleSignIn, user, setUpRecaptcha } = UserAuth();
  const [otp, setOtp] = useState("");

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please Enter a valid Phone Number");
    try {
      const response = await setUpRecaptcha(`+91 ${number}`);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (error) {
      setError(error.message);
    }
    console.log(number);
  };

  const verifyotp = async () => {
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/profile");
    }
  }, [handleGoogleSubmit]);

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
          <form className="flex flex-col gap-8 w-full">
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Phone Number"
              className=" w-full outline-none border-b-2 p-2 placeholder:text-base placeholder:font-normal placeholder:leading-9 placeholder:tracking-widest text-base font-medium leading-9 tracking-wider"
            />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className=" w-full outline-none border-b-2 p-2 placeholder:text-base placeholder:font-normal placeholder:leading-9 placeholder:tracking-widest"
            />
           
            <Link to={"/signin"} className="text-xs font-normal leading-9 tracking-wider text-[#4E51BF]">Login with email & password</Link>
            <p className="text-center text-[red]">{error}</p>
            <div id="recaptcha-container"></div>
            <button onClick={getOtp}>Generate otp</button>
            <button
              className="w-full px-6 py-3 flex justify-center items-center bg-[#4E51BF] rounded-3xl text-[#fff] montserrat text-base not-italic leading-4 tracking-widest "
              onClick={verifyotp}
            >
              SignUp
            </button>
          </form>
          <div className="text-[#0a0a0a] text-base not-italic font-medium leading-9">
            Or
          </div>
           
          <button
            className="flex justify-center items-center gap-2 w-46 h-9 text-sm font-light leading-9 tracking-wide"
            onClick={handleGoogleSubmit}
          >
            <img src={google} alt="" className="w-6 h-7 shrink-0  " />
            Signup with Google
          </button>

          <div className="text-[#909094] text-base not-italic font-medium leading-9 tracking-wider">
            Already have an account?{" "}
            <Link className="text-[#4E51BF]" to={"/signin"}>Log In</Link>
          </div>
        </div>

      </div>
    </div>
  
  );
};

export default SignInPhone
