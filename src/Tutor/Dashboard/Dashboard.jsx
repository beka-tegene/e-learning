import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { back_base_url } from "../../util/config";
import { toast } from "react-toastify";
const Dashboard = () => {
  const token = Cookies.get("token");
  const [tutor, setTutor] = useState();
  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/users/getuserById/${decodedToken?.userId}`
        );
        setTutor(res.data);
      } catch (error) {
        // toast.error("something went wrong");
      }
    };
    fetchData();
  }, [token]);
  return (
    <div style={{ background: "#F7F7F7", height: "87vh", overflowX: "scroll" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          <h1>{tutor?.userWhoHasEnrolled?.length}+</h1>
          <span>Classes</span>
        </div>
        <div
          style={{
            background: "#FFFFFF",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          <h1>
            {Math.floor(tutor?.calculatedTotalAmountEarned)}
            <span style={{ fontSize: "12px" }}>ETB</span>
          </h1>
          <span>Balance</span>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
