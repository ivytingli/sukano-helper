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
    console.log(newResults);
    this.setState({ results: newResults });
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
    if (candidates.length === 9) {
      return;
    } else {
      candidates.push([]);
      this.setState(candidates);
      this.calculateResults(
        this.state.results,
        candidates[candidates.length - 2]
      );
    }
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
              />
            );
          })}
          <button onClick={this.handleNextBox} style={{ float: "left" }}>
            +
          </button>
        </div>
        <div style={{ clear: "both" }}>
          <Output results={this.state.results} style={{ float: "none" }} />
        </div>
      </div>
    );
  }
}

export default InputRows;
