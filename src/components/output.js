import React from "react";

const calculateSum = (combo, boxInd) => {
  let comboSubset = [...combo].splice(0, boxInd + 1);
  return comboSubset.reduce((a, b) => a + b, 0, 0);
};

const Output = props => {
  const showDeleteButton = ind => {
    if (props.results[0].length !== 0) {
      return (
        <td>
          <button onClick={e => props.handleDelete(e, ind)}>x</button>
        </td>
      );
    }
  };

  return (
    <div>
      {props.results.map((result, ind) => (
        <table key={ind}>
          <tbody>
            <tr>
              {showDeleteButton(ind)}
              {result.map((candidate, candInd) => (
                <td key={candInd} style={{ width: "50px" }}>
                  {candidate} ({calculateSum(result, candInd)})
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Output;
