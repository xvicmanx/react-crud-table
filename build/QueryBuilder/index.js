"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RuleBuilder = _interopRequireDefault(require("./RuleBuilder"));

var _Rules = _interopRequireDefault(require("./Rules"));

var _wrappers = require("./wrappers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var QueryBuilder = /*#__PURE__*/function (_React$Component) {
  _inherits(QueryBuilder, _React$Component);

  var _super = _createSuper(QueryBuilder);

  function QueryBuilder(props) {
    var _this;

    _classCallCheck(this, QueryBuilder);

    _this = _super.call(this, props);
    _this.state = {
      query: []
    };
    return _this;
  }

  _createClass(QueryBuilder, [{
    key: "handleSave",
    value: function handleSave(selection) {
      var query = this.state.query;
      var onChange = this.props.onChange;
      var update = {
        query: [].concat(_toConsumableArray(query), [selection])
      };
      this.setState(update);
      onChange(update.query);
    }
  }, {
    key: "remove",
    value: function remove(rule) {
      var query = this.state.query;
      var onChange = this.props.onChange;
      var update = {
        query: query.filter(function (x) {
          return x.field !== rule.field || x.condition !== rule.condition;
        })
      };
      this.setState(update);
      onChange(update.query);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var query = this.state.query;
      var _this$props = this.props,
          fields = _this$props.fields,
          renderRule = _this$props.renderRule;
      return /*#__PURE__*/_react["default"].createElement(_wrappers.Container, null, /*#__PURE__*/_react["default"].createElement(_RuleBuilder["default"], {
        fields: fields,
        onSave: function onSave(selection) {
          return _this2.handleSave(selection);
        }
      }), /*#__PURE__*/_react["default"].createElement(_Rules["default"], {
        queries: query,
        onRuleRemoved: function onRuleRemoved(rule) {
          return _this2.remove(rule);
        },
        renderRule: renderRule
      }));
    }
  }]);

  return QueryBuilder;
}(_react["default"].Component);

var _default = QueryBuilder;
exports["default"] = _default;