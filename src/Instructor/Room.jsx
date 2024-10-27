import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { back_base_url } from "../util/config";

const Room = () => {
  const navigate = useNavigate();
  const { roomID } = useParams();

  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/account/login");
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwt_decode(token);
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/account/login");
      return;
    }

    const userId = decodedToken?.userId;

    const fetchData = async () => {
      try {
        const [userRes, statusRes] = await Promise.all([
          axios.get(`${back_base_url}api/v1/Instruct/${userId}`),
          axios.get(
            `${back_base_url}api/v1/Instruct/instructors/room/${roomID}/${userId}`
          ),
        ]);

        setUserData({ ...userRes.data, userId, name: decodedToken?.fullname });
        setStatus(statusRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [roomID, navigate]);

  useEffect(() => {
    const initializeMeeting = () => {
      if (!userData || !status || !containerRef.current) return;

      if (userData.Roomid === roomID || status.enrolled === true) {
        const appID = 946219318;
        const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          Date.now().toString(),
          userData.name
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
        });
      } else {
        navigate("/account/login");
      }
    };

    initializeMeeting();
  }, [userData, status, roomID, navigate]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "87vh", overflowY: "scroll" }}
    ></div>
  );
};

export default Room;
