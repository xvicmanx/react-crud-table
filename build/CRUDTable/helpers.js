"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryValue = exports.toggleDirection = exports.chevron = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chevron = exports.chevron = function chevron(direction) {
  return direction === _constants.SORT_DIRECTIONS.ASCENDING ? _react2.default.createElement(
    "span",
    null,
    "\u25B2"
  ) : _react2.default.createElement(
    "span",
    null,
    "\u25BC"
  );
};

var toggleDirection = exports.toggleDirection = function toggleDirection(direction, toggle) {
  if (toggle) {
    switch (direction) {
      case "ascending":
        return "descending";
      default:
        return "ascending";
    }
  }
  return direction;
};

var queryValue = exports.queryValue = function queryValue(source) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var value = query.split('.').reduce(function (result, key) {
    return result && result[key] ? result[key] : null;
  }, source);
  return value || defaultValue;
};

exports.default = {
  chevron: chevron,
  toggleDirection: toggleDirection,
  queryValue: queryValue
};