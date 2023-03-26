import React from "react";
import { useState } from "react";
import Card from "../../../Components/Shared/Card/Card";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import Button from "../../../Components/Shared/Button/Button";
import { verifyOtp } from "../../../http";
import styles from "./StepOtp.module.css"
import { useSelector } from "react-redux";
import {setAuth, useAuth} from "../../../Store/authSlice";
import { useDispatch } from "react-redux";


const StepOtp = ({onNext}) => {
const [otp, setOtp] = useState("");
const dispatch  = useDispatch();
const {phone,hash} = useSelector((state) => state.auth.otp)
  
async function submit() {
    try {
      if(!otp || !phone || !hash) return
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data);
      dispatch(setAuth(data));
      // onNext()
    } catch (err) {
      console.log(err)
    }
    //sending request to server
  }

  // onNext()


  
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
