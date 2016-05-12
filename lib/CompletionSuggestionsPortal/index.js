"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompletionSuggestionsPortal = function (_Component) {
  _inherits(CompletionSuggestionsPortal, _Component);

  function CompletionSuggestionsPortal() {
    _classCallCheck(this, CompletionSuggestionsPortal);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CompletionSuggestionsPortal).apply(this, arguments));
  }

  _createClass(CompletionSuggestionsPortal, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.store.register(this.props.offsetKey);
      this.updatePortalClientRect(this.props);

      // trigger a re-render so the MentionSuggestions becomes active
      this.props.setEditorState(this.props.getEditorState());
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.updatePortalClientRect(nextProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.store.unregister(this.props.offsetKey);
    }
  }, {
    key: "updatePortalClientRect",
    value: function updatePortalClientRect(props) {
      var _this2 = this;

      this.props.store.updatePortalClientRect(props.offsetKey, function () {
        return _this2.refs.searchPortal.getBoundingClientRect();
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "span",
        { className: this.key, ref: "searchPortal" },
        this.props.children
      );
    }
  }]);

  return CompletionSuggestionsPortal;
}(_react.Component);

exports.default = CompletionSuggestionsPortal;