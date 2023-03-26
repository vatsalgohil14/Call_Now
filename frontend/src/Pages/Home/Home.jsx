import React from "react";
import { Link , useHistory } from "react-router-dom";
import Button from "../../Components/Shared/Button/Button";
import Card from "../../Components/Shared/Card/Card";
import styles from "./Home.module.css";
import { motion } from "framer-motion";
const Home = () => {
  const imageFont = {
    width: "50px",
  };

  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
    
  };

  const history = useHistory();
  function  startRegistor(){
    history.push("/authenticate")
    console.log(`button clicked`)
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Kennect " icon="loggo">
        <p className={styles.text}>
          This is a great online platform where you can connect with your near
          and dear ones
        </p>

        <div className="">
          <Button onClick={startRegistor} text="Lets Go"></Button>
        </div>

        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          {/* <Link style={signInLinkStyle} to="/login">
            Sign in
          </Link> */}
        </div>
      </Card>
    </div>
  );
};

export default Home;
