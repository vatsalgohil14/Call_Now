import React from "react";
import { Link } from "react-router-dom";
// import styles from "./Navigation.module.css";

const Navigation = () => {
  const brandStyle = {
    // color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    marginTop:"10px"
  };

  const logoText = {
    marginLeft: "10px",
    fontSize:"20px"

  };

  const imageFont = {
    width:"50px"
  }

  return (
    <nav className='container mx-20 mt-7'>
      <Link style={brandStyle} to="/">
        <img src="/Images/loggo.png" alt="logo" style={imageFont} />
        <span style={logoText}>Kennected</span>
      </Link>
    </nav>
  );
};

export default Navigation;
