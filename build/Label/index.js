'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _wrappers = require('./wrappers');

var _wrappers2 = _interopRequireDefault(_wrappers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = function Label(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    _wrappers2.default,
    null,
    children
  );
};

Label.propTypes = {
  children: _propTypes2.default.oneOf([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)])
};

exports.default = Label;