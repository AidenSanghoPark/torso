import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectStyle = ({ handleStyleSelection, handleNext, handlePrevious }) => {
  const style = useSelector((state) => state.style);
  const [selectedStyle, setSelectedStyle] = useState(localStorage.getItem("selectedStyle") || "");

  const handleSelectStyle = (style) => {
    setSelectedStyle(style);
    localStorage.setItem("selectedStyle", style);
    handleStyleSelection(style);
  };

  const renderStyle = () => {
    return style.map((s, index) => (
      // <Col key={index} xs={3} className="text-center mb-3 center-items">
      <Col key={index} xs={4} className="text-center mb-3 center-items">
        <div className={`style ${selectedStyle === s ? "selected" : ""}`} onClick={() => handleSelectStyle(s)}>
          {s}
        </div>
      </Col>
    ));
  };

  return (
    <>
      <h3>어떤 시술로 예약하셨나요?</h3>
      <Row className="text-center">{renderStyle()}</Row>
      <Button onClick={() => handlePrevious("time")}>이전</Button>
      <Button onClick={() => handleNext("name")}>다음</Button>
    </>
  );
};

export default SelectStyle;
