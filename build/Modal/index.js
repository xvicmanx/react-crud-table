'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrappers = require('./wrappers');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDisplay = function getDisplay(visible) {
  return visible ? 'block' : 'none';
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.showModal = _this.showModal.bind(_this);
    _this.hideModal = _this.hideModal.bind(_this);
    _this.state = { visible: false };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onInit({
        show: this.showModal,
        hide: this.hideModal
      });
    }
  }, {
    key: 'showModal',
    value: function showModal() {
      this.setState({ visible: true });
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      this.setState({ visible: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var display = getDisplay(this.state.visible);
      return _react2.default.createElement(
        'div',
        null,
        this.props.trigger && _react2.default.createElement(
          _Button2.default,
          {
            modifiers: 'positive',
            onClick: this.showModal
          },
          this.props.trigger
        ),
        _react2.default.createElement(
          _wrappers.Container,
          { style: { display: display } },
          _react2.default.createElement(_wrappers.Container.BG, {
            onClick: this.hideModal
          }),
          _react2.default.createElement(
            _wrappers.Container.Modal,
            null,
            this.props.title && _react2.default.createElement(
              _wrappers.Container.Title,
              null,
              this.props.title
            ),
            this.props.children
          )
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.defaultProps = {
  onInit: function onInit() {},
  title: ''
};

exports.default = Modal;