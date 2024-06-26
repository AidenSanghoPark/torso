import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");
// 모달 스타일을 정의합니다.
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white", // 텍스트 색상을 흰색으로 지정
  },
  text: {
    fontWeight: "bold", // 폰트를 더 두껍게 설정
  },
  button: {
    border: "3px solid white", // 버튼 테두리를 흰색으로 지정
    color: "white", // 버튼 텍스트 색상을 흰색으로 지정
    backgroundColor: "transparent", // 버튼 배경색을 투명으로 설정
    cursor: "pointer", // 마우스 포인터를 표시하여 클릭 가능하도록 함
    padding: "8px 20px", // 버튼 내부 여백 설정
    borderRadius: "4px", // 버튼 모서리를 둥글게 설정
    margin: "10px", // 버튼 간격 설정
  },
};

const CustomModal = ({ isOpen, closeModal, timeoutId }) => {
  const navigate = useNavigate();

  // 닫기 버튼 클릭 시 루트 URL로 이동하는 함수
  const handleCloseModal = () => {
    localStorage.clear();
    closeModal(); // 모달 닫기
    navigate("/"); // 루트 URL로 이동
    clearTimeout(timeoutId); // 타이머 취소
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2 style={customStyles.text}>
        체크인이 완료{<br />}
        {<br />}
      </h2>
      <h5 style={customStyles.text}>
        대기석에서 잠시 기다려 주세요{<br />}
        {<br />}
      </h5>
      <button onClick={handleCloseModal} style={customStyles.button}>
        닫기
      </button>
    </Modal>
  );
};

export default CustomModal;
