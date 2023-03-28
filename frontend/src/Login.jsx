import React, { useContext, useState } from "react";
import { context_Auth } from "./Api/AuthContext";

function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(context_Auth);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const authLogin = (e) => {
    e.preventDefault();
    login(form);
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
        type="password"
        name="password"
        placeholder="please enter password"
        onChange={handleChange}
      />
      <button onClick={authLogin}>Login</button>
    </div>
  );
}

export default Login;
