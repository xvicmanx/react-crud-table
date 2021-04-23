"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../Button"));

var _Select = _interopRequireDefault(require("../Select"));

var _helpers = require("../CRUDTable/helpers");

var _helpers2 = require("./helpers");

var _constants = require("./constants");

var _wrappers = require("./wrappers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RuleBuilder = /*#__PURE__*/function (_React$Component) {
  _inherits(RuleBuilder, _React$Component);

  var _super = _createSuper(RuleBuilder);

  function RuleBuilder(props) {
    var _this;

    _classCallCheck(this, RuleBuilder);

    _this = _super.call(this, props);
    _this.state = _constants.DEFAULT_STATE; // $FlowFixMe

    _this.handleFieldSelectChange = _this.handleFieldSelectChange.bind(_assertThisInitialized(_this)); // $FlowFixMe

    _this.save = _this.save.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RuleBuilder, [{
    key: "handleFieldSelectChange",
    value: function handleFieldSelectChange(evt) {
      var value = evt.currentTarget.value;

      var update = _objectSpread(_objectSpread({}, this.state), {}, {
        field: value,
        type: this.getType(value),
        label: this.getLabel(value),
        collection: this.getCollection(value)
      });

      update.condition = this.getDefaultCondition(value);

      if ((0, _helpers2.isBoolean)(update.type)) {
        update.condition = _constants.CONDITIONS.IS;
        update.value = false;
      }

      this.setState(update);
    }
  }, {
    key: "getLabel",
    value: function getLabel(field) {
      return (0, _helpers.queryValue)(this.find(field), 'label', '');
    }
  }, {
    key: "getDefaultCondition",
    value: function getDefaultCondition(field) {
      var defaultconditionForType = (0, _helpers2.getDefaultConditionForType)(this.getType(field));
      return (0, _helpers.queryValue)(this.find(field), 'defaultCondition', defaultconditionForType);
    }
  }, {
    key: "getCollection",
    value: function getCollection(field) {
      return (0, _helpers.queryValue)(this.find(field), 'collection', '');
    }
  }, {
    key: "getType",
    value: function getType(field) {
      return (0, _helpers.queryValue)(this.find(field), 'type', '');
    }
  }, {
    key: "find",
    value: function find(field) {
      var fields = this.props.fields;
      return fields.find(function (f) {
        return f.value === field;
      });
    }
  }, {
    key: "save",
    value: function save() {
      var onSave = this.props.onSave;

      if ((0, _helpers2.isRuleComplete)(this.state)) {
        onSave(this.state);
        this.setState(_constants.DEFAULT_STATE);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          fields = _this$props.fields,
          conditionsSelectPlaceholder = _this$props.conditionsSelectPlaceholder,
          fieldsSelectPlaceholder = _this$props.fieldsSelectPlaceholder;
      var _this$state = this.state,
          field = _this$state.field,
          value = _this$state.value,
          condition = _this$state.condition;
      var type = this.getType(field);
      var input = (0, _helpers2.inputForType)(type, {
        value: value,
        onChange: function onChange(evt) {
          _this2.setState({
            value: evt.currentTarget.value
          });
        }
      });
      return /*#__PURE__*/_react["default"].createElement(_wrappers.RuleBuilder, null, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
        placeholder: fieldsSelectPlaceholder,
        options: (0, _helpers2.mapFieldsToOptions)(fields),
        value: field,
        onChange: this.handleFieldSelectChange
      }), "\xA0\xA0", !(0, _helpers2.isBoolean)(type) && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
        placeholder: conditionsSelectPlaceholder,
        options: (0, _helpers2.conditionsForType)(type),
        value: condition,
        onChange: function onChange(evt, data) {
          _this2.setState({
            condition: evt.currentTarget.value
          });
        }
      }), "\xA0\xA0"), input, "\xA0\xA0", /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        modifiers: "positive,add",
        onClick: this.save
      }, "+"));
    }
  }]);

  return RuleBuilder;
}(_react["default"].Component);

var _default = RuleBuilder;
exports["default"] = _default;