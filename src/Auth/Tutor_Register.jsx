import React, { useState } from "react";
import logo from "/assets/img/logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CircularProgress } from "@mui/material";
import { back_base_url } from "../util/config";
import { NavLink, useNavigate } from "react-router-dom";

const Tutor_Register = () => {
  const navigate = useNavigate()
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
    Gender: "",
    Exprience: "",
    Location: "",
    confirmPassword: "",
    userName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [instructorLicense, setInstructorLicense] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (name === "idCard") setIdCard(files[0]);
      if (name === "instructorLicense") setInstructorLicense(files[0]);
      if (name === "coverPhoto") setCoverPhoto(files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoadingLogin(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("idCard", idCard);
    formDataToSend.append("instructorLicense", instructorLicense);
    formDataToSend.append("images", coverPhoto);

    fetch(`${back_base_url}api/v1/auth/registertutinsructor`, {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          console.log(data);
          setInterval(() => {
            navigate("/accounts/login");
          }, 2000);
          setFormData({
            fullname: "",
            phoneNumber: "",
            email: "",
            password: "",
            Gender: "",
            Exprience: "",
            Location: "",
            confirmPassword: "",
            userName: "",
          });
          setCoverPhoto(null);
          setIdCard(null);
          setInstructorLicense(null);
        } else {
          toast.error(data.error);
          toast.error(data.message);
        }
        setLoadingLogin(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error submitting form. Please try again later.");
        setLoadingLogin(false);
      });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.fullname ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.Gender ||
      !formData.Exprience ||
      !formData.Location ||
      !formData.confirmPassword ||
      !formData.userName
    ) {
      toast.error("Please fill in all required fields");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    } else if (!/\d/.test(formData.password)) {
      toast.error("Password must contain at least one digit");
      return false;
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      toast.error("Password must contain at least one letter");
      return false;
    }
    return true;
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ background: "#F1F1F1", minHeight: "100vh", padding: "1rem" }}
    >
      <ToastContainer />
      <div
        className="d-flex flex-column align-items-center justify-content-start gap-2"
        style={{ width: "500px" }}
      >
        <NavLink className="col" style={{ cursor: "pointer" }} to={"/"}>
          <img src={logo} alt="logo" style={{ width: "200px" }} />
        </NavLink>
        <div
          className="col bg-white p-3 rounded d-flex flex-column align-items-center gap-2"
          style={{ width: "100%" }}
        >
          <h3 className="text-3xl font-bold">SIGN UP</h3>
          <p>
            Great to have you back! This is the tutor instructor registration
            form.
          </p>
          <form
            className="d-flex flex-column gap-2 w-100"
            onSubmit={handleSubmit}
          >
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div className="d-flex flex-column gap-1" style={{ width: "100%" }}>
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-control"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex flex-column gap-1" style={{ width: "100%" }}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div className="d-flex flex-column gap-1 w-100">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex flex-column gap-1 w-100">
                <label htmlFor="Location">Address</label>
                <input
                  type="text"
                  id="Location"
                  name="Location"
                  className="form-control"
                  value={formData.Location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div className="d-flex flex-column gap-1 w-100">
                <label htmlFor="Gender">Gender</label>
                <select
                  name="Gender"
                  id="Gender"
                  className="form-control"
                  value={formData.Gender}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="d-flex flex-column gap-1 w-100">
                <label htmlFor="Exprience">Experience</label>
                <select
                  id="Exprience"
                  name="Exprience"
                  className="form-control"
                  value={formData.Exprience}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Experience
                  </option>
                  <option value="0">0 Year</option>
                  <option value="1+">1+ Year</option>
                  <option value="2+">2+ Year</option>
                  <option value="3+">3+ Year</option>
                  <option value="4+">4+ Year</option>
                  <option value="5+">5+ Year</option>
                </select>
              </div>
            </div>
            <input
              type="file"
              id="coverPhoto"
              name="coverPhoto"
              className="form-control"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div
              style={{
                height: "30vh",
                width: "50%",
                background: "#FFFFFF",
                padding: "15px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                border: `2px dotted ${coverPhoto ? "#90CDF4" : "#E2E8F0"}`,
              }}
            >
              {coverPhoto ? (
                <>
                  <label
                    htmlFor="coverPhoto"
                    style={{
                      color: "#90CDF4",
                      fontWeight: "bold",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Change Profile Photo
                  </label>
                  <img
                    src={URL.createObjectURL(coverPhoto)}
                    alt="Cover Photo Preview"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      borderRadius: "6px",
                    }}
                  />
                </>
              ) : (
                <label
                  htmlFor="coverPhoto"
                  style={{
                    background: "#90CDF4",
                    padding: "6px 25px",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Upload Profile Photo
                </label>
              )}
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="instructorLicense">Upload 1 min Video introduction</label>
              <input
                type="file"
                id="instructorLicense"
                name="instructorLicense"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="idCard">Id Card</label>
              <input
                type="file"
                id="idCard"
                name="idCard"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="userName">Bio</label>
              <textarea
                name="userName"
                id="userName"
                rows={4}
                className="form-control"
                value={formData.userName}
                onChange={handleInputChange}
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div
                className="d-flex flex-column gap-2"
                style={{ width: "100%" }}
              >
                <label htmlFor="password">Password</label>
                <div className="password-input-container form-control">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    style={{ border: "none" }}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </div>
              <div
                className="d-flex flex-column gap-2"
                style={{ width: "100%" }}
              >
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-container form-control">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    style={{ border: "none" }}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle-btn"
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p style={{ padding: "10px 1rem", fontSize: "14px" }}>
              For this service 15%.
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingLogin}
            >
              {loadingLogin ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <NavLink to="/accounts/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tutor_Register;
