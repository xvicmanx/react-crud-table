'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

var _helpers = require('./helpers');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _wrappers = require('./wrappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RuleBuilder = function (_React$Component) {
  _inherits(RuleBuilder, _React$Component);

  function RuleBuilder(props) {
    _classCallCheck(this, RuleBuilder);

    var _this = _possibleConstructorReturn(this, (RuleBuilder.__proto__ || Object.getPrototypeOf(RuleBuilder)).call(this, props));

    _this.state = _constants.DEFAULT_STATE;
    return _this;
  }

  _createClass(RuleBuilder, [{
    key: 'save',
    value: function save() {
      var _state = this.state,
          condition = _state.condition,
          value = _state.value,
          field = _state.field;

      if (condition != "" && value !== '' && field !== '') {
        this.props.onSave(this.state);
        this.setState(_constants.DEFAULT_STATE);
      }
    }
  }, {
    key: 'find',
    value: function find(field) {
      return this.props.fields.find(function (t) {
        return t.value === field;
      });
    }
  }, {
    key: 'getType',
    value: function getType(field) {
      var match = this.find(field);
      return match ? match.type : '';
    }
  }, {
    key: 'getCollection',
    value: function getCollection(field) {
      var match = this.find(field);
      return match ? match.collection : '';
    }
  }, {
    key: 'getDefaultCondition',
    value: function getDefaultCondition(field) {
      var match = this.find(field);
      var defaultconditionForType = (0, _helpers.getDefaultConditionForType)(this.getType(field));

      return match && match.defaultCondition ? match.defaultCondition : defaultconditionForType;
    }
  }, {
    key: 'getLabel',
    value: function getLabel(field) {
      var match = this.find(field);
      return match ? match.label : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state2 = this.state,
          field = _state2.field,
          value = _state2.value,
          condition = _state2.condition;

      var type = this.getType(field);
      var input = (0, _helpers.inputForType)(type, {
        value: value,
        onChange: function onChange(evt) {
          _this2.setState({ value: evt.target.value });
        }
      });

      return _react2.default.createElement(
        _wrappers.RuleBuilder,
        null,
        _react2.default.createElement(_Select2.default, {
          placeholder: 'Seleccione campo',
          options: this.props.fields.map(function (x) {
            return {
              text: x.label,
              value: x.value,
              key: x.value
            };
          }),
          value: field,
          onChange: function onChange(evt, data) {
            var value = data.value;

            var update = {
              field: value,
              type: _this2.getType(value),
              label: _this2.getLabel(value),
              collection: _this2.getCollection(value)
            };

            var defaultCondition = _this2.getDefaultCondition(value);

            if (defaultCondition) {
              update.condition = defaultCondition;
            }

            if (update.type === 'boolean') {
              update.condition = _constants.CONDITIONS.IS;
              update.value = false;
            }

            _this2.setState(update);
          }
        }),
        '\xA0\xA0',
        type !== 'boolean' && _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Select2.default, {
            placeholder: 'Seleccione condici\xF3n',
            options: (0, _helpers.conditionsForType)(type),
            value: condition,
            onChange: function onChange(evt, data) {
              _this2.setState({ condition: data.value });
            }
          }),
          '\xA0\xA0'
        ),
        input,
        '\xA0\xA0',
        _react2.default.createElement(
          _Button2.default,
          {
            modifiers: 'positive,add',
            onClick: this.save.bind(this)
          },
          '+'
        )
      );
    }
  }]);

  return RuleBuilder;
}(_react2.default.Component);

exports.default = RuleBuilder;


RuleBuilder.defaultProps = {
  fields: []
};