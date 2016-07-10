import findWithRegex from 'find-with-regex';

const ISSUE_REGEX = /(\s|^)#[^\s]*/g;

export default (contentBlock, callback) => {
  findWithRegex(ISSUE_REGEX, contentBlock, callback);
};
