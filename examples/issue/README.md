# Mention Suggestion Example using AutoComplete Plugin Creator

This example shows how to build a github issue style autocompletion plugin for draft-js-plugins

This plugin, unlike the Emoji or Mention plugin from draft-js-plugins doesn't create an Entity when the suggestion
is selected. Instead, it simply inserts `#` followed by the issue number in plaintext. This makes the suggestions show
up again if the cursor is over the issue number, just like Github Issues.

To view the example:

1. `npm install`
2. `npm start`
3. Browse to http://localhost:8080
