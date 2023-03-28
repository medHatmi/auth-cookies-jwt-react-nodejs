import React, { useState, useContext } from "react";
import { context_Auth } from "./Api/AuthContext";

function Register() {
  const [form, setForm] = useState({});
  const { register } = useContext(context_Auth);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const authRegister = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="please enter username"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="please enter email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="please enter password"
        onChange={handleChange}
      />
      <button onClick={authRegister}>Register</button>
    </div>
  );
}

export default Register;
