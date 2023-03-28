import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { context_Auth } from "./Api/AuthContext";

function TwoFAVerify() {
  const { verify2FA } = useContext(context_Auth);
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  // console.log(state);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    verify2FA(state, otp);
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="confirm auth" type="text" />
      <button onClick={handleClick}>Confirm</button>
    </div>
  );
}

export default TwoFAVerify;
