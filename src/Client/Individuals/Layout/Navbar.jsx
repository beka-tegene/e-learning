import { Box, Drawer, Menu, MenuItem, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import logo from "/assets/img/logo1.png";
import { MdAccountCircle, MdArrowDropDown } from "react-icons/md";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const Navbar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const openMenu2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const individualsAll =
    useMatch("/find/instructor") ||
    useMatch("/find/tutor") ||
    useMatch("/find/instructor/:id") ||
    useMatch("/find/tutor/:id");
  const individuals = useMatch("/");
  const courses = useMatch("/courses") || useMatch("/CourseDetail/:slug");
  const instructor = useMatch("/instructor");
  const aboutus = useMatch("/aboutus");
  const contactpage = useMatch("/contactpage");
  const profile = useMatch("/account/profile");

  const token = Cookies.get("token");
  let name;
  let role;
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      name = decodedToken?.fullname;
      role = decodedToken?.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href = "/accounts/login";
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (role === "user") {
      navigate("/account/profile");
    } else {
      navigate("/comingsoon");
    }
  };
  return (
    <header>
      <div className="header__area">
        <div className="header__top header__border d-none d-md-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-6 col-xl-8 col-lg-8 col-md-8">
                <div className="header__info">
                  <ul>
                    <li
                      style={{
                        borderBottom:
                          individualsAll ||
                          individuals ||
                          courses ||
                          instructor ||
                          aboutus ||
                          contactpage ||
                          profile
                            ? "2px solid black"
                            : "",
                      }}
                    >
                      <NavLink to={"/"}>For Individuals</NavLink>
                    </li>
                    {!token && (
                      <>
                        <li>
                          <NavLink to={"/business"}>For Businesses</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/university"}>For Universities</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/government"}>For Government</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/school"}>For School</NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-4">
                {!token ? (
                  <div className="header__top-right d-flex justify-content-end align-items-center gap-2">
                    <div className="header__login">
                      <NavLink to={"/accounts/login"}>
                        <svg
                          viewBox="0 0 12 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.99995 6.83333C7.61078 6.83333 8.91662 5.5275 8.91662 3.91667C8.91662 2.30584 7.61078 1 5.99995 1C4.38912 1 3.08328 2.30584 3.08328 3.91667C3.08328 5.5275 4.38912 6.83333 5.99995 6.83333Z"
                            stroke="#031220"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.0108 12.6667C11.0108 10.4092 8.76497 8.58333 5.99997 8.58333C3.23497 8.58333 0.989136 10.4092 0.989136 12.6667"
                            stroke="#031220"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Login
                      </NavLink>
                    </div>
                    <div className="header__signup header__btn ml-20">
                      <NavLink
                        to={""}
                        className="header-btn"
                        onClick={handleOpen3}
                      >
                        Sign up
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className="header__top-right d-flex justify-content-end align-items-center">
                    <div
                      style={{ cursor: "pointer", textTransform: "capitalize" }}
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MdAccountCircle className="fs-4 m-2" />
                      {name}
                      <MdArrowDropDown className="fs-4 m-2" />
                    </div>
                  </div>
                )}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleNavigate();
                      handleClose();
                    }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      LogoutHandler();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
          <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-md-none">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" style={{ width: 150 }}>
                  <img src={logo} alt="logo" />
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target=""
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span
                    className="navbar-toggler-icon"
                    onClick={() => setOpen(false)}
                  />
                </button>
                <div className=" navbar-collapse" id="">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/courses">
                        Courses
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/find/instructor">
                        Instructors
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/aboutus">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contactpage">
                        Contact
                      </NavLink>
                    </li>
                    <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-4">
                      {!token ? (
                        <div className="header__top-right d-flex justify-content-start align-items-center my-2 gap-2">
                          <div className="header__login ">
                            <NavLink to={"/accounts/login"}>
                              <svg
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.99995 6.83333C7.61078 6.83333 8.91662 5.5275 8.91662 3.91667C8.91662 2.30584 7.61078 1 5.99995 1C4.38912 1 3.08328 2.30584 3.08328 3.91667C3.08328 5.5275 4.38912 6.83333 5.99995 6.83333Z"
                                  stroke="#031220"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.0108 12.6667C11.0108 10.4092 8.76497 8.58333 5.99997 8.58333C3.23497 8.58333 0.989136 10.4092 0.989136 12.6667"
                                  stroke="#031220"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>{" "}
                              Login
                            </NavLink>
                          </div>
                          <div className="header__signup header__btn ">
                            <NavLink
                              to={""}
                              className="header-btn"
                              onClick={handleOpen3}
                            >
                              Sign up
                            </NavLink>
                          </div>
                        </div>
                      ) : (
                        <div className="header__top-right d-flex justify-content-end align-items-center">
                          <div
                            style={{
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                            id="basic-button2"
                            aria-controls={open ? "basic-menu2" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick2}
                          >
                            <MdAccountCircle className="fs-4 m-2" />
                            {name}
                            <MdArrowDropDown className="fs-4 m-2" />
                          </div>
                        </div>
                      )}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={openMenu2}
                        onClose={handleClose2}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            handleNavigate();
                            handleClose2();
                          }}
                        >
                          My account
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose2();
                            LogoutHandler();
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                    <div className="tg-button-wrap">
                      <a className="btn tg-svg" href="/find/tutor">
                        <span className="text">All Tutors</span>
                      </a>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
          </Drawer>
        </div>
        <div className="header__bottom" id="header-sticky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-6">
                <div className="logo">
                  <NavLink to="/">
                    <img src={logo} alt="logo" />
                  </NavLink>
                </div>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-8 d-none d-lg-block">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          style={{
                            color: individuals ? "#589516" : "",
                            fontWeight: individuals ? "bold" : "",
                          }}
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/courses"
                          style={{
                            color: courses ? "#589516" : "",
                            fontWeight: courses ? "bold" : "",
                          }}
                        >
                          All Courses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          Instructors <MdArrowDropDown />
                        </NavLink>
                        <ul className="submenu">
                          {!token && (
                            <li className="drop">
                              <NavLink to={"/accounts/tutor"}>
                                Become tutor
                              </NavLink>
                            </li>
                          )}
                          <li>
                            <NavLink to="/find/instructor">
                              All Instructor
                            </NavLink>
                          </li>
                          <li className="drop">
                            <NavLink to={"/find/tutor"}>All tutor</NavLink>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <NavLink
                          to="/aboutus"
                          style={{
                            color: aboutus ? "#589516" : "",
                            fontWeight: aboutus ? "bold" : "",
                          }}
                        >
                          About
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/contactpage"
                          style={{
                            color: contactpage ? "#589516" : "",
                            fontWeight: contactpage ? "bold" : "",
                          }}
                        >
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-2 col-md-6 col-6">
                <div className="header__bottom-right d-flex justify-content-end align-items-center pl-30">
                  {!token && (
                    <div className="header__search w-fit d-none d-xl-block">
                      <NavLink
                        className="tg-button-wrap btn tg-svg"
                        to={"/accounts/instructor"}
                      >
                        <span className="text">Become instructor</span>
                      </NavLink>
                    </div>
                  )}
                  <div className="header__hamburger ml-50 d-xl-none">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#offcanvasmodal"
                      className="hamurger-btn"
                      onClick={toggleDrawer(true)}
                    >
                      <span />
                      <span />
                      <span />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Register as
          </h3>
          <div className="row row-cols-1 row-cols-md-4 g-1">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
              <NavLink
                to={"/accounts/student"}
                style={{
                  border: "1px solid",
                  padding: "1rem",
                  backgroundColor: "#D7A022",
                  color: "white",
                  fontSize: "20px",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Student
              </NavLink>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12 ">
              <NavLink
                to={"/accounts/instructor"}
                style={{
                  border: "1px solid",
                  padding: "1rem",
                  backgroundColor: "#D7A022",
                  color: "white",
                  fontSize: "20px",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Instructor
              </NavLink>
            </div>

            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
              <NavLink
                to={"/accounts/tutor"}
                style={{
                  border: "1px solid",
                  padding: "1rem",
                  backgroundColor: "#D7A022",
                  color: "white",
                  fontSize: "20px",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Tutors
              </NavLink>
            </div>
          </div>
        </Box>
      </Modal>
    </header>
  );
};

export default Navbar;
