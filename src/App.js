import React, { useEffect } from "react";
import Main from "./routes/Main";
import "./css/common.css";
import "./App.css";
import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoWhite from "./assets/logo_white.svg";
import { Routes, Route, useNavigate } from "react-router-dom";
import Step1 from "./routes/Step1";

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="App">
      <Main />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step" element={<Step1Page />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* 검은배경추가 */}
      <div className="black-box"></div>
      <div className="centered">
        <img src={LogoWhite} alt="Logo" className="logo" style={{ paddingBottom: "20px", width: "120%" }} />
        <Step1Button />
      </div>
    </>
  );
}

function Step1Button() {
  let navigate = useNavigate();

  return (
    <button
      className="active"
      onClick={() => {
        navigate("/step");
      }}
    >
      셀프 체크인
    </button>
  );
}

function Step1Page() {
  return (
    <>
      {/* 검은배경추가 */}
      <div className="black-gradient"></div>
      <Step1></Step1>
    </>
  );
}

export default App;
