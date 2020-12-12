"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _enzyme = _interopRequireDefault(require("enzyme"));

var _wrappers = require("./wrappers");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('Pagination', function () {
  var onChange;
  beforeEach(function () {
    onChange = jest.fn();
  });
  it('renders as expected when there are no items', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      activePage: 1,
      totalOfItems: 0,
      itemsPerPage: 2,
      onPageChange: onChange
    }));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected when in the first page', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      activePage: 1,
      totalOfItems: 10,
      itemsPerPage: 2,
      onPageChange: onChange
    }));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected when in the last page', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      activePage: 5,
      totalOfItems: 10,
      itemsPerPage: 2,
      onPageChange: onChange
    }));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected when in a page in the middle', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      activePage: 3,
      totalOfItems: 10,
      itemsPerPage: 2,
      onPageChange: onChange
    }));
    expect(result).toMatchSnapshot();
  });

  var Foo = function Foo() {
    return /*#__PURE__*/_react["default"].createElement("div", null);
  };

  it('notifies a page change when clicking a numbered link', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      activePage: 3,
      totalOfItems: 10,
      itemsPerPage: 2,
      onPageChange: onChange
    }));
    result.root.findByType(_wrappers.Pagination.Prev).props.onClick();
    result.root.findByType(_wrappers.Pagination.Next).props.onClick();
    result.root.findAllByType(_wrappers.Pagination.Link).forEach(function (item) {
      item.props.onClick();
    });
    expect(onChange).toHaveBeenCalledTimes(7);
    expect(onChange.mock.calls).toEqual([[2], [4], [1], [2], [3], [4], [5]]);
  });
});