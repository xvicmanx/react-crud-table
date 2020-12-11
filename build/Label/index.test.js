"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Label', function () {
  it('renders properly', function () {
    var renderer = new _shallow["default"]();
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], null, "Test"));
    expect(result).toMatchSnapshot();
  });
});