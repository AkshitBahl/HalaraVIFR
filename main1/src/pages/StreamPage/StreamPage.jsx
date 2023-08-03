import React, { useState } from "react";
import LiveStream from "./LiveStream";
import { Link, useParams } from "react-router-dom";
import AccountPage from "../AccountPage/AccountPage";
import headset from "../../assets/images/headset.png";
import "./StreamPage.css";
const StreamPage = () => {
  let { childid } = useParams();

  const [modal, setModal] = useState(false);
  const handleStream = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  return (
    <div className="flex w-full min-h-screen h-full">
      <AccountPage />
      <div className="w-full flex flex-col items-center">
        {/* <h1>Hi</h1>
        {childid}
        <Link to="/account">Dashboard</Link>
        <LiveStream childid={childid} /> */}
        <div className="flex w-10/12 border-2 h-60  mt-14 border-[#C0C1FF] bg-[#FAF9FD] items-center">
          <div className="w-7/12 flex flex-col justify-center gap-12 ml-9">
            <div className=" h-14 text-5xl font-normal leading-10 ">Connect your device</div>
            <div className="w-5/6  flex h-10 rounded-3xl border-2 border-[#4E51BF]">
              <input
                type="text"
                className="w-full outline-none  rounded-3xl montserrat placeholder:text-sm placeholder:font-medium font-medium placeholder:leading-3 leading-3 placeholder:text-[#5E5E62] px-6"
                placeholder="Enter the url displayed in your device screen"
              />
              <button onClick={handleStream} className=" flex justify-center items-center shrink-0 rounded-3xl bg-[#4E51BF] text-sm tracking-wide leading-5 text-[#FFF]   px-6">
                {" "}
                + Pair device
              </button>
            </div>
          </div>
          <div className="flex w-80 h-32 shrink-0">
            <img src={headset} alt="" className="w-full h-full"/>
          </div>
        </div>
      </div>
      {modal && <LiveStream handleStream ={handleStream} />}
    </div>
  );
};

export default StreamPage;
