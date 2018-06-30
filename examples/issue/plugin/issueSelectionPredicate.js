// Checks that the cursor is after the 'autocomplete' character but still
// somewhere in the word (search term). Setting it to allow the cursor to be
// left of the 'autocomplete character' causes troubles due selection confusion.
const issueSelectionPredicate = ({ start, end, anchorOffset }) => (
  start === 0 && anchorOffset === 1 && anchorOffset <= end || // @ is the first character
  anchorOffset > start + 1 && anchorOffset <= end // @ is in the text or at the end
);

export default issueSelectionPredicate;
