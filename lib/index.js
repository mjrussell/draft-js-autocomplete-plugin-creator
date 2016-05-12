'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSuggestionsFilter = undefined;

var _CompletionSuggestions = require('./CompletionSuggestions');

var _CompletionSuggestions2 = _interopRequireDefault(_CompletionSuggestions);

var _CompletionSuggestionsPortal = require('./CompletionSuggestionsPortal');

var _CompletionSuggestionsPortal2 = _interopRequireDefault(_CompletionSuggestionsPortal);

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _immutable = require('immutable');

var _defaultSuggestionsFilter = require('./utils/defaultSuggestionsFilter');

var _defaultSuggestionsFilter2 = _interopRequireDefault(_defaultSuggestionsFilter);

var _positionSuggestions = require('./utils/positionSuggestions');

var _positionSuggestions2 = _interopRequireDefault(_positionSuggestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createCompletionPlugin = function createCompletionPlugin(completionSuggestionsStrategy, addModifier, SuggestionEntry) {
  var suggestionsThemeKey = arguments.length <= 3 || arguments[3] === undefined ? 'completionSuggestions' : arguments[3];
  var additionalDecorators = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
  return function () {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var callbacks = {
      keyBindingFn: undefined,
      handleKeyCommand: undefined,
      onDownArrow: undefined,
      onUpArrow: undefined,
      onTab: undefined,
      onEscape: undefined,
      handleReturn: undefined,
      onChange: undefined
    };

    var ariaProps = {
      ariaHasPopup: 'false',
      ariaExpanded: 'false',
      ariaOwneeID: undefined,
      ariaActiveDescendantID: undefined
    };

    var searches = (0, _immutable.Map)();
    var escapedSearch = undefined;
    var clientRectFunctions = (0, _immutable.Map)();

    var store = {
      getEditorState: undefined,
      setEditorState: undefined,
      getPortalClientRect: function getPortalClientRect(offsetKey) {
        return clientRectFunctions.get(offsetKey)();
      },
      getAllSearches: function getAllSearches() {
        return searches;
      },
      isEscaped: function isEscaped(offsetKey) {
        return escapedSearch === offsetKey;
      },
      escapeSearch: function escapeSearch(offsetKey) {
        escapedSearch = offsetKey;
      },

      resetEscapedSearch: function resetEscapedSearch() {
        escapedSearch = undefined;
      },

      register: function register(offsetKey) {
        searches = searches.set(offsetKey, offsetKey);
      },

      updatePortalClientRect: function updatePortalClientRect(offsetKey, func) {
        clientRectFunctions = clientRectFunctions.set(offsetKey, func);
      },

      unregister: function unregister(offsetKey) {
        searches = searches.delete(offsetKey);
        clientRectFunctions = clientRectFunctions.delete(offsetKey);
      }
    };

    var _config$theme = config.theme;
    var theme = _config$theme === undefined ? {} : _config$theme;
    var _config$positionSugge = config.positionSuggestions;
    var positionSuggestions = _config$positionSugge === undefined ? _positionSuggestions2.default : _config$positionSugge;

    var completionSearchProps = {
      ariaProps: ariaProps,
      callbacks: callbacks,
      theme: theme,
      store: store,
      entityMutability: config.entityMutability ? config.entityMutability : 'SEGMENTED',
      positionSuggestions: positionSuggestions
    };
    var CompletionSuggestions = (0, _CompletionSuggestions2.default)(addModifier, SuggestionEntry, suggestionsThemeKey);
    return {
      CompletionSuggestions: (0, _decorateComponentWithProps2.default)(CompletionSuggestions, completionSearchProps),
      decorators: [{
        strategy: completionSuggestionsStrategy,
        component: (0, _decorateComponentWithProps2.default)(_CompletionSuggestionsPortal2.default, { store: store })
      }].concat(_toConsumableArray(additionalDecorators)),
      getAccessibilityProps: function getAccessibilityProps() {
        return {
          role: 'combobox',
          ariaAutoComplete: 'list',
          ariaHasPopup: ariaProps.ariaHasPopup,
          ariaExpanded: ariaProps.ariaExpanded,
          ariaActiveDescendantID: ariaProps.ariaActiveDescendantID,
          ariaOwneeID: ariaProps.ariaOwneeID
        };
      },

      initialize: function initialize(_ref) {
        var getEditorState = _ref.getEditorState;
        var setEditorState = _ref.setEditorState;

        store.getEditorState = getEditorState;
        store.setEditorState = setEditorState;
      },

      onDownArrow: function onDownArrow(keyboardEvent) {
        return callbacks.onDownArrow && callbacks.onDownArrow(keyboardEvent);
      },
      onTab: function onTab(keyboardEvent) {
        return callbacks.onTab && callbacks.onTab(keyboardEvent);
      },
      onUpArrow: function onUpArrow(keyboardEvent) {
        return callbacks.onUpArrow && callbacks.onUpArrow(keyboardEvent);
      },
      onEscape: function onEscape(keyboardEvent) {
        return callbacks.onEscape && callbacks.onEscape(keyboardEvent);
      },
      handleReturn: function handleReturn(keyboardEvent) {
        return callbacks.handleReturn && callbacks.handleReturn(keyboardEvent);
      },
      onChange: function onChange(editorState) {
        if (callbacks.onChange) return callbacks.onChange(editorState);
        return editorState;
      }
    };
  };
};

exports.default = createCompletionPlugin;
var defaultSuggestionsFilter = exports.defaultSuggestionsFilter = _defaultSuggestionsFilter2.default;