import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import { setAuth } from "../../../Store/authSlice";
import Button from "../Button/Button";
// import styles from "./Navigation.module.css";

const Navigation = () => {
  const brandStyle = {
    // color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  };

  const logoText = {
    marginLeft: "10px",
    fontSize: "20px",
  };

  const imageFont = {
    width: "50px",
  };
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="container mx-20 mt-7 flex items-center justify-between">
      <Link style={brandStyle} to="/">
        <img src="/Images/loggo.png" alt="logo" style={imageFont} />
        <span style={logoText}>Kennect</span>
      </Link>
      {isAuth && <Button onClick={logoutUser}>Logout</Button>}
    </nav>
  );
};

export default Navigation;
