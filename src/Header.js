// Header.js

import React from "react";
import PropTypes from "prop-types";
import "./css/Header.css";

function Header({ activePage, onPageChange, logo }) {
  console.log(activePage);
  return (
    <header className="Header">
      <div className="nav">
        <button className={activePage === "reservation" ? "active" : ""}>예약확인</button>
        <button className={activePage === "hairCheck" ? "active" : ""}>모발체크</button>
        <button className={activePage === "waitingList" ? "active" : ""}>입장대기</button>
      </div>
    </header>
  );
}

Header.propTypes = {
  activePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Header;
