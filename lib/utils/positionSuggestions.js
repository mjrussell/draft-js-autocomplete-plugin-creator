'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var positionSuggestions = function positionSuggestions(_ref) {
  var decoratorRect = _ref.decoratorRect;
  var state = _ref.state;
  var props = _ref.props;

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  var width = void 0;
  var left = void 0;
  var transform = void 0;
  var transition = void 0;
  if (window.innerWidth <= 480) {
    left = '20px';
    width = window.innerWidth - 40 + 'px';
  } else {
    left = decoratorRect.left + scrollLeft + 'px';
  }

  if (state.isActive & props.suggestions.size > 0) {
    transform = 'scale(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scale(0)';
    transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
  }

  return {
    width: width,
    left: left,
    top: decoratorRect.top + scrollTop + 'px',
    transform: transform,
    transformOrigin: '1em 0%',
    transition: transition
  };
};

exports.default = positionSuggestions;