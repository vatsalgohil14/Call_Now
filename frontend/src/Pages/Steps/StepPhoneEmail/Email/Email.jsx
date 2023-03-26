import React from "react";
import {useState} from "react"

import Card from "../../../../Components/Shared/Card/Card";
import Button from "../../../../Components/Shared/Button/Button";
import styles from "../../StepPhoneEmail/StepEmail.module.css";
import TextInput from "../../../../Components/Shared/TextInput/TextInput";


const Email = ({onNext}) => {

   const [email, setEmail] = useState("");
  return (
    <Card title="Enter you email number" icon="email">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text={"Next"} onClick={onNext} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your Email, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
