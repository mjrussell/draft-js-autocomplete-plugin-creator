// Whether or not the cursor should be considered within the search term.
// Used to determine if the suggestions list should be shown or hidden.
const defaultSelectionPredicate = ({ start, end, anchorOffset }) => (
  anchorOffset >= start && anchorOffset <= end
);

export default defaultSelectionPredicate;
