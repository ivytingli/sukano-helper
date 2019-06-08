import React from "react";

const numberGridStyle = {
  float: "left",
  margin: "0",
  padding: "0",
  height: "12px",
  width: "12px",
  fontSize: "8pt"
};

const displayNumber = (value, arr) => {
  let display;
  arr && arr.includes(value) ? (display = value) : (display = " ");
  return display;
};

const InputBox = props => {
  return (
    <span>
      <span className="input-box input-box-pos">
        <div style={numberGridStyle}>{displayNumber(1, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(2, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(3, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(4, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(5, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(6, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(7, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(8, props.candidates)}</div>
        <div style={numberGridStyle}>{displayNumber(9, props.candidates)}</div>
      </span>
      <input
        className="input-box input-cursor"
        onKeyDown={props.handleKeyPress}
      />
    </span>
  );
};

export default InputBox;
