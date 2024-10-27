import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdOutlineExplore } from "react-icons/md";
import { NavLink, useMatch } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { back_base_url } from "../../util/config";
import { toast } from "react-toastify";
import { SiGoogleclassroom } from "react-icons/si";
const Sidebar = () => {
  const dashboard = useMatch("/tutor/dashboard");
  const listCourse = useMatch("/tutor/list-course");
  const profile = useMatch("/tutor/profile");
  const token = Cookies.get("token");
  const [tutor, setTutor] = useState();
  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/class/getClassById/${decodedToken?.userId}`
        );
        setTutor(res.data);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    fetchData();
  }, [token]);
  const LogoutHandler = async () => {
    // try {
    //   axios.defaults.withCredentials = true;
    //   const token = Cookies.get("token");
    //   await axios.post(
    //     `${back_base_url}api/v1/auth/logout`,{},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   Cookies.remove("token");
    //   window.location.href = "/accounts/login";
    // } catch (error) {
    //   toast.error("something went wrong");
    // }
    Cookies.remove("token");
    window.location.href = "/accounts/login";
  };
  return (
    <div
      style={{
        background: "#FFFFFF",
        height: "87vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0 0",
      }}
    >
      <ul
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          listStyle: "none",
        }}
      >
        <NavLink
          style={{
            background: dashboard ? "#F1F5F9" : "",
            borderRadius: "10px",
          }}
          to={"/tutor/dashboard"}
        >
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MdOutlineExplore /> Dashboard
          </li>
        </NavLink>
        <NavLink
          style={{
            background: listCourse ? "#F1F5F9" : "",
            borderRadius: "10px",
          }}
          to={"/tutor/list-course"}
        >
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <SiGoogleclassroom /> Class
          </li>
        </NavLink>
        {/* <NavLink
          style={{
            background: "",
            borderRadius: "10px",
          }}
          to={`/kts/room/${tutor?.Roomid}`}
        >
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MdOutlineExplore /> Join Meeting
          </li>
        </NavLink> */}
        <NavLink
          style={{
            background: profile ? "#F1F5F9" : "",
            borderRadius: "10px",
          }}
          to={"/tutor/profile"}
        >
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MdAccountCircle />  My Account
          </li>
        </NavLink>
        <NavLink onClick={LogoutHandler}>
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <FiLogOut /> Logout
          </li>
        </NavLink>
      </ul>
      <div></div>
    </div>
  );
};

export default Sidebar;
