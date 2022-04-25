import React from "react";
import "./Button.styles.css";

const Buttons = ({ title, onClick }) => {
  return (
    <>
      <button className="button" onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default Buttons;
