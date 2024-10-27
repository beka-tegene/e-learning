import React from "react";
import Navbar from "../../../Client/Individuals/Layout/Navbar";
import Footer from "../../../Client/Individuals/Layout/Footer";
import AllCourses from "../../../Client/Individuals/Course/AllCouse";
import Header from "../../../Client/Individuals/Course/Header";

const Course = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <AllCourses />
      <Footer />
    </div>
  );
};

export default Course;
