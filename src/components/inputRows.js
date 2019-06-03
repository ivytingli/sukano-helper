import React from "react";
import InputBox from "./inputBox";
import Output from "./output";
import FilterInput from "./filterInput";
import FilterTable from "./filterTable";

class InputRows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: [[]],
      results: [[]],
      filters: [],
      currFilterType: "sum",
      currFilterValue: ""
    };
  }

  // [2, 3, 4], 2 => {pass: true, rest: [3, 4]}
  singleNumberFilterLogic = (arr, value) => {
    let clonedArr = [...arr];
    let status = {};
    status.pass = clonedArr[0] === value;
    clonedArr.shift();
    status.rest = clonedArr;
    return status;
  };

  // [2, 3, 4], 11 => {pass: true, rest: []}
  // [2, 3, 4], 5 => {pass: true, rest: [4]}
  // [3, 5], 3 => {pass: false, rest: [5]}
  singleSumFilterLogic = (arr, value) => {
    let clonedArr = [...arr];
    let status = {};
    let acc = 0;
    for (let i = 0; i < arr.length; i++) {
      acc += arr[i];
      if (acc === value) {
        status.pass = i > 0;
        clonedArr.shift();
        status.rest = clonedArr;
        break;
      }
      if (acc > value) {
        status = { pass: false, rest: [] };
        break;
      } else {
        status.pass = true;
        clonedArr.shift();
        i === arr.length - 1 ? (status.rest = []) : (status.rest = clonedArr);
      }
    }
    return status;
  };

  // combo, filters => {pass: t/f, rest: array}
  handleSingleFilter = (combo, filter) => {
    let result;
    if (filter[0] === "sum") {
      result = this.singleSumFilterLogic(combo, filter[1]);
    } else {
      result = this.singleNumberFilterLogic(combo, filter[1]);
    }
    return result;
  };

  handleFilterForSingleCombo = (combo, filters) => {
    let result = { pass: true, rest: combo };
    for (let ind = 0; ind < filters.length; ind++) {
      if (!result.pass || result.rest.length === 0) {
        break;
      }
      result = this.handleSingleFilter(result.rest, filters[ind]);
    }
    return result.pass;
  };

  eliminateByFilter = (results, filters, candidates) => {
    let newResults = [];
    results.forEach(combo => {
      if (this.handleFilterForSingleCombo(combo, [...filters])) {
        newResults.push(combo);
      }
    });
    let newCandidates = this.updateCandidates(newResults, candidates.length);
    this.setState({ results: newResults, candidates: newCandidates });
  };

  handleFilterType = e => {
    this.setState({ currFilterType: e.target.value });
  };

  handleFilterValue = e => {
    this.setState({ currFilterValue: Number(e.target.value) });
  };

  handleAddFilter = e => {
    if (this.state.currFilterValue === "") {
      return;
    }
    let filters = [...this.state.filters];
    filters.push([this.state.currFilterType, this.state.currFilterValue]);
    this.setState({
      filters: filters,
      currFilterType: "sum",
      currFilterValue: ""
    });
  };

  // ex input: newResults = [[1, 3], [2, 3]], totalCand = 2, returns: [[1,2], [3]]
  updateCandidates = (newResults, totalCand) => {
    let updatedCandidates = [];
    for (let ind = 0; ind < totalCand; ind++) {
      let box = new Set(newResults.map(combo => combo[ind]));
      updatedCandidates.push(Array.from(box));
    }
    return updatedCandidates;
  };

  calculateResults = (currResults, candidates) => {
    let newResults = [];
    if (currResults.length === 0) {
      newResults = candidates.map(candidate => [candidate]);
    } else {
      currResults.forEach(combo => {
        let calculatedResult = this.calculateByBox(combo, candidates);
        newResults = newResults.concat(calculatedResult);
      });
    }
    return newResults;
  };

  calculateByBox = (combo, candidates) => {
    let results = [];
    candidates.forEach(candidate => {
      let value = Number(candidate);
      if (!combo.includes(value)) {
        let clonedCombo = [...combo];
        clonedCombo.push(value);
        results.push(clonedCombo);
      }
    });
    return results;
  };

  handleKeyPress = (event, id) => {
    let value = Number(event.key);
    let candidates = this.state.candidates;
    if (candidates[id] && candidates[id].includes(value)) {
      candidates[id] = candidates[id].filter(curr => curr !== value);
      this.setState({
        candidates: candidates
      });
    } else if (value && candidates[id]) {
      candidates[id].push(value);
      this.setState({ candidates: candidates });
    } else {
      return;
    }
  };

  handleNextBox = () => {
    let candidates = [...this.state.candidates];
    if (candidates[candidates.length - 1].length === 0) {
      return;
    }
    let calculatedResults = this.calculateResults(
      this.state.results,
      candidates[candidates.length - 1]
    );
    let newCandidates = this.updateCandidates(
      calculatedResults,
      candidates.length
    );
    if (candidates.length !== 9) {
      newCandidates.push([]);
    }
    this.setState({ candidates: newCandidates, results: calculatedResults });
  };

  resetCandidates = () => {
    this.setState({ candidates: [[]], results: [[]] });
  };

  handleRemoveRow = (e, ind) => {
    let results = [...this.state.results];
    results.splice(ind, 1);
    let candidates = this.updateCandidates(
      results,
      this.state.candidates.length - 1
    );
    candidates.push([]);
    this.setState({ results, candidates });
  };

  handleRemoveFilterRow = (e, ind) => {
    let filters = [...this.state.filters];
    filters.splice(ind, 1);
    this.setState({ filters });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.candidates.map((box, ind) => {
            return (
              <InputBox
                key={ind}
                candidates={box}
                handleKeyPress={e => this.handleKeyPress(e, ind)}
                canFocus={ind === this.state.candidates.length - 1 ? "1" : ""}
              />
            );
          })}
          <button onClick={this.handleNextBox}>+</button>
          <button onClick={this.resetCandidates}>Reset candidates</button>
        </div>
        <div style={{ clear: "both" }}>
          <FilterInput
            currFilterType={this.state.currFilterType}
            currFilterValue={this.state.currFilterValue}
            handleFilterType={this.handleFilterType}
            handleFilterValue={this.handleFilterValue}
            handleAddFilter={this.handleAddFilter}
          />
          <FilterTable
            filters={this.state.filters}
            handleDelete={this.handleRemoveFilterRow}
            candidates={this.state.candidates}
            results={this.state.results}
            handleEliminate={this.eliminateByFilter}
          />
        </div>
        <div style={{ clear: "both" }}>
          <Output
            results={this.state.results}
            style={{ float: "none" }}
            handleDelete={this.handleRemoveRow}
          />
        </div>
      </div>
    );
  }
}

export default InputRows;
