"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _wrappers = require("./wrappers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var linkModifier = function linkModifier(active) {
  return active ? 'active' : 'inactive';
};

var Pagination = function Pagination(props) {
  var activePage = props.activePage,
      totalOfItems = props.totalOfItems,
      itemsPerPage = props.itemsPerPage,
      onPageChange = props.onPageChange;
  var numberOfPages = Math.ceil(totalOfItems / itemsPerPage) || 1;

  var pageNumbers = _toConsumableArray(Array(numberOfPages).keys());

  var canIncreasePage = activePage < numberOfPages;
  var canDecreasePage = activePage > 1;
  return /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination, null, canDecreasePage && /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination.Prev, {
    onClick: function onClick() {
      onPageChange(activePage - 1);
    }
  }, "\xAB"), pageNumbers.map(function (i) {
    var page = i + 1;
    return /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination.Link, {
      key: page,
      modifiers: linkModifier(page === activePage),
      onClick: function onClick() {
        onPageChange(page);
      }
    }, page);
  }), canIncreasePage && /*#__PURE__*/_react["default"].createElement(_wrappers.Pagination.Next, {
    onClick: function onClick() {
      onPageChange(activePage + 1);
    }
  }, "\xBB"));
};

var _default = Pagination;
exports["default"] = _default;