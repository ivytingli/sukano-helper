import React from "react";

const Output = props => {
  return (
    <div>
      {props.results.map((result, ind) => (
        <table key={ind}>
          <tr>
            {result.map(candidate => (
              <td>{candidate}</td>
            ))}
          </tr>
        </table>
      ))}
    </div>
  );
};

export default Output;
