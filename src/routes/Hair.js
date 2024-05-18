import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectHair = ({ handleHairSelection, handleNext, handlePrevious }) => {
  const hair = useSelector((state) => state.hair);
  const [selectedHair, setSelectedHair] = useState(localStorage.getItem("selectedHair") || "");

  const handleSelectHair = (hair) => {
    setSelectedHair(hair);
    localStorage.setItem("selectedHair", hair);
    handleHairSelection(hair);
  };

  const renderHair = () => {
    return hair.map((s, index) => (
      <Col key={index} xs={3} className="text-center mb-3 center-items">
        {/* <Col key={index} xs={4} className="text-center mb-3 center-items"> */}
        <div className={`hair ${selectedHair === s ? "selected" : ""}`} onClick={() => handleSelectHair(s)}>
          {s}
        </div>
      </Col>
    ));
  };

  return (
    <>
      <h3>제품을 바르셨나요?</h3>
      <Row className="text-center">{renderHair()}</Row>
      <Button onClick={() => handlePrevious("shampoo")}>이전</Button>
      <Button onClick={() => handleNext("wait")}>제출</Button>
    </>
  );
};

export default SelectHair;
