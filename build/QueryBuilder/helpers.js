'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputForType = exports.getDefaultConditionForType = exports.conditionsForType = exports.defaultRuleRender = exports.mapFieldsToOptions = exports.isBoolean = exports.isRuleComplete = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _Label = require('../Label');

var _Label2 = _interopRequireDefault(_Label);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = void 0;

var Input = function Input(props) {
  return _react2.default.createElement('input', props);
};

var isRuleComplete = exports.isRuleComplete = function isRuleComplete(rule) {
  var condition = rule.condition,
      value = rule.value,
      field = rule.field;

  return condition != "" && value !== '' && field !== '';
};

var isBoolean = exports.isBoolean = function isBoolean(type) {
  return type === 'boolean';
};

var mapFieldsToOptions = exports.mapFieldsToOptions = function mapFieldsToOptions(fields) {
  return fields.map(function (x) {
    return {
      text: x.label,
      value: x.value,
      key: x.value
    };
  });
};

var defaultRuleRender = exports.defaultRuleRender = function defaultRuleRender(rule) {
  if (isBoolean(rule.type)) {
    return _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        _Label2.default,
        { style: styles.label },
        rule.condition
      ),
      '\xA0',
      _react2.default.createElement(
        _Label2.default,
        { style: styles.label },
        rule.label
      )
    );
  }
  return _react2.default.createElement(
    'span',
    null,
    _react2.default.createElement(
      _Label2.default,
      { style: styles.label },
      rule.label
    ),
    '\xA0',
    _react2.default.createElement(
      _Label2.default,
      { style: styles.label },
      _constants.CONDITIONS_LABEL[rule.condition]
    ),
    '\xA0',
    _react2.default.createElement(
      _Label2.default,
      { style: styles.label },
      rule.value
    )
  );
};

var conditionsForType = exports.conditionsForType = function conditionsForType(type) {
  var result = void 0;
  switch (type) {
    case 'number':
    case 'date':
      result = [_constants.CONDITIONS.EQUALS_TO, _constants.CONDITIONS.LESS_THAN, _constants.CONDITIONS.GREATER_THAN, _constants.CONDITIONS.LESS_OR_EQUALS_THAN, _constants.CONDITIONS.GREATER_OR_EQUALS_THAN, _constants.CONDITIONS.IS_NOT_EQUALS_TO, _constants.CONDITIONS.IS_NOT_LESS_THAN, _constants.CONDITIONS.IS_NOT_GREATER_THAN, _constants.CONDITIONS.IS_NOT_LESS_OR_EQUALS_THAN, _constants.CONDITIONS.IS_NOT_GREATER_OR_EQUALS_THAN];
      break;
    case 'boolean':
      result = [_constants.CONDITIONS.IS, _constants.CONDITIONS.IS_NOT];
      break;
    default:
      result = [_constants.CONDITIONS.CONTAINS, _constants.CONDITIONS.EQUALS_TO, _constants.CONDITIONS.BEGINS_WITH, _constants.CONDITIONS.ENDS_WITH, _constants.CONDITIONS.IS_NOT_EQUALS_TO, _constants.CONDITIONS.DOES_NOT_BEGIN_WITH, _constants.CONDITIONS.DOES_NOT_END_WITH, _constants.CONDITIONS.DOES_NOT_CONTAIN];
      break;
  }

  return result.map(function (r) {
    return {
      value: r,
      text: _constants.CONDITIONS_LABEL[r],
      key: r
    };
  });
};

var getDefaultConditionForType = exports.getDefaultConditionForType = function getDefaultConditionForType(type) {
  switch (type) {
    case 'number':
      return _constants.CONDITIONS.EQUALS_TO;
    case 'date':
      return _constants.CONDITIONS.GREATER_OR_EQUALS_THAN;
    default:
      return _constants.CONDITIONS.CONTAINS;
  }
};

var inputForType = exports.inputForType = function inputForType(type, props) {
  switch (type) {
    case 'number':
      return _react2.default.createElement(Input, _extends({ type: 'number' }, props));
    case 'boolean':
      return _react2.default.createElement(Input, _extends({}, props, {
        type: 'checkbox',
        onClick: function onClick(evt) {
          evt.target.value = evt.target.checked;
          props.onChange(evt);
        },
        onChange: function onChange() {}
      }));
    case 'date':
      return _react2.default.createElement(_reactDatetime2.default, _extends({}, props, {
        className: 'ui input',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'hh:mm A',
        onChange: function onChange(data) {
          props.onChange({
            target: {
              value: data.format('YYYY-MM-DD hh:mm A')
            }
          });
        } }));
    default:
      return _react2.default.createElement(Input, _extends({ type: 'text' }, props));
  }
};

styles = {
  label: {
    marginBottom: '5px'
  }
};

exports.default = {
  defaultRuleRender: defaultRuleRender,
  conditionsForType: conditionsForType,
  getDefaultConditionForType: getDefaultConditionForType,
  inputForType: inputForType,
  mapFieldsToOptions: mapFieldsToOptions,
  isBoolean: isBoolean,
  isRuleComplete: isRuleComplete
};