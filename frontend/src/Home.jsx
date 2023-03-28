import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context_Auth } from "./Api/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { logout } = useContext(context_Auth);

  const handleClick = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h3> A private page</h3>

      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Home;
