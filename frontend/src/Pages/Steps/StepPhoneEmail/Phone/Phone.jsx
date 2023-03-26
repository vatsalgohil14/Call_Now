import React from "react";
import { useState } from "react";
import Card from "../../../../Components/Shared/Card/Card";
import Button from "../../../../Components/Shared/Button/Button";
import styles from "../../StepPhoneEmail/StepEmail.module.css";
import TextInput from "../../../../Components/Shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../Store/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    // server request
    if (!phoneNumber) {
      return;
    }
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data); // bass dikhane ke liye hash aur otp console mai
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }
  return (
    <Card title="Enter you phone number" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text={"Next"} onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
