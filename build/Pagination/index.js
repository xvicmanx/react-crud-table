"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _wrappers = require("./wrappers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Pagination = /*#__PURE__*/function (_Component) {
  _inherits(Pagination, _Component);

  var _super = _createSuper(Pagination);

  function Pagination(props) {
    var _this;

    _classCallCheck(this, Pagination);

    _this = _super.call(this, props);
    _this.state = {
      activePage: props.defaultActivePage
    };
    _this.handleNextClick = _this.handleNextClick.bind(_assertThisInitialized(_this));
    _this.handlePreviousClick = _this.handlePreviousClick.bind(_assertThisInitialized(_this));
    _this.handleLinkClick = _this.handleLinkClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Pagination, [{
    key: "handlePreviousClick",
    value: function handlePreviousClick() {
      var activePage = this.state.activePage;

      if (activePage > 1) {
        this.update(activePage - 1);
      }
    }
  }, {
    key: "handleNextClick",
    value: function handleNextClick() {
      var activePage = this.state.activePage;
      var numberOfPages = this.calculateNumberOfPages();

      if (activePage < numberOfPages) {
        this.update(activePage + 1);
      }
    }
  }, {
    key: "handleLinkClick",
    value: function handleLinkClick(evt) {
      this.update(+evt.target.textContent.trim());
    }
  }, {
    key: "update",
    value: function update(activePage) {
      var _this$props = this.props,
          totalOfItems = _this$props.totalOfItems,
          itemsPerPage = _this$props.itemsPerPage,
          onChange = _this$props.onChange;
      this.setState({
        activePage: activePage
      });
      onChange({
        activePage: activePage,
        totalOfItems: totalOfItems,
        itemsPerPage: itemsPerPage
      });
    }
  }, {
    key: "calculateNumberOfPages",
    value: function calculateNumberOfPages() {
      var _this$props2 = this.props,
          totalOfItems = _this$props2.totalOfItems,
          itemsPerPage = _this$props2.itemsPerPage;
      return Math.ceil(totalOfItems / itemsPerPage);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var activePage = this.state.activePage;
      var numberOfPages = this.calculateNumberOfPages();

      var numbers = _toConsumableArray(Array(numberOfPages).keys());

      return /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination, null, /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination.Prev, {
        onClick: this.handlePreviousClick
      }, "\xAB"), numbers.map(function (i) {
        return /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination.Link, {
          key: i,
          modifiers: i === activePage ? 'active' : 'inactive',
          onClick: _this2.handleLinkClick
        }, i);
      }), /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination.Next, {
        onClick: this.handleNextClick
      }, "\xBB"));
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  defaultActivePage: _propTypes["default"].number,
  itemsPerPage: _propTypes["default"].number,
  totalOfItems: _propTypes["default"].number,
  onChange: _propTypes["default"].func
};
Pagination.defaultProps = {
  defaultActivePage: 1,
  totalOfItems: 0,
  itemsPerPage: 10,
  onChange: function onChange() {}
};
var _default = Pagination;
exports["default"] = _default;