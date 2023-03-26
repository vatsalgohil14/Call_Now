import React from "react";
import { useState } from "react";
import Button from "../../../Components/Shared/Button/Button";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import Card from "../../../Components/Shared/Card/Card";
import {useDispatch, useSelector} from 'react-redux'
import { setName } from "../../../Store/activateSlice";
import styles from "./StepName.module.css";


const StepName = ({onNext}) => {

  const {name} = useSelector((state) =>state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name)

function onStep (){
  if(!fullname){
    return;
  }
  dispatch(setName(fullname));
  onNext();
}

  return (
    <Card title="What’s your full name?" icon="goggle-icon">
      <TextInput
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <p className={styles.paragraph}>
        People use real names at Konnect :) !
      </p>
      <div>
        <Button onClick={onStep} text="Next" />
      </div>
    </Card>
  );
};

export default StepName;
