import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { List, fromJS } from 'immutable';

import createIssueSuggestionPlugin, { defaultSuggestionsFilter } from '../plugin';
import './IssueEditor.scss';
import './Draft.scss';

const issueSuggestionPlugin = createIssueSuggestionPlugin();
const { CompletionSuggestions } = issueSuggestionPlugin;
const plugins = [issueSuggestionPlugin];

const suggestions = fromJS([
  {
    id: 1,
    subject: 'New Cool Feature',
  },
  {
    id: 2,
    subject: 'Bug',
  },
  {
    id: 3,
    subject: 'Improve Documentation',
  },
  {
    id: 11,
    subject: 'Upgrade Version',
  },
]);

export default class IssueEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: List(),
    };
  }

  onChange = (editorState) => this.setState({ editorState });

  onIssueSearchChange = ({ value }) => {
    const searchValue = value.substring(1, value.length);
    this.setState({
      suggestions: defaultSuggestionsFilter(searchValue, suggestions),
    });
  };

  focus = () => this.refs.editor.focus();

  render() {
    return (
      <div>
        <div className='editor' onClick={this.focus} >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            spellCheck
            stripPastedStyles
            placeholder='Enter some text, with a # to see the issue autocompletion'
            ref='editor'
          />
        </div>
        <CompletionSuggestions
          onSearchChange={this.onIssueSearchChange}
          suggestions={this.state.suggestions}
        />
      </div>
    );
  }
}
