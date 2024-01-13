import React, { useState, useEffect } from "react";
import Button from "../../../Components/Shared/Button/Button";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import Card from "../../../Components/Shared/Card/Card";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../Store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../Store/authSlice";
import Loader from "../../../Components/Shared/Loader/Loader";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("./Images/avatar-2.png");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
    console.log(e);
  }

  async function submit() {
    if (!name || !avatar) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      dispatch(setAuth(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   return () => {
  //     setUnMounted(true);
  //   };
  // }, []);

  if (loading) {
    return <Loader message={"Activation In Progress"} />;
  }
  return (
    <Card title={`Hi, ${name} Welcome to Konnect`} icon="hi-loggo">
      <p className={styles.subHeading}>How's this Avatar?</p>
      <div className={styles.avatarWrapper}>
        <img className={styles.avatarImage} src={image} alt="avatar" />
      </div>

      <div>
        <input
          onChange={captureImage}
          id="avatarInput"
          type="file"
          className={styles.avatarInput}
        />
        <label htmlFor="avatarInput" className={styles.avatarLabel}>
          Choose a different photo
        </label>
      </div>
      <div>
        <Button onClick={submit} text="Next" />
      </div>
    </Card>
  );
};

export default StepAvatar;
