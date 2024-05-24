import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import SelectDesigner from "./SelectDesigner";
import SelectTime from "./SelectTime";
import SelectStyle from "./SelectStyle";
import Name from "./InputName";
import Shampoo from "./Shampoo";
import Hair from "./Hair";
import CustomModal from "./CustomModal";
import styled from "styled-components";

const Step1 = () => {
  const navigate = useNavigate();
  const designers = useSelector((state) => state.designers);
  const [selectedComponent, setSelectedComponent] = useState("designer");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const handleGoHome = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDesignerSelection = (designer) => {
    // Do something with the selected designer
  };

  const handleTimeSelection = (time) => {
    // Do something with the selected time
    // localStorage.setItem("selectedTime", time);
  };

  const handleStyleSelection = (style) => {
    setSelectedComponent("style"); // 다음 버튼 클릭 시 선택된 컴포넌트를 SelectStyle으로 변경
  };

  const handleNameInput = () => {
    setSelectedComponent("name"); // 다음 버튼 클릭 시 선택된 컴포넌트를 SelectStyle으로 변경
  };

  const handleShampooSelection = () => {
    setSelectedComponent("shampoo");
  };

  const handleHairSelection = () => {
    setSelectedComponent("hair");
  };

  const handleNext = (component) => {
    setSelectedComponent(component); // 다음 버튼 클릭 시 선택된 컴포넌트를 변경
  };

  const handlePrevious = (component) => {
    setSelectedComponent(component); // 이전 버튼 클릭 시 선택된 컴포넌트를 SelectDesigner로 변경
  };

  useEffect(() => {
    if (selectedComponent === "wait") {
      setIsModalOpen(true);
      //알림톡
      // sendNotification("010-7484-2242", "예약 확인", "예약이 확인되었습니다.");
      const id = setTimeout(() => {
        setIsModalOpen(false);
        handleGoHome();
      }, 5000);
      // 타임아웃 ID를 상태로 저장합니다.
      setTimeoutId(id);
    }
    // selectedComponent가 변경될 때마다 useEffect를 재실행합니다.
  }, [selectedComponent]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearTimeout(timeoutId);
    handleGoHome();
  };

  const FontWrapper = styled.div`
    font-family: Pretendard, sans-serif;
  `;

  //   console.log(selectedComponent);
  return (
    <>
      <FontWrapper>
        <NavBar selectedComponent={selectedComponent} />
        <div className="container">
          <div className="row">
            <div className="col text-center mt-5">
              {selectedComponent === "designer" ? (
                <SelectDesigner designers={designers} handleDesignerSelection={handleDesignerSelection} handleGoHome={handleGoHome} handleNext={() => handleNext("time")} />
              ) : selectedComponent === "time" ? (
                <SelectTime handleTimeSelection={handleTimeSelection} handleGoHome={handleGoHome} handlePrevious={handlePrevious} handleNext={() => handleNext("style")} />
              ) : selectedComponent === "style" ? (
                <SelectStyle handleStyleSelection={handleStyleSelection} handlePrevious={handlePrevious} handleNext={() => handleNext("name")} />
              ) : selectedComponent === "name" ? (
                <Name handleNameInput={handleNameInput} handlePrevious={handlePrevious} handleNext={() => handleNext("shampoo")} />
              ) : selectedComponent === "shampoo" ? (
                <Shampoo handleShampooSelection={handleShampooSelection} handlePrevious={handlePrevious} handleNext={() => handleNext("hair")} />
              ) : (
                <Hair handleHairSelection={handleHairSelection} handlePrevious={handlePrevious} handleNext={() => handleNext("wait")} />
              )}
            </div>
          </div>
        </div>
        <CustomModal isOpen={isModalOpen} closeModal={handleCloseModal} timeoutId={timeoutId} />
      </FontWrapper>
    </>
  );
};

function NavBar({ selectedComponent }) {
  console.log(selectedComponent);
  return (
    <div className="top-navbar">
      <div className={`menu-item ${["designer", "time", "style", "name"].includes(selectedComponent) ? "active" : ""}`}>
        <Link>예약확인</Link>
      </div>
      <div className={`menu-item ${["shampoo", "hair"].includes(selectedComponent) ? "active" : ""}`}>
        <Link>모발체크</Link>
      </div>
      <div className={`menu-item ${["wait"].includes(selectedComponent) ? "active" : ""}`}>
        <Link>입장대기</Link>
      </div>
    </div>
  );
}

export default Step1;
