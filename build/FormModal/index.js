"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Form = _interopRequireDefault(require("../Form"));

var _helpers = require("../helpers");

var _helpers2 = require("./helpers");

var _helpers3 = require("../CRUDTable/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
          onSubmit = _this$props.onSubmit,
          visible = _this$props.visible,
          onVisibilityChange = _this$props.onVisibilityChange;
      var key = this.state.key;
      return /*#__PURE__*/React.createElement(_Modal["default"], {
        trigger: trigger,
        title: data.title,
        visible: visible,
        onShow: function onShow() {
          (0, _helpers3.scrollToTop)();
          onVisibilityChange(true);

          _this2.setState({
            key: new Date().getTime()
          });
        },
        onHide: function onHide() {
          onVisibilityChange(false);
        }
      }, /*#__PURE__*/React.createElement(_Form["default"], {
        key: key,
        data: data,
        initialValues: initialValues,
        onSubmit: (0, _helpers2.onSubmitHandler)(onSubmit, shouldReset, function () {
          return onVisibilityChange(false);
        })
      }));
    }
  }]);

  return FormModal;
}(React.Component); // $FlowFixMe


FormModal.defaultProps = {
  onVisibilityChange: _helpers.NO_OP,
  onSubmit: _helpers.NO_OP,
  shouldReset: false,
  trigger: null,
  initialValues: null,
  visible: false
};
var _default = FormModal;
exports["default"] = _default;