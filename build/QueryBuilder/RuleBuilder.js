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

var _helpers2 = require('../CRUDTable/helpers');

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
    _this.handleFieldSelectChange = _this.handleFieldSelectChange.bind(_this);
    return _this;
  }

  _createClass(RuleBuilder, [{
    key: 'save',
    value: function save() {
      if ((0, _helpers.isRuleComplete)(this.state)) {
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
      return (0, _helpers2.queryValue)(this.find(field), 'type', '');
    }
  }, {
    key: 'getCollection',
    value: function getCollection(field) {
      return (0, _helpers2.queryValue)(this.find(field), 'collection', '');
    }
  }, {
    key: 'getDefaultCondition',
    value: function getDefaultCondition(field) {
      var defaultconditionForType = (0, _helpers.getDefaultConditionForType)(this.getType(field));

      return (0, _helpers2.queryValue)(this.find(field), 'defaultCondition', defaultconditionForType);
    }
  }, {
    key: 'getLabel',
    value: function getLabel(field) {
      return (0, _helpers2.queryValue)(this.find(field), 'label', '');
    }
  }, {
    key: 'handleFieldSelectChange',
    value: function handleFieldSelectChange(evt, data) {
      var value = data.value;

      var update = {
        field: value,
        type: this.getType(value),
        label: this.getLabel(value),
        collection: this.getCollection(value)
      };

      var defaultCondition = this.getDefaultCondition(value);

      if (defaultCondition) {
        update.condition = defaultCondition;
      }

      if ((0, _helpers.isBoolean)(update.type)) {
        update.condition = _constants.CONDITIONS.IS;
        update.value = false;
      }

      this.setState(update);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          field = _state.field,
          value = _state.value,
          condition = _state.condition;

      var type = this.getType(field);
      var input = (0, _helpers.inputForType)(type, {
        value: value,
        onChange: function onChange(evt) {
          console.log(evt.target.value);
          _this2.setState({ value: evt.target.value });
        }
      });

      return _react2.default.createElement(
        _wrappers.RuleBuilder,
        null,
        _react2.default.createElement(_Select2.default, {
          placeholder: this.props.fieldsSelectPlaceholder,
          options: (0, _helpers.mapFieldsToOptions)(this.props.fields),
          value: field,
          onChange: this.handleFieldSelectChange
        }),
        '\xA0\xA0',
        !(0, _helpers.isBoolean)(type) && _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Select2.default, {
            placeholder: this.props.conditionsSelectPlaceholder,
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
  fields: [],
  fieldsSelectPlaceholder: 'Select field',
  conditionsSelectPlaceholder: 'Select condition'
};