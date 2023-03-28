import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { Route, Routes } from "react-router";
import TwoFAVerify from "./TwoFAVerify";
import PrivateWrapper from "./routes/PrivateWrapper";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<TwoFAVerify />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
