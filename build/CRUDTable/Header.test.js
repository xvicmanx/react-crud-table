"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _wrappers = require("./wrappers");

var _Header = _interopRequireDefault(require("./Header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('Header', function () {
  var props;
  beforeEach(function () {
    props = {
      trigger: 'Open',
      title: 'Test title',
      onClick: jest.fn(),
      actionsLabel: 'Act',
      fields: [{
        name: 'name',
        label: 'Name',
        sortable: true
      }, {
        name: 'age',
        label: 'Age',
        sortable: false
      }],
      sort: {
        field: 'name',
        direction: 'ascending'
      }
    };
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Header["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected with the given props (descending sort)', function () {
    props.sort.direction = 'descending';
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Header["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies when opened', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_Header["default"], props));
    var cells = result.root.findAllByType(_wrappers.Table.HeaderCell);
    cells[0].props.onClick();
    cells[1].props.onClick();
    expect(props.onClick).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenCalledWith('name', 'ascending');
  });
});