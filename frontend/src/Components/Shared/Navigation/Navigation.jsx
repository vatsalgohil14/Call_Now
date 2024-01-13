import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../Store/authSlice";

const Navigation = () => {
  const brandStyle = {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };


  const logoText = {
    marginLeft: "10px",
    fontSize: "20px",
  };

  const imageFont = {
    width: "50px",
  };

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/loggo.png" alt="logo" style={imageFont} />
        <span style={logoText}>Konnect</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : "/images/male_boy.png"}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
