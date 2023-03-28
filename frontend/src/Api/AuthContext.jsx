import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../utils";

export const context_Auth = createContext();

export function AuthContext(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    setUser(userDetails);
  }, []);

  const register = async (data) => {
    // console.log(data);
    await http
      .post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = async (data) => {
    await http
      .post(
        "/auth/login",
        {
          username: data.username,
          password: data.password,
        },
        { credentials: "include", withCredentials: true }
      )
      .then((res) => {
        const user = res.data;
        navigate("/confirm", { state: user });
      });
  };

  const verify2FA = async (data, otp) => {
    await http
      .post(
        "/auth/verifyOTP",
        {
          data,
          otp,
        },
        { credentials: "include", withCredentials: true }
      )
      .then((res) => {
        const user = res.data;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
        // return Promise.reject(error);
      });
  };

  const logout = async () => {
    await http
      .get("/auth/logout", {
        credentials: "include",
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
    localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   const getToken = async () => {
  //     const { data } = await axios.get("http://localhost:8800/auth/token", {
  //       credentials: "include",
  //       withCredentials: true,
  //     });
  //     setToken(data);
  //   };

  //   getToken();
  // }, []);

  return (
    <context_Auth.Provider value={{ register, login, logout, user, verify2FA }}>
      {props.children}
    </context_Auth.Provider>
  );
}
