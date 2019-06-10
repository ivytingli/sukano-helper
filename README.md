http://sukano-helper.herokuapp.com 

### Sukano Helper
This is a helper for playing Sukano, a puzzle game that combines aspects from Sudoku, Kakuro, and Nonogram. 
To learn more about how to play Sukano, [click here](http://sukano-puzzles.com/rules). 
Note: this helper currently only works on desktop.

#### How to use the helper

Enter candidates into the box. Press the + button to confirm the box and reveal the input for the next box. After clicking the + button, you will no longer be able to edit the submitted box. When you submit a box, the possible valid combinations of all the submitted boxes will be calculated and shown. 

Valid combinations are combinations that do not contain duplicate values (i.e. a combination with two 3s is not valid). 

If none of the resulting combinations include a specific candidate in the box, the candidate will disappear from the input box. An example of this is if in box 1, the entered candidates are `[2, 3]` and box 2, the entered candidate is `[2]`, the 2 in box 1 will be eliminated.

#### Using the filter

A filter can be either a sum (sum of two or more numbers) or a single number. To add a filter, simply choose either sum or number from the dropdown and enter the number value, then press the "Add Filter" button. Filters will be applied in order. Filters will not be executed until you press the "Eliminate using filters" button.

For instance, entering a filter for a sum of 10 and then a number for 9 will eliminate combinations that do not meet the requirements of the first condition such as `[1, 2, 8]`, as well as combinations that do not meet the consequent filters `[2, 8, 5]`. Examples of a valid combination is `[3, 7, 9]` because 3 + 7 satisfies the first filter condition of a "sum of 10" and the following 9 satisfies the second filter condition of a "number 9". 

Note: for sums, if a combination is less than the sum filter value, it will be included as a valid combination. For a sum filter of 10, if the combination is `[1, 2, 3]` it will not be eliminated. 
