import React from 'react'
import ReactDOM from 'react-dom'
import Editor from 'draft-js-plugins-editor';
import { List } from 'immutable';

import IssueEditor from './components/IssueEditor';

ReactDOM.render(
  <div className='root' style={{ textAlign: 'center', padding: '40px' }}>
    <h2>Issue Plugin Example for AutoComplete Plugin Creator</h2>
    <IssueEditor />
  </div>,
  document.getElementById('mount')
)
