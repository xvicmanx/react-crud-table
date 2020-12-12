"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

var _Body = _interopRequireDefault(require("./Body"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('Body', function () {
  var props;
  var items = [{
    id: 1,
    name: 'John',
    age: 45,
    description: 'I love my family'
  }, {
    id: 2,
    name: 'Mary',
    age: 35,
    description: 'Nature is beatiful'
  }];
  beforeEach(function () {
    props = {
      onDeleteClick: jest.fn(),
      onUpdateClick: jest.fn(),
      actionsLabel: 'Act',
      updateTrigger: 'Update',
      deleteTrigger: 'Delete',
      items: items,
      fields: [{
        name: 'id',
        label: 'Id'
      }, {
        name: 'name',
        label: 'Name',
        tableValueResolver: 'name'
      }, {
        name: 'age',
        label: 'Age',
        tableValueResolver: function tableValueResolver(item) {
          return "".concat(item.age, " years");
        }
      }, {
        name: 'description',
        label: 'Description'
      }],
      sort: {
        field: 'name',
        direction: 'ascending'
      }
    };
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Body["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies when clicking trigger buttons', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_Body["default"], props));
    var buttons = result.root.findAllByType(_Button["default"]);
    buttons[0].props.onClick();
    buttons[1].props.onClick();
    expect(props.onDeleteClick).toHaveBeenCalledTimes(1);
    expect(props.onDeleteClick).toHaveBeenCalledWith(items[0]);
    expect(props.onUpdateClick).toHaveBeenCalledTimes(1);
    expect(props.onUpdateClick).toHaveBeenCalledWith(items[0]);
  });
});