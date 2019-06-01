import React from "react";

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
