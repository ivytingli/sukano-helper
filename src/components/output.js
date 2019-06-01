import React from "react";

const Output = props => {
  return (
    <div>
      {props.results.map((result, ind) => (
        <table key={ind}>
          <tbody>
            <tr>
              {result.map((candidate, candInd) => (
                <td key={candInd}>{candidate}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Output;
