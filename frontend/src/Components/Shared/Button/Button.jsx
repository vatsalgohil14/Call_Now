import React from "react";
import styles from "./Button.module.css";
import { BiArrowFromLeft } from "react-icons/bi";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span >{text}</span>
      <BiArrowFromLeft className={styles.arrow}  />
    </button>
  );
};
export default Button;
