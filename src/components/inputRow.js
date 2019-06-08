import React from "react";
import InputBox from "./inputBox";

const InputRow = props => {
  return (
    <div>
      {props.candidates.map((box, ind) => {
        return (
          <InputBox
            key={ind}
            candidates={box}
            handleKeyPress={e => props.handleKeyPress(e, ind)}
            canFocus={ind === props.candidates.length - 1 ? "1" : ""}
          />
        );
      })}
      <button onClick={props.handleNextBox}>+</button>
      <button onClick={props.resetCandidates}>Reset candidates</button>
    </div>
  );
};

export default InputRow;
