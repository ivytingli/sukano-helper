import React from "react";

const FilterInput = props => {
  return (
    <div>
      <select onChange={props.handleFilterType} value={props.currFilterType}>
        <option value="sum">sum</option>
        <option value="number">number</option>
      </select>
      <input
        type="number"
        value={props.currFilterValue}
        onChange={props.handleFilterValue}
      />
      <button onClick={props.handleAddFilter}>Add Filter</button>
    </div>
  );
};

export default FilterInput;
