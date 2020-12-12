"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Form = _interopRequireDefault(require("../Form"));

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var isPromise = function isPromise(target) {
  return Boolean(target && typeof target.then === 'function');
};

var FormModal = /*#__PURE__*/function (_React$Component) {
  _inherits(FormModal, _React$Component);

  var _super = _createSuper(FormModal);

  function FormModal(props) {
    var _this;

    _classCallCheck(this, FormModal);

    _this = _super.call(this, props);
    _this.state = {
      key: 0
    };
    return _this;
  }

  _createClass(FormModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          trigger = _this$props.trigger,
          initialValues = _this$props.initialValues,
          shouldReset = _this$props.shouldReset,
          _onSubmit = _this$props.onSubmit,
          visible = _this$props.visible,
          onVisibilityChange = _this$props.onVisibilityChange;
      var key = this.state.key;
      return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
        trigger: trigger,
        title: data.title,
        visible: visible,
        onShow: function onShow() {
          onVisibilityChange(true);

          _this2.setState({
            key: new Date().getTime()
          });
        },
        onHide: function onHide() {
          onVisibilityChange(false);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Form["default"], {
        key: key,
        data: data,
        initialValues: initialValues,
        onSubmit: function onSubmit(values, _ref) {
          var setError = _ref.setError,
              resetForm = _ref.resetForm,
              setSubmitting = _ref.setSubmitting;
          var reset = Object.keys(values).reduce(function (result, prop) {
            return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, prop, ''));
          }, {});

          var result = _onSubmit(values);

          if (isPromise(result)) {
            result.then(function () {
              if (shouldReset) {
                resetForm(reset);
              }

              setSubmitting(false);
              onVisibilityChange(false);
            })["catch"](function (err) {
              setError(err ? err.message : 'Unexpected error');
              setSubmitting(false);
            });
          }
        }
      }));
    }
  }]);

  return FormModal;
}(_react["default"].Component);

FormModal.propTypes = {
  visible: _propTypes["default"].bool,
  onVisibilityChange: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func,
  shouldReset: _propTypes["default"].bool,
  trigger: _propTypes["default"].node,
  data: _propTypes["default"].instanceOf(Object),
  initialValues: _propTypes["default"].instanceOf(Object)
};
FormModal.defaultProps = {
  onVisibilityChange: function onVisibilityChange() {},
  onSubmit: function onSubmit() {},
  shouldReset: false,
  trigger: null,
  data: {},
  initialValues: null,
  visible: false
};
var _default = FormModal;
exports["default"] = _default;