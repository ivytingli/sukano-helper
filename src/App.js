import React from "react";
import "./App.css";
import Helper from "./components/helper";

function App() {
  return (
    <div className="App">
      <h1>Sukano Helper</h1>
      <div>
        <p>
          This is a helper for playing{" "}
          <a href="http://sukano-puzzles.com">Sukano</a>, a puzzle game that
          combines aspects from Sudoku, Kakuro, and Nonogram. To learn more
          about how to play Sukano, click{" "}
          <a href="http://sukano-puzzles.com/rules">here</a>. Note: this helper
          only works on desktop.
        </p>
        <h4>How to use the helper</h4>
        <p>
          Enter candidates into the box. Press the + button to confirm the box
          and reveal the input for the next box. After clicking the + button,
          you will no longer be able to edit the submitted box. When you submit
          a box, the possible valid combinations of all the submitted boxes will
          be calculated and shown. If none of the resulting combinations include
          a specific candidate in the box, the candidate will disappear from the
          input box.
        </p>
        <h4>Using the filter</h4>
        <p>
          A filter can be either a sum (sum of two or more numbers) or a single
          number. To add a filter, simply choose either sum or number from the
          dropdown and enter the number value, then press the "Add Filter"
          button. Filters will be applied in order. For instance, entering a
          filter for a sum of 10 and then a number for 9 will eliminate
          combinations that do not meet the requirements of the first condition
          such as [1, 2, 8], as well as combinations that do not meet the
          consequent filters [2, 8, 5]. Examples of a valid combination is [3,
          7, 9] because 3+7 satisfies the first filter condition of a "sum of
          10" and the following 9 satisfies the second filter condition of a
          "number 9". Filters will not be executed until you press the
          "Eliminate using filters" button.
        </p>
      </div>
      <Helper />
    </div>
  );
}

export default App;
