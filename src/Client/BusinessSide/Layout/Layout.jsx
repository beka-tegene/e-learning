import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <Navbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "0 6fr" : "1.5fr 6fr",
        }}
      >
        <Sidebar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
