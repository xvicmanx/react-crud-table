"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Modal = require("../Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _Form = require("../Form");

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormModal = function (_React$Component) {
  _inherits(FormModal, _React$Component);

  function FormModal(props) {
    _classCallCheck(this, FormModal);

    var _this = _possibleConstructorReturn(this, (FormModal.__proto__ || Object.getPrototypeOf(FormModal)).call(this, props));

    _this.controller = null;
    _this.setController = _this.setController.bind(_this);
    return _this;
  }

  _createClass(FormModal, [{
    key: "setController",
    value: function setController(controller) {
      this.controller = controller;
      this.props.onInit(controller);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          trigger = _props.trigger,
          initialValues = _props.initialValues,
          shouldReset = _props.shouldReset;

      return _react2.default.createElement(
        _Modal2.default,
        {
          trigger: trigger,
          onInit: this.setController,
          title: data.title
        },
        _react2.default.createElement(_Form2.default, {
          data: data,
          initialValues: initialValues,
          onSubmit: function onSubmit(values, _ref) {
            var setError = _ref.setError,
                resetForm = _ref.resetForm,
                setSubmitting = _ref.setSubmitting;

            var reset = Object.keys(values).reduce(function (result, prop) {
              result[prop] = '';
              return result;
            }, {});
            _this2.props.onSubmit(values).then(function () {
              if (shouldReset) {
                resetForm(reset);
              }
              setSubmitting(false);
              _this2.controller.hide();
            }).catch(function (err) {
              setError(JSON.stringify(err, null, 2));
              setSubmitting(false);
            });
          }
        })
      );
    }
  }]);

  return FormModal;
}(_react2.default.Component);

FormModal.defaultProps = {
  onInit: function onInit() {},
  shouldReset: false
};

exports.default = FormModal;