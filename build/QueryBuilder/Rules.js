'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('./helpers');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rules = function Rules(_ref) {
  var queries = _ref.queries,
      onRuleRemoved = _ref.onRuleRemoved,
      renderRule = _ref.renderRule;
  return queries.length > 0 && _react2.default.createElement(
    'div',
    null,
    queries.map(function (rule) {
      var renderer = renderRule || _helpers.defaultRuleRender;
      return _react2.default.createElement(
        'div',
        null,
        renderer(rule),
        '\xA0\xA0',
        _react2.default.createElement(
          _Button2.default,
          {
            onClick: function onClick() {
              onRuleRemoved(rule);
            },
            modifiers: 'negative,circular'
          },
          'X'
        )
      );
    }),
    _react2.default.createElement('br', null)
  );
};

Rules.propTypes = {
  queries: _propTypes2.default.instanceOf(Array).isRequired,
  onRuleRemoved: _propTypes2.default.func.isRequired,
  renderRule: _propTypes2.default.func.isRequired
};

exports.default = Rules;