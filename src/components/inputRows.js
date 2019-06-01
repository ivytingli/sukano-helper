import React from "react";
import InputBox from "./inputBox";
import Output from "./output";

class InputRows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: [[]],
      results: [[]]
    };
  }

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
    let candidates = this.state.candidates;
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

  reset = () => {
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
    //console.log(candidates);
    this.setState({ results, candidates });
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
          <button onClick={this.reset}>Reset</button>
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
