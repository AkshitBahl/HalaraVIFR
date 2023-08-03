import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/images/logo.png";
import Illustration from "../../assets/images/Illustration.png";
import video_camera_front from "../../assets/images/video_camera_front.png";
import school from "../../assets/images/school.png";
import person from "../../assets/images/person.png";
import eyeglasses from "../../assets/images/eyeglasses.png";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

const Sidebarr = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, []);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "240px",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "3rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-[#F4F5FE]  text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
              overflow-hidden md:relative fixed
           h-screen"
      >
        {open && (
          <div className="flex items-center gap-2.5 font-medium py-7 h-1/6 bg-[#F4F5FE] justify-center">
            <img src={logo} width={176} alt="" />
          </div>
        )}

        <div className="flex flex-col  h-full bg-[#F4F5FE] shrink-0">
          <ul className="whitespace-pre text-[0.9rem] py-5 flex flex-col gap-2 font-medium h-3/6">
            <li >
              <NavLink to={"/child/stream/:childid"} className="link">
                <div className="ml-4 gap-3 h-full flex items-center justify-center text-xl font-normal">
                  <img src={video_camera_front} className="min-w-max " />
                  Streams
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/child"} className="link">
                <div className="ml-4 gap-3 h-full flex items-center justify-center text-xl font-normal">
                  <img src={school} className="min-w-max" />
                  Students
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/devices"} className="link">
                <div className="ml-4 gap-3 h-full flex items-center justify-center text-xl font-normal">
                  <img src={eyeglasses} className="min-w-max" />
                  Devices
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/userprofile"} className="link">
                <div className="ml-4 gap-3 h-full flex items-center justify-center text-xl font-normal ">
                  <img src={person} className="min-w-max" />
                  Profile
                </div>
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <img src={Illustration} alt="" />
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebarr;
