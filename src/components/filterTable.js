import React from "react";

const FilterTable = props => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Filter type</th>
            <th>Filter value</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.filters.map((filter, ind) => {
            return (
              <tr key={ind}>
                <td>{filter[0]}</td>
                <td>{filter[1]}</td>
                <td>
                  <button onClick={e => props.handleDelete(e, ind)}>x</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() =>
          props.handleEliminate(props.results, props.filters, props.candidates)
        }
      >
        Eliminate using filters
      </button>
    </div>
  );
};

export default FilterTable;
