import React from "react";
import styles from "./Card.module.css";
const Card = ({ title, icon, children }) => {
  const imageFont = {
    width: "50px",
  };
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        {icon &&<img src={`/images/${icon}.png`} alt="logo" style={imageFont} />}
        {title && <h1 className={styles.heading}>{title}</h1> }
      </div>

      {children}
    </div>

 
  );
};

export default Card;
