import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { PiBookOpenTextFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "/assets/img/logo1.png";
import axios from "axios";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";
const SidebarLesson = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href = "/accounts/login";
  };
  return (
    <div>
      {!isMobile && (
        <div
          style={{
            background: "#E7E7E7",
            height: "100vh",
            position: "sticky",
            top: 0,
            padding: "1rem 0 ",
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
          }}
        >
          <NavLink to={"/"}>
            <img src={logo} alt="logo" />
          </NavLink>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/"}>
                <abbr title="Home" style={{ pointerEvents: "none" }}>
                  <FaHome style={{ fontSize: "26px", color: "#524C42" }} />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/courses"}>
                <abbr title="Courses" style={{ pointerEvents: "none" }}>
                  <PiBookOpenTextFill
                    style={{ fontSize: "26px", color: "#524C42" }}
                  />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/account/profile"}>
                <abbr title="Profile" style={{ pointerEvents: "none" }}>
                  <FaCircleUser
                    style={{ fontSize: "26px", color: "#524C42" }}
                  />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink onClick={LogoutHandler}>
                <abbr title="Logout" style={{ pointerEvents: "none" }}>
                  <MdLogout style={{ fontSize: "26px", color: "#524C42" }} />
                </abbr>
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: "#FFFFFF",
              padding: "10px 20px",
              justifyContent: "space-between",
            }}
          >
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/"}>
                <abbr title="Home" style={{ pointerEvents: "none" }}>
                  <FaHome style={{ fontSize: "26px", color: "#524C42" }} />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/courses"}>
                <abbr title="Courses" style={{ pointerEvents: "none" }}>
                  <PiBookOpenTextFill
                    style={{ fontSize: "26px", color: "#524C42" }}
                  />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/account/profile"}>
                <abbr title="Profile" style={{ pointerEvents: "none" }}>
                  <FaCircleUser
                    style={{ fontSize: "26px", color: "#524C42" }}
                  />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink onClick={LogoutHandler}>
                <abbr title="Logout" style={{ pointerEvents: "none" }}>
                  <MdLogout style={{ fontSize: "26px", color: "#524C42" }} />
                </abbr>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarLesson;
