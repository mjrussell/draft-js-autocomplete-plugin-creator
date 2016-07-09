import { Modifier, EditorState } from 'draft-js';

import getSearchText from './utils/getSearchText';

export default (editorState, issue) => {
  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState);

  // get selection of the issue search text
  const issueTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let issueReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    issueTextSelection,
    `#${issue.get('id')}`,
  );

  // If the issue is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  const blockKey = issueTextSelection.getAnchorKey();
  const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
  if (blockSize === end) {
    issueReplacedContent = Modifier.insertText(
      issueReplacedContent,
      issueReplacedContent.getSelectionAfter(),
      ' ',
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    issueReplacedContent,
    'insert-issue',
  );
  return EditorState.forceSelection(newEditorState, issueReplacedContent.getSelectionAfter());
};
